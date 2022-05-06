import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMovies from '@mui/icons-material/LocalMovies';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { useUser } from '../../contexts/UserContext';
import LoginDialog from '../Login/LoginDialog';
import NoPaddingContainer from '../Elements/NoPaddingContainer';

const pages = [
    { name: 'Home', link: '/' },
    { name: 'Counter', link: '/counter' },
    { name: 'Users', link: '/users' },
    { name: 'About', link: '/about' },
    { name: 'New Novie', link: '/addmovie' },
];

const useStyles = makeStyles(theme => ({
    box: {
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
    },

    endBox: {
        display: { xs: 'none', md: 'flex' },
    },
}));

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const classes = useStyles();
    const userContext = useUser();
    const { user } = userContext;
    console.log(user);

    return (
        <AppBar position="static">
            <NoPaddingContainer>
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            className={classes.endBox}
                        >
                            {pages.map(page => (
                                <MenuItem
                                    component={Link}
                                    name={page.link}
                                    key={page.link}
                                    onClick={handleCloseNavMenu}
                                    to={page.link}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <LocalMovies />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                component={Link}
                                to={page.link}
                                name={page.link}
                                key={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box className={classes.endBox}>
                        {user !== null && (
                            <Typography variant="button">
                                {user.firstname + ' ' + user.lastname}
                            </Typography>
                        )}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => {
                                setLoginDialogOpen(true);
                            }}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <LoginDialog
                            open={loginDialogOpen}
                            setOpen={setLoginDialogOpen}
                        />
                    </Box>
                </Toolbar>
            </NoPaddingContainer>
        </AppBar>
    );
};
export default Header;

// <div className="Header-container">
//     <Link className="Link" to="/">
//         Home
//     </Link>
//     <div>|</div>
//     <Link className="Link" to="/counter">
//         Counter
//     </Link>
//     <div>|</div>
//     <Link className="Link" to="/users">
//         Users
//     </Link>
//     <div>|</div>
//     <Link className="Link" to="/about">
//         About
//     </Link>
//     <div>|</div>
//     <Link className="Link" to="/addmovie">
//         New Novie
//     </Link>
// </div>
