import React from 'react';
import { useFetchUsers } from '../../components/Hooks/useFetchUsers';
import LoginForm from '../../components/Login/LoginForm';

export default function LoginPage() {
    const users = useFetchUsers();

    return <LoginForm />;
}
