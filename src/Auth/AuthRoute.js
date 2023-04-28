import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserDetails } from './Actions/userActions';
import { useDispatch } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);

    const token = localStorage.getItem('token');

    if (!token) {
        return <Redirect to="/sign_in" />;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return <Redirect to="/sign_in" />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AuthRoute;
