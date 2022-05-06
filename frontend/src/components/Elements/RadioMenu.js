import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import './Menus.css';

const useStyles = makeStyles(theme => ({
    Title: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
}));

export default function RadioMenu(props) {
    const classes = useStyles();

    const { onChange, value, values, name } = props;

    return (
        <div className="Menu">
            <Typography
                // variant="subtitle"
                color="textSecondary"
                className={classes.Title}
            >
                {name}:
            </Typography>
            <FormControl className="flexDisplay">
                <div className="flexDisplay">
                    <div>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            className="RadioGroup"
                            value={value}
                            onChange={onChange}
                        >
                            {values.map(local_value => (
                                <FormControlLabel
                                    key={local_value}
                                    value={local_value}
                                    control={<Radio />}
                                    label={local_value}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </FormControl>
        </div>
    );
}
