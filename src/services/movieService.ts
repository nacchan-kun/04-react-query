import { Movie } from '../types/movie';

const movies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    posterUrl: 'https://example.com/shawshank.jpg',
    year: '1994',
    genre: 'Drama',
    director: 'Frank Darabont',
    plot: 'Two imprisoned men bond over a number of years...',
    rating: '9.3',
  },
  {
    id: '2',
    title: 'The Godfather',
    posterUrl: 'https://example.com/godfather.jpg',
    year: '1972',
    genre: 'Crime, Drama',
    director: 'Francis Ford Coppola',
    plot: 'The aging patriarch of an organized crime dynasty...',
    rating: '9.2',
  },
];

export const getMovies = async (): Promise<Movie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 500);
  });
};

export const getMovieById = async (id: string): Promise<Movie | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies.find((movie) => movie.id === id));
    }, 500);
  });
};