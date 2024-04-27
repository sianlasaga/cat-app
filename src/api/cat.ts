import axios from './axios';
import { DEFAULT_PAGINATION_LIMIT } from '../constants';
import { Cat, CatBreed } from '../types/CatTypes';
import { Pagination } from '../types/Common';

export const fetchBreeds: () => Promise<CatBreed[]> = async () => {
  const response = await axios.get('/breeds');
  return response.data as CatBreed[];
};

export const fetchCatsByBreed: (
  breedId: string,
  pagination: Pagination
) => Promise<Cat[]> = async (
  breedId,
  { page = 1, limit = DEFAULT_PAGINATION_LIMIT } = {}
) => {
  const params = new URLSearchParams({
    breed_id: breedId,
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await axios.get(`/images/search?${params.toString()}`);
  return response.data as Cat[];
};

export const fetchCat: (breedId: string) => Promise<Cat> = async (breedId) => {
  const response = await axios.get(`/images/${breedId}`);
  return response.data as Cat;
};
