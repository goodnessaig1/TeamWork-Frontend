import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import './UserProfile.css';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

const stepOneValidatiionSchema = Yup.object({
    previousPassword: Yup.string()
        .min(3, 'password is too short')
        .max(70, 'password is too long')
        .required('Required'),
});

export const StepOne = (props) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);
    const handleSubmit = (values) => {
        props.next(values);
    };
    return (
        <div className="change_password_container">
            <Formik
                validationSchema={stepOneValidatiionSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="password_container">
                            <span
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div className="password_input">
                                    <Field
                                        className="password__input"
                                        name="previousPassword"
                                        type="password"
                                        placeholder="password"
                                    ></Field>
                                </div>
                                <div className="error_msg">
                                    <ErrorMessage name="previousPassword" />
                                </div>
                            </span>
                            <button type="submit">Next</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const stepTwoValidatiionSchema = Yup.object({
    newPassword: Yup.string()
        .min(3, 'password is too short')
        .max(70, 'password is too long')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(3, 'password is too short')
        .max(70, 'password is too long')
        .required('Required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export const StepTwo = (props) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);
    const isRequesting = props.requesting;
    const handleSubmit = (values) => {
        props.next(values, true);
    };
    return (
        <div className="change_password_container">
            <Formik
                validationSchema={stepTwoValidatiionSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="password_container">
                            <span>
                                <div className="password_input">
                                    <Field
                                        className="password__input"
                                        name="newPassword"
                                        type="password"
                                        placeholder="New Password"
                                    ></Field>
                                </div>
                                <div className="error_msg">
                                    <ErrorMessage name="newPassword" />
                                </div>
                            </span>
                            <span>
                                <div className="password_input">
                                    <Field
                                        className="password__input"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                    ></Field>
                                </div>
                                <div className="error_msg">
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                            </span>
                            {!isRequesting && (
                                <button type="submit">Submit</button>
                            )}
                            {isRequesting && (
                                <Audio
                                    type="ThreeDots"
                                    color="rgba(121, 144, 225, 1)"
                                    height={20}
                                    width={10}
                                />
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
