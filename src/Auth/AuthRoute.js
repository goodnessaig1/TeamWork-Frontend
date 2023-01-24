import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserDetails } from './Actions/userActions';
import { useDispatch } from 'react-redux';

const AuthRoute = ({ component: Component, Failed, userStatus, ...rest }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);

    return (
        <Route
            {...rest}
            render={(props) =>
                userStatus && !Failed ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/sign_in' }} />
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.user,
        Failed: state.user?.getUserDetails.error,
    };
};

export default connect(mapStateToProps)(AuthRoute);
