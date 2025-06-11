export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  year: string;
  genre: string;
  director: string;
  plot: string;
  rating: string;
}

export interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}