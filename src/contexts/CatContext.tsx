import {
  createContext,
  useState,
  useContext
} from 'react';
import { CatBreed, Cat } from '../types/CatTypes';

type CatContextData = {
  breeds: CatBreed[];
  currentBreed: CatBreed | null;
  setCurrentBreed: (breed: CatBreed) => void;
  catResult: Cat[];
  selectedCat: Cat | null;
}

type Props = {
  children: React.ReactNode;
}

const CatContext = createContext<CatContextData | undefined>(undefined);

const CatProvider = ({ children }: Props) => {
  const [breeds,] = useState<CatBreed[]>([]);
  const [currentBreed, setCurrentBreed] = useState<CatBreed | null>(null);
  const [catResult,] = useState<Cat[]>([]);
  const [selectedCat,] = useState<Cat | null>(null);

  return (
    <CatContext.Provider value={{ breeds, currentBreed, setCurrentBreed, catResult, selectedCat }}>
      {children}
    </CatContext.Provider>
  )
}

export const useCat = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error('useCat must be used within a CatProvider');
  }
  return context;
}

export default CatProvider;