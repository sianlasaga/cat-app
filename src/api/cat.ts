import axios from './axios';
import { DEFAULT_PAGINATION_LIMIT } from '../constants';

export const fetchBreeds = async () => {
  const response = await axios.get('/breeds');
  return response.data;
};

export const fetchCatsByBreed = async (
  breedId: string,
  {
    page = 1,
    limit = DEFAULT_PAGINATION_LIMIT,
  }: { page?: number; limit?: number } = {}
) => {
  const params = new URLSearchParams({
    breed_id: breedId,
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await axios.get(`/images/search?${params.toString()}`);
  return response.data;
};

export const fetchCat = async (breedId: string) => {
  const response = await axios.get(`/images/${breedId}`);
  return response.data;
};
