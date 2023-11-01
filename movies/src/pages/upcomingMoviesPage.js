import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";

const UpcomingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError, refetch } = useQuery(
    ["upcoming", currentPage],
    () => getUpcomingMovies(currentPage)
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

  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <div>
      <PageTemplate
        title="Upcoming"
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

export default UpcomingMoviesPage;
