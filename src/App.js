import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Hoc/Layout';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Register-Login/Login/Login';
import Register from './Components/Register-Login/Register/Register';
import RegistrationSuccess from './Components/Register-Login/Register/RegistrationSuccess';
import AuthRoute from './Auth/AuthRoute';
import MainPage from './Components/Dashboard/MainPage';
import UserProfile from './Components/Profile/UserProfile';
import ChangePassword from './Components/Profile/ChangePassword';
import ChangePasswordSuccess from './Components/Profile/ChangePasswordSuccess';
import Notification from './Components/Notifications/Notification';
import Upload from './Components/Upload/Upload';

const App = () => {
    return (
        <>
            <Switch>
                <Route path="/sign_in" exact component={Login} />
                <Route path="/create-user" exact component={Register} />
                <Route
                    path="/registration_success"
                    exact
                    component={RegistrationSuccess}
                />
                <Layout>
                    <div className="routes">
                        {/* Home Routes         */}
                        <Route path="/" exact component={Home} />
                        <AuthRoute
                            path="/dashboard"
                            exact
                            component={MainPage}
                        />
                        <AuthRoute path="/upload" exact component={Upload} />
                        <AuthRoute
                            path="/notifications"
                            exact
                            component={Notification}
                        />
                        <AuthRoute
                            path="/profile"
                            exact
                            component={UserProfile}
                        />
                        <AuthRoute
                            path="/change_password"
                            exact
                            component={ChangePassword}
                        />
                        <AuthRoute
                            path="/change_password_success"
                            exact
                            component={ChangePasswordSuccess}
                        />
                        {/* Routes Would go here */}
                    </div>
                </Layout>
            </Switch>
        </>
    );
};

export default App;
