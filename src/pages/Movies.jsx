import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

const Movies = () => {
 
    // const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [searchQuery, setSearchQuery] = useSearchParams()
    const queryFromParams = searchQuery.get('q')|| ''
           const [movieName, setMovieName] = useState(queryFromParams);
    // console.log(searchQuery);
    const location = useLocation();
    console.log(location);
    
     const handleNameChange = (e) => {
        const newMovieName = e.currentTarget.value.toLowerCase();
         setMovieName(newMovieName);
         e.target.value ? setSearchQuery({q: e.target.value}): setSearchQuery({})
         
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
    
    

    return (
        <div>
            <h1>Films</h1>
            <input 
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                value={movieName}
                onChange={handleNameChange}
            />
            
          <button onClick={handleSearchClick}>Search</button>
            {searchResults.length === 0 ? ( // Перевіряємо, чи масив результатів порожній
                <p>No movies found</p> // Виводимо повідомлення, якщо результати відсутні
            ) : (
                    
                    <ul>
                        
                    {searchResults.map((movie) => (
                        <li key={movie.id}>
                            
                            <NavLink state={{from:location}} to={`/movies/${movie.id}`} >{movie.title}</NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default Movies;
