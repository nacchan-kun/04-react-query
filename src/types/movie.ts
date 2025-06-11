// src/types/movie.d.ts or src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null; // Often can be null if not available
  backdrop_path?: string | null; // Often can be null if not available
  overview?: string;
  release_date?: string; // Or Date if you parse it
  vote_average?: number;
  // Add any other properties that your API returns for a Movie
}

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}