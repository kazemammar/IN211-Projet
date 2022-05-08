import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchGenres = () => {
    const [genres, setGenres] = useState(null);
    const [genresLoadingError, setGenresLoadingError] = useState(null);

    const toggleGenre = id => {
        var temp = genres;
        for (var i = 0; i < temp.length; i++) {
            const genre = temp[i];
            if (genre.id === id) {
                genre.set = !genre.set;
            }
        }
        setGenres([...temp]);
    };

    useEffect(() => {
        const url = `${process.env.REACT_APP_BACKDEND_URL}/genres/`;
        axios
            .get(url)
            .then(response => {
                if (response.data) {
                    if (response.data.genres) {
                        var temp = response.data.genres;
                        if (genres) {
                            for (const genre of genres) {
                                temp = [
                                    ...temp,
                                    {
                                        id: genre.id,
                                        name: genre.name,
                                        set: false,
                                    },
                                ];
                            }
                        }
                        setGenres(temp);
                    }
                }
            })
            .catch(error => {
                setGenresLoadingError(
                    'An error occured while fetching genres.'
                );
            });
    }, []);

    return {
        genres: genres,
        genresLoadingError: genresLoadingError,
        toggleGenre: toggleGenre,
    };
};
