import React from 'react';
import { MailOutline, Lock } from '@material-ui/icons';
import './Login.css';
import { Formik, Form } from 'formik';
import { TextInput } from '../../../Utils/FormLib';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

//  Auth & Redux
import { connect } from 'react-redux';
import { LoginUser } from '../../../Auth/Actions/userActions';

const Login = ({ LoginUser, requesting }) => {
    const history = useHistory();
    return (
        <div className="login_page_container">
            <div className="title">
                <h2>STAFFCONN</h2>
            </div>
            <div className="login_container">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(3, 'password is too short')
                            .max(70, 'password is too long')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        LoginUser(
                            values,
                            history,
                            setFieldError,
                            setSubmitting
                        );
                    }}
                >
                    {() => (
                        <Form>
                            <div className="form_inputs">
                                <div className="input_container">
                                    <TextInput
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        icon={<MailOutline />}
                                    />
                                </div>
                                <div className="input_container">
                                    <TextInput
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        icon={<Lock />}
                                    />
                                </div>
                            </div>
                            <div className="button__group">
                                {!requesting && (
                                    <button
                                        type="submit"
                                        className="formButton"
                                    >
                                        LOG IN
                                    </button>
                                )}
                                {requesting && (
                                    <Audio
                                        type="ThreeDots"
                                        color="rgba(121, 144, 225, 1)"
                                        height={20}
                                        width={10}
                                    />
                                )}
                            </div>
                            <div className="forget_password">
                                Forgot password?
                            </div>
                        </Form>
                    )}
                </Formik>
                <div>
                    <Link
                        to="/create-user"
                        className="signup_container text_link"
                    >
                        New user? Sign in
                    </Link>
                </div>
            </div>
            <div className="copyright">All rights reserved &copy; 2023</div>
        </div>
    );
};

Login.propTypes = {
    LoginUser: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        requesting: state.user.LoginUser?.requesting,
    };
};

export default connect(mapStateToProps, { LoginUser })(Login);
