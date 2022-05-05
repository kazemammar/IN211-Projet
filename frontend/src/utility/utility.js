import { DATE_LANGUAGE, DATE_OPTIONS } from './Constants';

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const displayDate = date => {
    if (!date) {
        return '';
    }
    const ret = date.toLocaleDateString(DATE_LANGUAGE, DATE_OPTIONS);

    return ret;
};

export const transformMovies = movies => {
    if (movies) {
        if (movies.length > 0) {
            for (var i = 0; i < movies.length; i++) {
                const date = new Date(movies[i].release_date);
                movies[i].release_date = date;
            }
        }
    }
};
