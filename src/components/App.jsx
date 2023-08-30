
import {  Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";


const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Movies = lazy(() => import('../pages/Movies'));

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));


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