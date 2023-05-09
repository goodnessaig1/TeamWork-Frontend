import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getUserDetails } from './Actions/userActions';

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAdmin ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user?.userData?.isAdmin,
    };
};

export default connect(mapStateToProps)(AdminRoute);
