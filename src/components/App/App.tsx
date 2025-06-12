import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import type { Movie } from "../../types/movie"; // Add Movie back to the import
import type { MovieApiResponse } from "../../services/movieService";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isFetching } = useQuery<
    MovieApiResponse,
    Error // Added Error type to useQuery generic for better type inference
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [isError]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery || !searchQuery.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setQuery(searchQuery.trim());
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {(isLoading || isFetching) && <Loader />}
      {isError && (
        <ErrorMessage message="Something went wrong. Please try again." />
      )}

      {!isLoading &&
        !isError &&
        data &&
        data.results &&
        data.results.length === 0 &&
        query && <p>No movies found for your request.</p>}

      {!isLoading &&
        !isError &&
        data &&
        data.results &&
        data.results.length > 0 && (
          <>
            <MovieGrid
              movies={data.results}
              onSelect={(movie) => setSelectedMovie(movie)}
            />

            {data.total_pages && data.total_pages > 1 && (
              <ReactPaginate
                pageCount={data.total_pages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}

export default App;