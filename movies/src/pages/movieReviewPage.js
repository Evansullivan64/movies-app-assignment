import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { getMovie, getMovieReviews } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'

const MovieReviewPage = (props) => {

 

  
  let location = useLocation();
  const {movie, review} = location.state;
  const {  data: error, isLoading, isError }  = useQuery('latest', getMovieReviews)

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;