import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

export default function LoginDialog(props) {
    const { open, setOpen } = props;
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <LoginForm onClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
