import { useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import styles from './Movies.module.css'
const Movies = () => {
 
    // const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [searchQuery, setSearchQuery] = useSearchParams()
    const queryFromParams = searchQuery.get('q')|| ''
           const [movieName, setMovieName] = useState(queryFromParams);
    // console.log(searchQuery);
    const location = useLocation();


    
    
     const handleNameChange = (e) => {
        const newMovieName = e.currentTarget.value.toLowerCase();
         setMovieName(newMovieName);
         e.target.value ? setSearchQuery({q: e.target.value}): setSearchQuery({})
         
    };
     const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    
    const handleSearchClick = () => {
    const newMovieName = movieName.toLowerCase(); // Отримуємо назву фільму з інпуту
    setMovieName(newMovieName); // Зберігаємо назву в стані

    const apiKey = 'def4cccd6431cc54dcd0cd8678ae472b';
    const url = `https://api.themoviedb.org/3/search/movie?query=${newMovieName}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results) {
                setSearchResults(data.results);
            }
        })
        .catch(err => {
            console.error(err);
        });
    };
    
    useEffect(() => {
    handleSearchClick()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
    return (
        <div className={styles.container}>
            <h1>Films</h1>
            <input 
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                className={styles.input}
                value={movieName}
                onChange={handleNameChange}
                onKeyDown={handleKeyPress}
            />
            
          <button onClick={handleSearchClick}>Search</button>
            
                    <ul className={styles.list}>
                        
                    {searchResults.map((movie) => (
                        <li className={styles.item} key={movie.id}>
                            
                            <NavLink className={styles.link} state={{from:location}} to={`/movies/${movie.id}`} >{movie.title}</NavLink>
                        </li>
                    ))}
                </ul>
           
        </div>
    );
};


export default Movies;
