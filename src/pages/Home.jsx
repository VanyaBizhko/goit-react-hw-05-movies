import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY0Y2NjZDY0MzFjYzU0ZGNkMGNkODY3OGFlNDcyYiIsInN1YiI6IjY0ZWNkZjIxNTI1OGFlMDE0ZGYzYjlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj6V8kGVcNSLQ9lVcLDEXkbsr-LYuyCeuhMjBSEqkLs",
      },
    }),
    []
  );

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", options)
      .then((response) => response.json())
      .then((data) => setTrendingMovies(data.results))
      .catch((error) => console.error(error));
  }, [options]);

  return (
    <div>
      <ul className={styles.list}>
        {trendingMovies.map((movie) => (
          <li className={styles.item} key={movie.id}>
            <NavLink className={styles.link} to={`/movies/${movie.id}`}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;