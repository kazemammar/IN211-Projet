import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import {
    AppBar,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useFetchMovies } from '../../components/Hooks/useFetchMovies';
import { Movie } from '../../components/Movie';
import logo from './logo.svg';
import NoPaddingContainer from '../../components/Elements/NoPaddingContainer';
import RadioMenu from '../../components/Elements/RadioMenu';
import {
    orderedAlphabeticalCompare,
    orderedDateCompare,
    reversedAlphabeticalCompare,
    reversedDateCompare,
} from '../../utility/utility';

const sortValues = ['Alphabetical', 'Date'];
const orderValues = ['Ordered', 'Reversed'];

const sortCompareFunctions = {
    Alphabetical: {
        Ordered: orderedAlphabeticalCompare,
        Reversed: reversedAlphabeticalCompare,
    },
    Date: { Ordered: orderedDateCompare, Reversed: reversedDateCompare },
};

const useStyles = makeStyles(theme => ({
    App: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
    },
    AppBarField: {
        paddingRight: theme.spacing(1),
    },
    SecondAppBar: {
        margin: 0,
    },
    menus: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
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
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const handleOpenFilterMenu = event => {
        setAnchorElFilter(event.currentTarget);
    };
    const handleCloseFilterMenu = () => {
        setAnchorElFilter(null);
    };

    const [sortValue, setSortValue] = useState('Alphabetical');
    const handleSortChange = event => {
        setSortValue(event.target.value);
    };

    const [orderValue, setOrderValue] = useState('Ordered');
    const handleOrderChange = event => {
        setOrderValue(event.target.value);
    };

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
            setFilteredMovies([
                ...movies.sort(sortCompareFunctions[sortValue][orderValue]),
            ]);

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

    const order = () => {
        // console.log('filter');
        var temp = filteredMovies;
        const callback = sortCompareFunctions[sortValue][orderValue];
        temp.sort(callback);
        setFilteredMovies([...temp]);
    };

    useEffect(() => {
        filter();
    }, [movieName, movies]);

    useEffect(() => {
        order();
    }, [orderValue, sortValue]);

    return (
        <div className={classes.App}>
            <NoPaddingContainer>
                <AppBar className={classes.SecondAppBar} position="static">
                    <Toolbar variant="dense" className="secondToolBar">
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
                        <Box
                            sx={{
                                // flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenFilterMenu}
                                color="inherit"
                            >
                                <FilterAltIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElFilter}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElFilter)}
                                onClose={handleCloseFilterMenu}
                            >
                                <RadioMenu
                                    name={'Sort'}
                                    value={sortValue}
                                    onChange={handleSortChange}
                                    values={sortValues}
                                />
                                <RadioMenu
                                    name={'Order'}
                                    value={orderValue}
                                    onChange={handleOrderChange}
                                    values={orderValues}
                                />
                            </Menu>
                        </Box>
                        <div className={classes.menus}>
                            <RadioMenu
                                name={'Sort'}
                                value={sortValue}
                                onChange={handleSortChange}
                                values={sortValues}
                            />
                            <Divider />
                            <RadioMenu
                                name={'Order'}
                                value={orderValue}
                                onChange={handleOrderChange}
                                values={orderValues}
                            />
                        </div>
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
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map(movie => <Movie movie={movie} />)
                    ) : (
                        <Typography variant="body1">No movies found</Typography>
                    )}
                </div>
            </NoPaddingContainer>
            {/* <p>This are the movies : </p> */}
            {/* {console.log(movieName, movieName === '', movies !== null)} */}
        </div>
    );
}

export default Home;
