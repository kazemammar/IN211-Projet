import { useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import './AddMovieForm.css';
import { LockOutlined, Movie } from '@mui/icons-material';
const DEFAULT_FORM_VALUES = {
    title: '',
    release_date: '',
    poster_path: '',
    overview: '',
};

const useSaveMovie = () => {
    const [movieCreationError, setMovieCreationError] = useState(null);
    const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);
    const displayCreationSuccessMessage = () => {
        setMovieCreationSuccess('New movie created successfully');
        setTimeout(() => {
            setMovieCreationSuccess(null);
        }, 3000);
    };

    const saveMovie = (event, formValues, setFormValues) => {
        console.log('formValues', formValues);
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
        movieCreationError: movieCreationError,
        movieCreationSuccess: movieCreationSuccess,
    };
};

function AddMovieForm() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveMovie, movieCreationError, movieCreationSuccess } =
        useSaveMovie();

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Movie />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Movie
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        // onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="title"
                                    name="movieTitle"
                                    required
                                    fullWidth
                                    id="movieTitle"
                                    label="Movie Title"
                                    value={formValues.title}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            title: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* */}
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    id="releaseDate"
                                    label="Date"
                                    name="releaseDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.release_date}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            release_date: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="imageUrl"
                                    label="Image URL"
                                    name="poster_path"
                                    autoComplete="imageUrl"
                                    value={formValues.poster_path}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            poster_path: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="overview"
                                    label="Overview"
                                    name="overview"
                                    autoComplete="overview"
                                    multiline
                                    value={formValues.overview}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            overview: event.target.value,
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {movieCreationError !== null && (
                                    <div className="user-creation-error">
                                        {movieCreationError}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {movieCreationSuccess !== null && (
                                    <div className="user-creation-success">
                                        {movieCreationSuccess}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={event =>
                                saveMovie(event, formValues, setFormValues)
                            }
                        >
                            Add Movie
                        </Button>
                    </Box>
                </Box>
            </Container>
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
