import type { FC } from 'react';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => onSelect(movie)}
          style={{ cursor: 'pointer' }}
        >
          {/* Add a check for poster_path being null/undefined */}
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div style={{ width: '200px', height: '300px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              No Image
            </div>
          )}
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;