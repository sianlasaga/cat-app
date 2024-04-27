import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { CatBreed, Cat } from '../types/CatTypes';
import { fetchBreeds, fetchCatsByBreed } from '../api/cat';
import { useToast } from './ToastProvider';
import { DEFAULT_API_ERROR_MESSAGE } from '../constants';

type CatContextData = {
  breeds: CatBreed[];
  catResult: Cat[];
  loadMore: () => void;
  selectedBreedId: CatBreed['id'];
  selectBreedId: (breedId: CatBreed['id']) => void;
  hasReachedEnd: boolean;
};

type Props = {
  children: React.ReactNode;
};

const CatContext = createContext<CatContextData | undefined>(undefined);

const CatProvider = ({ children }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBreedId = searchParams.get('breedId') ?? '';
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [catResult, setCatResult] = useState<Cat[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { showToast } = useToast();

  const getCatsByBreedId = useCallback(
    async (selectedBreedId: CatBreed['id']) => {
      if (isFetching) return;
      if (!selectedBreedId) {
        setCatResult([]);
        return;
      }
      setIsFetching(true);
      try {
        const cats = await fetchCatsByBreed(selectedBreedId, { page });
        if (page === 1) {
          setCatResult(cats);
          return;
        }
        // Filter out duplicates. If there are no new cats, assume we have reached the end
        const newCats = cats.filter(
          (cat: Cat) => !catResult.some((c) => c.id === cat.id)
        );
        if (newCats.length === 0) {
          setHasReachedEnd(true);
          return;
        }
        setCatResult([...catResult, ...newCats]);
      } catch (error) {
        showToast(DEFAULT_API_ERROR_MESSAGE, 'danger');
      } finally {
        setIsFetching(false);
      }
    },
    [isFetching, page, catResult]
  );

  const getBreeds = useCallback(async () => {
    try {
      const breeds = await fetchBreeds();
      setBreeds(breeds);
    } catch (error) {
      showToast(DEFAULT_API_ERROR_MESSAGE, 'danger');
    }
  }, []);

  // fetch breeds on component mount
  useEffect(() => {
    getBreeds();
  }, []);

  // fetch cats when selectedBreedId and/or page changes
  useEffect(() => {
    getCatsByBreedId(selectedBreedId);
  }, [selectedBreedId, page]);

  const selectBreedId = useCallback(
    (breedId: CatBreed['id']) => {
      if (breedId === selectedBreedId) return;
      setSearchParams({ breedId });
      setPage(1);
      setHasReachedEnd(false);
    },
    [selectedBreedId]
  );

  const loadMore = useCallback(() => {
    // no need to fetch if hasReachedEnd is true
    if (hasReachedEnd) return;
    setPage(page + 1);
  }, [hasReachedEnd, page]);

  return (
    <CatContext.Provider
      value={{
        breeds,
        selectedBreedId,
        catResult,
        loadMore,
        selectBreedId,
        hasReachedEnd,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error('useCat must be used within a CatProvider');
  }
  return context;
};

export default CatProvider;
