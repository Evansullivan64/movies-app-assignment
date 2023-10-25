import React, { useState, useEffect } from "react";  
import Header from "../components/headerMovieList";

import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";

const MovieListPage = (props) => {
  const [movies, setMovies] = useState([]);
  



  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

 

  


    useEffect(() => {
        fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        )
          .then((res) => res.json())
          .then((json) => {
        
            console.log(json);
            const upcomingMovies = json.results;
 
            setMovies(upcomingMovies);
          });
      }, []);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title={"Upcoming movies"} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
       
        </Grid>
        <MovieList movies={displayedMovies} selectFavorite={addToFavorites} />
      </Grid>
    </Grid>
  );
};
export default MovieListPage;