import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import './AddMovieForm.css';
import { Add, LockOutlined, Movie } from '@mui/icons-material';
import { useFetchGenres } from '../Hooks/useFetchGenres';
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

    const saveMovie = (event, formValues, setFormValues, genres) => {
        console.log('formValues', formValues);
        // This avoid page reload
        event.preventDefault();

        setMovieCreationError(null);
        if (formValues.title === '') {
            console.error('Missing title, this field is required');

            return;
        }
        var form = formValues;
        form.genres = [];
        for (const genre of genres) {
            if (genre.set) {
                form.genres = [...form.genres, genre.id];
            }
        }

        axios
            .post(`${process.env.REACT_APP_BACKDEND_URL}/movies/new`, form)
            .then(res => {
                if (res.status === 201) {
                    alert('Movie created successfully');
                }
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
    const { genres, toggleGenre } = useFetchGenres();
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveMovie, movieCreationError, movieCreationSuccess } =
        useSaveMovie();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Genres'}</DialogTitle>
                <DialogContent>
                    <FormControl
                        sx={{ m: 3 }}
                        component="fieldset"
                        variant="standard"
                    >
                        <FormLabel component="legend">
                            Check the movie genres
                        </FormLabel>
                        <FormGroup>
                            {genres &&
                                genres.map(genre => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                key={genre.id}
                                                checked={genre.set}
                                                onChange={() => {
                                                    toggleGenre(genre.id);
                                                }}
                                                name={genre.name}
                                            />
                                        }
                                        label={genre.name}
                                    />
                                ))}
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>

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
                                {genres &&
                                    genres.map(
                                        genre =>
                                            genre.set && (
                                                <Chip
                                                    sx={{ margin: 1 }}
                                                    label={genre.name}
                                                    variant="outlined"
                                                />
                                            )
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Add />}
                                    onClick={handleClickOpen}
                                >
                                    Add Genres
                                </Button>
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
                                saveMovie(
                                    event,
                                    formValues,
                                    setFormValues,
                                    genres
                                )
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
