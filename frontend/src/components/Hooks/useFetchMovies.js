import { useEffect, useState } from 'react';
import axios from 'axios';
import { transformMovies } from '../../utility/utility';

export function useFetchMovies(friendID) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // console.log('i am using useffect');
        axios
            // .get(
            //     `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US`
            // )
            .get(`${process.env.REACT_APP_BACKDEND_URL}/movies`)
            .then(res => {
                // console.log('retour', res.data.results);
                var temp_movies = res.data.data.movies;
                transformMovies(temp_movies);
                setMovies(temp_movies);
            });
    }, []);
    //   console.log('movies', movies);

    return movies;
}
