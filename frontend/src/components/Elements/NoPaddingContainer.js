import { makeStyles } from '@mui/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
    },
    Container: {
        margin: 0,
        [theme.breakpoints.down('xl')]: {
            width: '100%',
        },
        [theme.breakpoints.up('xl')]: {
            width: `${theme.breakpoints.values.xl}px`,
        },
        padding: 0,
        margin: 0,
    },
}));

export default function NoPaddingContainer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.Container}>{props.children}</div>
        </div>
    );
}
