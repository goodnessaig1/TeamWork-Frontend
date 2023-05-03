import { Close } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React from 'react';
import { TextInput } from '../../Utils/FormLib';
import * as Yup from 'yup';
import { ProgressBar } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { ChangeUserNumber } from '../../Auth/Actions/userActions';

const ChangePhoneNumber = ({
    phoneNumber,
    setPhoneNumber,
    userDetail,
    requesting,
    ChangeUserNumber,
}) => {
    return (
        <div>
            {phoneNumber && (
                <div className="overlay">
                    <div className="change_phone_number_modal">
                        <div>
                            <div className="close_num_container">
                                <div
                                    className="close_num"
                                    onClick={() => setPhoneNumber(false)}
                                >
                                    <Close className="close_upload_icon" />
                                </div>
                            </div>
                            <div className="change__number">
                                <span>Enter new number</span>
                                <Formik
                                    initialValues={{
                                        number: userDetail?.number
                                            ? userDetail?.number
                                            : '',
                                    }}
                                    validationSchema={Yup.object({
                                        number: Yup.string()
                                            .matches(
                                                /^(?:\+234|0)[789]\d{9}$/,
                                                'Invalid phone number'
                                            )
                                            .required(
                                                'Phone number is required'
                                            ),
                                    })}
                                    onSubmit={(values) => {
                                        ChangeUserNumber(values).then(
                                            (response) => {
                                                const { data } = response;
                                                if (data.status === 'success') {
                                                    toast.success(
                                                        'Successful',
                                                        {
                                                            position:
                                                                toast.POSITION
                                                                    .TOP_RIGHT,
                                                        }
                                                    );
                                                    setPhoneNumber(false);
                                                }
                                            }
                                        );
                                    }}
                                >
                                    {({ handleSubmit }) => {
                                        return (
                                            <>
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="number_inputs post_input_container">
                                                        <TextInput
                                                            className="number_input"
                                                            name="number"
                                                            type="text"
                                                            placeholder="Add number"
                                                        />
                                                    </div>

                                                    <div
                                                        className="change_btn"
                                                        style={{
                                                            marginTop: '15px',
                                                        }}
                                                    >
                                                        {!requesting && (
                                                            // <div className="_button">
                                                            <button
                                                                type="submit"
                                                                className="change__btn"
                                                            >
                                                                CHANGE
                                                            </button>
                                                            // </div>
                                                        )}
                                                        {requesting && (
                                                            <div className="audio_btn">
                                                                <ProgressBar
                                                                    height="55"
                                                                    width="60"
                                                                    ariaLabel="progress-bar-loading"
                                                                    wrapperClass="progress-bar-wrapper"
                                                                    borderColor="blue"
                                                                    barColor="rgba(121, 144, 225, 1)"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Form>
                                            </>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        requesting: state.user.ChangeUserNumber?.requesting,
    };
};

export default connect(mapStateToProps, { ChangeUserNumber })(
    ChangePhoneNumber
);
