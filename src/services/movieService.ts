import axios from 'axios';
import type { MovieApiResponse } from '../types/movie';

export async function fetchMovies(query: string, page: number): Promise<MovieApiResponse> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;

  const response = await axios.get<MovieApiResponse>(url);
  return response.data;  // This should have page, results, total_pages
}