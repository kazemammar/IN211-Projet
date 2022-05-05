import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchUser = id => {
    const [user, setUser] = useState(null);
    const [userLoadingError, setUserLoadingError] = useState(null);

    useEffect(() => {
        if (id) {
            const url = `${process.env.REACT_APP_BACKDEND_URL}/users/${id}`;
            axios
                .get(url)
                .then(response => {
                    if (response.data) {
                        if (response.data.user) {
                            setUser(response.data.user);
                        }
                    }
                })
                .catch(error => {
                    setUserLoadingError(
                        'An error occured while fetching user.'
                    );
                });
        }
    }, [id]);

    return { user: user, userLoadingError: userLoadingError };
};
