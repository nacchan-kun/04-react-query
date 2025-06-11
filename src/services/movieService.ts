import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<FetchMoviesResponse> => {
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    throw new Error('TMDB API token is missing');
  }

  const response = await axios.get<FetchMoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,  // передаємо параметр сторінки
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data;
};