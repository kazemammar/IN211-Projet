import { createContext, useContext, useState } from 'react';
import { useFetchUser } from '../components/Hooks/useFetchUser';

export const UserContext = createContext();

const UserConsumer = UserContext.Consumer;

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider = props => {
    const [id, setId] = useState(null);
    const user = useFetchUser(id);

    const connectUser = newId => {
        setId(newId);
    };

    const value = { user: user.user, connectUser: connectUser };

    return (
        <UserContext.Provider value={value}>
            {/* {console.log("convs", conversations)} */}
            {props.children}
        </UserContext.Provider>
    );
};
