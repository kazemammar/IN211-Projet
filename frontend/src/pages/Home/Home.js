import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useFetchMovies } from '../../components/Hooks/useFetchMovies';
import { Movie } from '../../components/Movie';
import logo from './logo.svg';

function Home() {
    const [movieName, setMovieName] = useState('');
    const handleChange = event => {
        setMovieName(event.target.value);
    };
    const [filteredMovies, setFilteredMovies] = useState([]);
    const movies = useFetchMovies();

    const filter = () => {
        // console.log('filter');
        if (movieName === '') {
            setFilteredMovies([]);

            return;
        }
        var temp = [];
        for (const movie of movies) {
            if (movie.title.includes(movieName)) {
                temp = [...temp, movie];
            }
        }
        setFilteredMovies(temp);
    };

    useEffect(() => {
        filter();
    }, [movieName]);

    return (
        <div className="App">
            {/* {console.log('movies', movies)} */}
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
            <div>
                <p>This is my movie Name: {movieName}</p>
                <form>
                    <input
                        type="text"
                        id="movieName"
                        value={movieName}
                        onChange={handleChange}
                    />
                </form>
                <p>This are the movies : </p>
                {/* {console.log(movieName, movieName === '', movies !== null)} */}
                <div className="moviesGrid">
                    {movieName === '' ? (
                        movies !== null &&
                        movies.map(movie => <Movie movie={movie} />)
                    ) : filteredMovies.length > 0 ? (
                        filteredMovies.map(movie => <Movie movie={movie} />)
                    ) : (
                        <p>No movies found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
