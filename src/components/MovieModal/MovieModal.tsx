import React, { useEffect } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Render the modal content using a portal
  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {movie.backdrop_path ? (
          <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>No Backdrop Available</div>
        )}
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          {movie.overview && <p>{movie.overview}</p>}
          {movie.release_date && (
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          )}
          {movie.vote_average !== undefined && movie.vote_average !== null && (
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body // This is the target DOM node for the portal
  );
};

export default MovieModal;