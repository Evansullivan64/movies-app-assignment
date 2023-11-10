import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import { getMovieRecommendations } from "../api/tmdb-api";
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendedMovie) => (
            <li key={recommendedMovie.id}>
              <Typography variant="subtitle1" component="p">
                {recommendedMovie.title}
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="subtitle1" component="p">
          No recommendations available.
        </Typography>
      )}
      {/* Add pagination as you did before */}
    </div>
  );
};

export default MovieRecommendationsPage;
