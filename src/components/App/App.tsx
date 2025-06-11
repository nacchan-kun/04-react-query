import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query"; // Assuming v4/v5

import type { Movie, MovieApiResponse } from "../../types/movie";
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
    Error // Explicitly define the error type
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    // Fix: Replace keepPreviousData with placeholderData or previousData
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new
    // OR if you want to use previousData option:
    // previousData: true, // This option might require more careful handling of `data` being undefined initially when fetching new data
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleSearch = (formData: FormData) => {
    const searchQuery = formData.get("query") as string;

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
      <SearchBar action={handleSearch} />

      {(isLoading || isFetching) && <Loader />}
      {isError && (
        <ErrorMessage message="Something went wrong. Please try again." />
      )}

      {/* Ensure data?.results and data?.total_pages are accessed safely */}
      {!isLoading &&
        !isError &&
        data && // Add a check for data existence
        data.results && // Ensure results array exists
        data.results.length === 0 &&
        query && <p>No movies found for your request.</p>}

      {!isLoading &&
        !isError &&
        data && // Add a check for data existence
        data.results && // Ensure results array exists
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