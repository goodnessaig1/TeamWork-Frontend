import { Field, Form, Formik } from 'formik';
import React from 'react';
import { TextInput } from '../../Utils/FormLib';
import PageLayout from '../Pages/PageLayout';
import * as Yup from 'yup';
import { Audio } from 'react-loader-spinner';
import { RegisterUser } from '../../Auth/Actions/userActions';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const CreateAdmin = ({ RegisterUser }) => {
    const history = useHistory();

    return (
        <PageLayout>
            <div className="register_page_container">
                <div className="register_container">
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            gender: 'male' || '',
                            jobRole: '',
                            department: '',
                            isAdmin: true,
                            address: '',
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .min(2, 'First Name is too short')
                                .max(20, 'First Name is too long')
                                .required('Required'),
                            lastName: Yup.string()
                                .min(2, 'Last Name is too short')
                                .max(20, 'Last Name is too long')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            password: Yup.string()
                                .min(6, 'password is too short')
                                .max(70, 'password is too long')
                                .required('Required'),
                            jobRole: Yup.string()
                                .required('Required')
                                .min(
                                    2,
                                    'JobRole should be at least 6 Character'
                                )
                                .max(
                                    14,
                                    'JobRole should be a maximum of 14 Character'
                                ),
                            department: Yup.string().required('Required'),
                            address: Yup.string().required('Required'),
                        })}
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldError }
                        ) => {
                            RegisterUser(
                                values,
                                history,
                                setFieldError,
                                setSubmitting
                            );
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="register_form_inputs">
                                    <div className="input_container">
                                        <TextInput
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <div className="select">
                                            <Field name="gender" as="select">
                                                <option defaultValue>
                                                    Gender
                                                </option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="jobRole"
                                            type="text"
                                            placeholder="Job Role"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="department"
                                            type="text"
                                            placeholder="Department"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <TextInput
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                                <div className="button__group">
                                    {!isSubmitting && (
                                        <button
                                            type="submit"
                                            className="formButton"
                                        >
                                            Create Admin
                                        </button>
                                    )}
                                    {isSubmitting && (
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
                <div className="copyright">All rights reserved &copy; 2023</div>
            </div>
        </PageLayout>
    );
};

export default connect(null, { RegisterUser })(CreateAdmin);
