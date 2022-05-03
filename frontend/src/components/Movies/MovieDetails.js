import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export default function MovieDetails(props) {
    const { movie } = props;

    const useStyles = makeStyles(theme => ({
        card: {
            marginTop: theme.spacing(1),
            maxWidth: '100%',
            // display: 'flex',
            // flexWrap: 'wrap',
        },

        image: {
            maxHeight: '90vh',
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.card} elevation={3}>
                <Grid container spacing={1}>
                    <Grid item lg="6">
                        <div classNeme={classes.cardMedia}>
                            <img
                                className={classes.image}
                                component="img"
                                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6YrHMQwjaeLIa4kAMxgOGI76ao4.jpg"
                                alt="test"
                            />
                        </div>
                    </Grid>
                    <Grid item lg="6">
                        <CardContent>
                            <Typography component="div" variant="h5">
                                The Big Lebowski
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                Release date: 12/12/2012
                            </Typography>
                            <Typography variant="body1">
                                Présenté par un narrateur (Sam Elliott) comme un
                                fainéant vivant dans le comté de Los Angeles,
                                Jeffrey Lebowski, dit « le Dude » (Jeff
                                Bridges), passe son temps à jouer au bowling
                                avec ses amis Walter Sobchak (John Goodman) et
                                Donny (Steve Buscemi). Un soir, en rentrant chez
                                lui, il est attendu par deux voyous qui le
                                somment de rendre l'argent que sa femme doit à
                                Jackie Treehorn, et l'un d'eux urine sur son
                                tapis juste avant qu'ils ne se rendent compte
                                qu'ils ont fait erreur sur la personne, l'ayant
                                confondu avec un autre Jeffrey Lebowski. Poussé
                                par son ami Walter, le Dude se rend chez son
                                homonyme, un millionnaire paraplégique (David
                                Huddleston), afin d'obtenir un dédommagement
                                pour son tapis souillé, qui lui est refusé. Le
                                Dude quitte alors la résidence du millionnaire
                                en volant un tapis, et rencontre Bunny Lebowski
                                (Tara Reid), sa jeune épouse nymphomane.
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
