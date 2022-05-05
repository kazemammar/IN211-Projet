import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import {
    AppBar,
    Container,
    InputBase,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useFetchMovies } from '../../components/Hooks/useFetchMovies';
import { Movie } from '../../components/Movie';
import logo from './logo.svg';

const useStyles = makeStyles(theme => ({
    App: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
    },
    Container: {
        maxWidth: `${theme.breakpoints.values.xl}px`,
        padding: 0,
        margin: 0,
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

function Home() {
    const classes = useStyles();
    const [movieName, setMovieName] = useState('');
    const handleChange = event => {
        setMovieName(event.target.value);
    };
    const [filteredMovies, setFilteredMovies] = useState([]);
    const movies = useFetchMovies();

    const filter = () => {
        // console.log('filter');
        if (movieName === '') {
            setFilteredMovies([]);

            return;
        }
        var temp = [];
        for (const movie of movies) {
            if (movie.title.includes(movieName)) {
                temp = [...temp, movie];
            }
        }
        setFilteredMovies(temp);
    };

    useEffect(() => {
        filter();
    }, [movieName]);

    return (
        <div className={classes.App}>
            {/* {console.log('movies', movies)} */}
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}

            {/* <p>This is my movie Name: {movieName}</p> */}
            <div className={classes.Container}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        {' '}
                        <Search value={movieName} onChange={handleChange}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
                {/* <TextField
                    size="small"
                    id="outlined-basic"
                    label="Search Movie"
                    variant="outlined"
                    id="movieName"
                    color="primary"
                    value={movieName}
                    onChange={handleChange}
                /> */}
                <div className="moviesGrid">
                    {movieName === '' ? (
                        movies !== null &&
                        movies.map(movie => <Movie movie={movie} />)
                    ) : filteredMovies.length > 0 ? (
                        filteredMovies.map(movie => <Movie movie={movie} />)
                    ) : (
                        <Typography variant="body1">No movies found</Typography>
                    )}
                </div>
            </div>
            {/* <p>This are the movies : </p> */}
            {/* {console.log(movieName, movieName === '', movies !== null)} */}
        </div>
    );
}

export default Home;
