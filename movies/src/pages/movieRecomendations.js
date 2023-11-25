import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import { getMovieRecommendations } from "../api/tmdb-api";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MovieRecommendationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const { id } = useParams(); // Use useParams hook to get parameters

  const { data, error, isLoading, isError, refetch } = useQuery(["movie", id, "recommendations", currentPage], () =>
    getMovieRecommendations(id, currentPage)
  );

  useEffect(() => {
    if (data) {
      setRecommendations(data.results);
    }
  }, [data]);

  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  return (
    <div>
      <PageTemplate
        title="Movie recomendations"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
    </div>
  );
};

export default MovieRecommendationsPage;
