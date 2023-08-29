import Home from "pages/Home";
import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import {  Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Cast from "./Cast";
import Reviews from "./Reviews";

export const App = () => {
  return (
      <Routes>
        <Route path="/" element ={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="movies" element={<Movies/>} />
        <Route path="movies/:movieId" element={<MovieDetails />} >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews/> } />
          </Route>
          </Route>
      </Routes>
    
  );
};


// key = def4cccd6431cc54dcd0cd8678ae472b
 
// token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY0Y2NjZDY0MzFjYzU0ZGNkMGNkODY3OGFlNDcyYiIsInN1YiI6IjY0ZWNkZjIxNTI1OGFlMDE0ZGYzYjlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj6V8kGVcNSLQ9lVcLDEXkbsr-LYuyCeuhMjBSEqkLs