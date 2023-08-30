import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './Cast.module.css'

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY0Y2NjZDY0MzFjYzU0ZGNkMGNkODY3OGFlNDcyYiIsInN1YiI6IjY0ZWNkZjIxNTI1OGFlMDE0ZGYzYjlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj6V8kGVcNSLQ9lVcLDEXkbsr-LYuyCeuhMjBSEqkLs',
            },
          }
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  
  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.list}>
        {cast.length > 0 ? (
          cast.map(actor => (
              <li className={styles.item} key={actor.id}><img width='100px' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} /><h2> {actor.name}</h2> <p>"{actor.character}"</p></li>
              
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

export default Cast;