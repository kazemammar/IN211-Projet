import './Users.css';
import { useState } from 'react';
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Add, Login } from '@mui/icons-material/';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';
import LoginDialog from '../../components/Login/LoginDialog';

function Users() {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const handleClickOpen = () => {
        setOpenSignUp(true);
    };

    const handleClose = () => {
        setOpenSignUp(false);
    };

    return (
        <Container>
            <UsersTable />
            <Grid container spacing={1} justifyContent="space-between">
                <Grid item>
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={handleClickOpen}
                    >
                        New User
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        startIcon={<Login />}
                        onClick={() => {
                            setOpenLogin(true);
                        }}
                    >
                        Log In
                    </Button>
                </Grid>
                <Dialog open={openSignUp} onClose={handleClose}>
                    <DialogContent>
                        <AddUserForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <LoginDialog open={openLogin} setOpen={setOpenLogin} />
            </Grid>
        </Container>
    );
}

export default Users;
