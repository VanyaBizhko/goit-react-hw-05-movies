import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect,  useRef,  useState } from "react";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    
  const backLocation = useRef(location.state?.from ?? '/')
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
             method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY0Y2NjZDY0MzFjYzU0ZGNkMGNkODY3OGFlNDcyYiIsInN1YiI6IjY0ZWNkZjIxNTI1OGFlMDE0ZGYzYjlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj6V8kGVcNSLQ9lVcLDEXkbsr-LYuyCeuhMjBSEqkLs'
  },
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

    console.log(location);
 
  return (
      <div>
         <Link to={backLocation.current}>Go back</Link>
      <img width='200px' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p> {movie.vote_average}</p>
          <p>{movie.overview}</p>
          <ul>
              <h3>Genres:</h3>
  {movie.genres && movie.genres.map((genre) => (
    <li key={genre.id}>{genre.name}</li>
  ))}
</ul>
          <ul>
              <li>
                  <Link to='cast'>Cast</Link>
              </li>
              <li>
                  <Link to='reviews'>Reviews</Link>
              </li>
          </ul>
          <Outlet/>
    </div>
  );
};

export default MovieDetails;