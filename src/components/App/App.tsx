import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";

import type { Movie, MovieApiResponse } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import MovieModal from "../../components/MovieModal/MovieModal";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery<MovieApiResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    keepPreviousData: true,
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

      {!isLoading && !isError && data?.results.length === 0 && query && (
        <p>No movies found for your request.</p>
      )}

      {!isLoading && !isError && data && data.results.length > 0 && (
        <>
          <MovieGrid
            movies={data.results}
            onSelect={(movie) => setSelectedMovie(movie)}
          />

          {data.total_pages > 1 && (
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
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;