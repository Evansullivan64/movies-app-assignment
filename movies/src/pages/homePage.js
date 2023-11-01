import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError, refetch } = useQuery(["discover", currentPage], () =>
    getMovies(currentPage)
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <div>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <Pagination
        count={data.total_pages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
        color="primary"
        style={{ display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};
export default HomePage;
