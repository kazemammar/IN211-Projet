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
import React from 'react';
import './MovieDetails.css';

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
        about: {
            [theme.breakpoints.up('md')]: {
                width: '35%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '50%',
            },
        },
        description: {
            margin: theme.spacing(1),
            maxHeight: '90vh',

            // overflowY: 'auto',
        },

        titleSection: {
            margin: theme.spacing(1),
            [theme.breakpoints.up('lg')]: {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
            },
        },
        descriptionSection: {
            margin: theme.spacing(1),
            [theme.breakpoints.up('lg')]: {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();

    return (
        <div>
            {/* <Paper className={classes.card} elevation={3}> */}
            {/* <Grid container spacing={1}>
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
                </Grid> */}
            <div className="SingleMovieRoot">
                <div>
                    <img
                        className="DetailsPoster"
                        component="img"
                        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6YrHMQwjaeLIa4kAMxgOGI76ao4.jpg"
                        alt="test"
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
                                    The Big Lebowski
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    Release date: 12/12/2012
                                </Typography>
                            </div>
                            <div className={classes.descriptionSection}>
                                <Typography variant="h5" component="h2">
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    Présenté par un narrateur (Sam Elliott)
                                    comme un fainéant vivant dans le comté de
                                    Los Angeles, Jeffrey Lebowski, dit « le Dude
                                    » (Jeff Bridges), passe son temps à jouer au
                                    bowling avec ses amis Walter Sobchak (John
                                    Goodman) et Donny (Steve Buscemi). Un soir,
                                    en rentrant chez lui, il est attendu par
                                    deux voyous qui le somment de rendre
                                    l'argent que sa femme doit à Jackie
                                    Treehorn, et l'un d'eux urine sur son tapis
                                    juste avant qu'ils ne se rendent compte
                                    qu'ils ont fait erreur sur la personne,
                                    l'ayant confondu avec un autre Jeffrey
                                    Lebowski. Poussé par son ami Walter, le Dude
                                    se rend chez son homonyme, un millionnaire
                                    paraplégique (David Huddleston), afin
                                    d'obtenir un dédommagement pour son tapis
                                    souillé, qui lui est refusé. Le Dude quitte
                                    alors la résidence du millionnaire en volant
                                    un tapis, et rencontre Bunny Lebowski (Tara
                                    Reid), sa jeune épouse nymphomane.
                                </Typography>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
            {/* </Paper> */}
        </div>
    );
}
