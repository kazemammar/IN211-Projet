import { breakpoints } from '@mui/system';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import { MovieSharp } from '@mui/icons-material';
import { displayDate } from '../../utility/utility';
import ReviewsSection from '../Reviews/ReviewsSection';

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(1),
        maxWidth: '100%',
        // display: 'flex',
        // flexWrap: 'wrap',
    },

    image: {
        // maxHeight: '90vh',
        marginTop: theme.spacing(1),
    },
    about: {
        [theme.breakpoints.up('md')]: {
            width: '35%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        },
        // overflowY: 'auto',
        padding: 0,
    },
    description: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // padding: theme.spacing(0),
        maxHeight: '90vh',
        scrollbarWidth: 'thin',
        overflowY: 'auto',
    },

    titleSection: {
        margin: theme.spacing(1),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
    subSection: {
        margin: theme.spacing(0),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function MovieDetails(props) {
    const { movie } = props;

    const classes = useStyles();

    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(movie.release_date);
    }, [movie]);

    return (
        <div>
            {movie && (
                <div className="SingleMovieRoot">
                    <div className={classes.image}>
                        <img
                            className="DetailsPoster"
                            component="img"
                            src={movie.poster_path}
                            alt={`${movie.title} poster`}
                        />
                    </div>
                    <div className={classes.about}>
                        <Paper className={classes.description}>
                            <div className="textArea">
                                <div className={classes.titleSection}>
                                    <Typography
                                        className="title"
                                        component="h1"
                                        variant="h3"
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        component="div"
                                    >
                                        {displayDate(movie.release_date) +
                                            ' — ' +
                                            (movie.genres &&
                                                movie.genres.map(
                                                    genre => `${genre.name} `
                                                ))}
                                    </Typography>
                                </div>
                                <div className={classes.subSection}>
                                    <Typography variant="h5" component="h2">
                                        Description
                                    </Typography>
                                    <Typography variant="body1">
                                        {movie.overview}
                                    </Typography>
                                </div>
                                <div className={classes.subSection}>
                                    <Typography variant="h5" component="h2">
                                        Reviews
                                    </Typography>
                                    <ReviewsSection movie_id={movie.id} />
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            )}

            {/* </Paper> */}
        </div>
    );
}
