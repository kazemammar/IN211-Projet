import LockOutlined from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useFetchUsers } from '../Hooks/useFetchUsers';

const useStyles = makeStyles(theme => ({
    boundingBox: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    button: { margin: theme.spacing(3, 0, 2) },

    root: {
        width: '100%',
        gridRow: 1,
        // maxWidth: '36ch',
        // backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    selected: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrast,
    },
    ListItem: {
        width: '100%',
    },
}));
export default function LoginForm(props) {
    const classes = useStyles();
    const { onClose } = props;
    const { users } = useFetchUsers();
    const [newId, setNewId] = useState(null);
    const { connectUser } = useUser();

    const connect = () => {
        connectUser(newId);
        onClose();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                className={classes.boundingBox}
                // sx={{
                //     marginTop: 8,
                //     display: 'flex',
                //     flexDirection: 'column',
                //     alignItems: 'center',
                // }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <List fullWidth className={classes.root}>
                    {users.map(listUser => (
                        <Fragment key={listUser.id}>
                            <Box
                                className={
                                    listUser.id === newId && classes.selected
                                }
                            >
                                <ListItem
                                    className={classes.ListItem}
                                    button
                                    onClick={() => {
                                        setNewId(listUser.id);
                                    }}
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${listUser.firstname} ${listUser.lastname}`}
                                            src="/static/images/avatar/1.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${listUser.firstname} ${listUser.lastname}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="inherit"
                                                >
                                                    {listUser.email}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Box>
                        </Fragment>
                    ))}
                </List>
            </Box>
            <div className={classes.button}>
                {newId !== null ? (
                    <Button
                        color="secondary"
                        fullWidth
                        variant="contained"
                        onClick={connect}
                    >
                        Sign Up
                    </Button>
                ) : (
                    <Button
                        color="secondary"
                        fullWidth
                        variant="contained"
                        disabled
                    >
                        Sign Up
                    </Button>
                )}
            </div>
        </Container>
    );
}
