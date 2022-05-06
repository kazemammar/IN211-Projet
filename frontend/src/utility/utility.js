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

export const orderedAlphabeticalCompare = (elt1, elt2) => {
    return elt1.title.localeCompare(elt2.title, undefined, { numeric: true });
};
export const reversedAlphabeticalCompare = (elt1, elt2) => {
    return elt2.title.localeCompare(elt1.title, undefined, { numeric: true });
};
export const orderedDateCompare = (elt1, elt2) => {
    if (elt1.release_date < elt2.release_date) {
        return -1;
    } else {
        return 1;
    }
};
export const reversedDateCompare = (elt1, elt2) => {
    if (elt1.release_date < elt2.release_date) {
        return 1;
    } else {
        return -1;
    }
};
