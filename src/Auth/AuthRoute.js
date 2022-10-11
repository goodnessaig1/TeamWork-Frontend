/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect  } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserDetails } from './Actions/userActions';



const AuthRoute = ({ component: Component, getUserDetails, Failed, userStatus, ...rest }) => {

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
       <Route {...rest}
           render={props => (
                userStatus && !Failed ?
                   <Component {...props} />
                   :
                   <Redirect to={{ pathname: '/sign_in' }} />
           )}
       />
   );
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.user,
        Failed: state.user.failed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: () => dispatch(getUserDetails()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);