import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import './SingleMovie.js';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/Movies/MovieDetails.js';
import useFetchMovie from '../../components/Hooks/useFetchMovie.js';

export function SingleMovie(props) {
    console.log(props);
    // const { id } = props;

    const { id } = useParams('id');

    const movie = useFetchMovie(id);

    return (
        <>
            {/* <Container maxWidth="lg"> */}
            <MovieDetails movie={movie}></MovieDetails>
            {/* </Container> */}
        </>
    );
}
