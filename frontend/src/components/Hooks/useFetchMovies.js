import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMovies(friendID) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // console.log('i am using useffect');
        axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US`
            )
            .then(res => {
                // console.log('retour', res.data.results);
                setMovies(res.data.results);
            });
    }, []);
    //   console.log('movies', movies);

    return movies;
}
