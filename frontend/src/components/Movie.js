import { Link } from 'react-router-dom';
import { BASE_IMAGE_URL, displayDate } from '../utility/utility';
import './Movie.css';
export const Movie = ({ movie }) => {
    // console.log(movie);

    return (
        <Link to={`/movie/${movie.id}/`}>
            <div className="movie">
                <div className="movieDetails">
                    <p>{movie.title} </p>
                    <p>{displayDate(movie.release_date)} </p>
                </div>
                <img
                    src={BASE_IMAGE_URL + movie.poster_path}
                    alt={'Poster: ' + movie.title}
                    className="moviePoster"
                />
            </div>
        </Link>
    );
};
