import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [usersLoadingError, setUsersLoadingError] = useState(null);

    useEffect(() => {
        const url = `${process.env.REACT_APP_BACKDEND_URL}/users/`;
        axios
            .get(url)
            .then(response => {
                if (response.data) {
                    setUsers(response.data.users);
                }
            })
            .catch(error => {
                setUsersLoadingError('An error occured while fetching users.');
            });
    }, []);

    return { users, usersLoadingError };
};
