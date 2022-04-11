import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const DEFAULT_FORM_VALUES = {
    title: '',
    release_date: '',
    image_url: '',
};

const useSaveMovie = () => {
    const [movieCreationError, setMovieCreationError] = useState(null);
    const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);
    const displayCreationSuccessMessage = () => {
        setMovieCreationSuccess('New user created successfully');
        setTimeout(() => {
            setMovieCreationSuccess(null);
        }, 3000);
    };

    const saveMovie = (event, formValues, setFormValues) => {
        // This avoid page reload
        event.preventDefault();

        setMovieCreationError(null);
        if (formValues.title === '') {
            console.error('Missing title, this field is required');

            return;
        }

        axios
            .post(
                `${process.env.REACT_APP_BACKDEND_URL}/movies/new`,
                formValues
            )
            .then(() => {
                displayCreationSuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
            })
            .catch(error => {
                setMovieCreationError(
                    'An error occured while creating new movie.'
                );
                console.error(error);
            });
    };

    return {
        saveMovie: saveMovie,
        userCreationError: movieCreationError,
        userCreationSuccess: movieCreationSuccess,
    };
};

function AddMovieForm() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveMovie, movieCreationError, movieCreationSuccess } =
        useSaveMovie();

    return (
        <div>
            <form
                className="add-movie-form"
                onSubmit={event => saveMovie(event, formValues, setFormValues)}
            >
                <input
                    className="add-movie-input"
                    type="type"
                    placeholder="Title"
                    value={formValues.title}
                    onChange={event =>
                        setFormValues({
                            ...formValues,
                            email: event.target.value,
                        })
                    }
                />
                <input
                    className="add-movie-input"
                    placeholder="Release date"
                    value={formValues.release_date}
                    onChange={event =>
                        setFormValues({
                            ...formValues,
                            release_date: event.target.value,
                        })
                    }
                />
                <input
                    className="add-movie-input"
                    placeholder="Image URL"
                    value={formValues.image_url}
                    onChange={event =>
                        setFormValues({
                            ...formValues,
                            image_url: event.target.value,
                        })
                    }
                />
                <button className="add-user-button" type="submit">
                    Add movie
                </button>
            </form>
            {movieCreationSuccess !== null && (
                <div className="movie-creation-success">
                    {movieCreationSuccess}
                </div>
            )}
            {movieCreationError !== null && (
                <div className="movie-creation-error">{movieCreationError}</div>
            )}
        </div>
    );
}

export default AddMovieForm;
