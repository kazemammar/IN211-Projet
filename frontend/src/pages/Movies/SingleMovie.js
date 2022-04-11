import React from 'react';
import Paper from '@mui/material/Paper';
import './SingleMovie.js';
import { Container, Grid } from '@mui/material';

export function SingleMovie(props) {
    console.log(props);

    return (
        <>
            <Container maxWidth="md">
                <Paper elevation={3}>
                    <Grid container>
                        <Grid item>
                            <img
                                className="singleMovieImage"
                                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6YrHMQwjaeLIa4kAMxgOGI76ao4.jpg"
                                alt="test"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}
