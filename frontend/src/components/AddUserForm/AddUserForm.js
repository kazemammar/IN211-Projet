import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const DEFAULT_FORM_VALUES = {
    email: '',
    firstname: '',
    lastname: '',
};

const useSaveUser = () => {
    const [userCreationError, setUserCreationError] = useState(null);
    const [userCreationSuccess, setUserCreationSuccess] = useState(null);
    const displayCreationSuccessMessage = () => {
        setUserCreationSuccess('New user created successfully');
        setTimeout(() => {
            setUserCreationSuccess(null);
        }, 3000);
    };

    const saveUser = (event, formValues, setFormValues) => {
        // This avoid page reload
        event.preventDefault();

        setUserCreationError(null);
        if (formValues.email === '') {
            console.error('Missing email, this field is required');

            return;
        }

        axios
            .post(`${process.env.REACT_APP_BACKDEND_URL}/users/new`, formValues)
            .then(() => {
                displayCreationSuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
            })
            .catch(error => {
                setUserCreationError(
                    'An error occured while creating new user.'
                );
                console.error(error);
            });
    };

    return { saveUser, userCreationError, userCreationSuccess };
};

function AddUserForm() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveUser, userCreationError, userCreationSuccess } = useSaveUser();

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        // onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={formValues.firstname}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            firstname: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formValues.lastname}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            lastname: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formValues.email}
                                    onChange={event =>
                                        setFormValues({
                                            ...formValues,
                                            email: event.target.value,
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {userCreationError !== null && (
                                    <div className="user-creation-error">
                                        {userCreationError}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                                {userCreationSuccess !== null && (
                                    <div className="user-creation-success">
                                        {userCreationSuccess}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={event =>
                                saveUser(event, formValues, setFormValues)
                            }
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default AddUserForm;
