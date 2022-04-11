import { BASE_IMAGE_URL } from '../utility/utility';
import './Movie.css';
export const Movie = ({ movie }) => {
    // console.log(movie);

    return (
        <div className="movie">
            <div className="movieDetails">
                <p>{movie.title} </p>
                <p>{movie.release_date} </p>
            </div>
            <img
                src={BASE_IMAGE_URL + movie.poster_path}
                alt={'Poster: ' + movie.title}
                className="movePoster"
            />
        </div>
    );
};
