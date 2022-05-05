import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { transformMovies } from '../../utility/utility';

export default function useFetchMovie(id) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        // console.log('i am using useffect');
        axios
            // .get(
            //     `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US`
            // )
            .get(`${process.env.REACT_APP_BACKDEND_URL}/movies/${id}/`)
            .then(res => {
                var temp_movies = res.data.data.movies;
                transformMovies(temp_movies);
                setMovie(temp_movies[0]);
            });
    }, [id]);
    //   console.log('movies', movies);

    return movie;
}
