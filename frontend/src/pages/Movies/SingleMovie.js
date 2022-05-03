import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import './SingleMovie.js';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import MovieDetails from '../../components/Movies/MovieDetails.js';

export function SingleMovie(props) {
    console.log(props);
    const { id } = props;

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKDEND_URL}/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <MovieDetails movie={movie}></MovieDetails>
            </Container>
        </>
    );
}
