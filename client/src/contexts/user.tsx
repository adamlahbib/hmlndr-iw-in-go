import React, { useContext, useState, useEffect, ReactNode } from 'react';

import { axios } from '../util';

export interface ILoginArgs {
    email: string;
    password: string;
}

export interface IRegisterArgs {
    email: string;
    password: string;
    name: string;
    bio: string;
    image: string;
}

interface IUserContext {
    user: {
        Cover: string;
        Image: string;
        Name: string;
        Bio: ReactNode;
        Email: ReactNode;
        ID: ReactNode;
};
    isAuthenticated: boolean;
    userLoading: boolean;
    login: (arg0: ILoginArgs) => Promise<any>;
    register: (arg0: IRegisterArgs) => Promise<any>;
    logout: () => Promise<any>;
}

export const UserContext = React.createContext<IUserContext>(
    {} as IUserContext
);
export const useUser = () => useContext(UserContext);

interface IProps {
    children?: ReactNode;
}

export const UserProvider = ({ children }: IProps) => {
    const [userLoading, setUserLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({
        Cover: '',
        Image: '',
        Name: '',
        Bio: '',
        Email: '',
        ID: '',
    });

    const login = async ({ email, password }: ILoginArgs) => {
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            //setUser(data);
            //save data in localstorage as the name token
            console.log(data.message);
            localStorage.setItem('token', data.message);
            setIsAuthenticated(true);
            setUserLoading(false);
        } catch (error: any) {
            console.error(error.message);
            return error;
        }
    };

    const register = async ({ email, password, name, bio, image }: IRegisterArgs) => {
        try {
            const { data } = await axios.post('/signup', {
                email,
                password,
                name,
                bio,
                image
            });
            //setUser(data);
            //save data in localstorage as the name token
            console.log(data.message);
            setIsAuthenticated(false);
            setUserLoading(false);
        } catch (error: any) {
            console.error(error.message);
            return error;
        }
    };

    const logout = async () => {
        // await axios.get('/logout');
        setUser({
            Cover: '',
            Image: '',
            Name: '',
            Bio: '',
            Email: '',
            ID: '',
        });
        setIsAuthenticated(false);
        // delete data in localstorage as the name token
        localStorage.removeItem('token');
    };

    const getUser = async () => {
        const { data } = await axios.get('/user');

        if (data) {
            setUser(data.message);
            setIsAuthenticated(true);
        }

        setUserLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                userLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
