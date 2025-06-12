'use client';

import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void; // Change action to onSubmit and type to string
}

export default function SearchBar({ onSubmit }: SearchBarProps) { // Destructure onSubmit
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => { // Change to handleFormSubmit and accept event
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget); // Get formData from the event target
    const query = formData.get('query') as string;

    if (!query || !query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query.trim()); // Call onSubmit with the trimmed query string
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} onSubmit={handleFormSubmit}> {/* Use onSubmit */}
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}