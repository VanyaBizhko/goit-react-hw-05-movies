import { Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect,  useRef,  useState } from "react";
import { Link } from "react-router-dom";
import styles from './MovieDetails.module.css'

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

  
 
  return (
      <div className={styles.container}>
         <Link className={styles.back} to={backLocation.current}>Go back</Link>
      <div className={styles.flex}>
        <img className={styles.photo} width='200px' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
           <div className={styles.right}>
                  <h1 className={styles.header}>{movie.title}</h1>
                  <h3>User score:</h3>
                  <p className={styles.vote}> {movie.vote_average}</p>
                  <h3>Overviev:</h3>
             <p className={styles.overview}>{movie.overview}</p>
           <h3>Genres:</h3>
          <ul className={styles.list}>
              
  {movie.genres && movie.genres.map((genre) => (
    <li className={styles.item} key={genre.id}>{genre.name};</li>
  ))}
                  </ul>
                  </div>
      </div>
          <h2>Editional information:</h2>
          <ul className={styles.link_list}>
              <li>
                  <Link className={styles.cast} to='cast'>Cast</Link>
              </li>
              <li>
                  <Link className={styles.reviews} to='reviews'>Reviews</Link>
              </li>
          </ul>
          <Suspense fallback={<div>Loading...</div> }>
                    <Outlet />
                </Suspense>
    </div>
  );
};

export default MovieDetails;