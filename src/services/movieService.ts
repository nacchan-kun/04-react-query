import axios from 'axios';
import type { MovieApiResponse } from '../types/movie'; 


export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieApiResponse> => { 
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error('TMDB API token is missing');
  }

  const response = await axios.get<MovieApiResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};