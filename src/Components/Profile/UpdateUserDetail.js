import '../Profile/Modal.css';
import '../Post/Post.css';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import * as Yup from 'yup';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import { Close } from '@material-ui/icons';
import { UpdateUserDetails } from '../../Auth/Actions/userActions';

const UpdateUserDetail = ({
    setUpdateUserDetails,
    UpdateUserDetails,
    requesting,
    user,
}) => {
    const id = user?.userId;
    return (
        <div>
            <div className="overlay">
                <div className="edit_modal">
                    <div className="upload_profile_right">
                        <div className="modal_top create_post">
                            <span></span>
                            <h3>Edit profile</h3>
                            <span
                                className="close_upload cover "
                                onClick={() => setUpdateUserDetails(false)}
                            >
                                <Close className="close_upload_icon" />
                            </span>
                        </div>
                        <hr className="upload_hr" />
                    </div>

                    <Formik
                        initialValues={{
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            address: user?.address,
                            phoneNumber: user?.number || '',
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .required('Required')
                                .max(12, 'Please, make it brief'),
                            lastName: Yup.string()
                                .required('Required')
                                .max(12, 'Please, make it brief'),
                            address: Yup.string().required('Required'),
                            phoneNumber: Yup.string()
                                .matches(
                                    /^(?:\+234|0)[789]\d{9}$/,
                                    'Invalid phone number'
                                )
                                .required('Phone number is required'),
                        })}
                        onSubmit={(values) => {
                            UpdateUserDetails(values, id).then((response) => {
                                const { data } = response;
                                if (data.status === 'success') {
                                    toast.success('Successful', {
                                        position: toast.POSITION.TOP_RIGHT,
                                    });
                                    setUpdateUserDetails(false);
                                }
                            });
                        }}
                    >
                        {({ handleSubmit }) => {
                            return (
                                <>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="edit_inputs">
                                            <div className="edit__input">
                                                <TextInput
                                                    className="edit_input"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div className="edit__input">
                                                <TextInput
                                                    name="lastName"
                                                    type="text"
                                                    placeholder="Last name"
                                                    className="edit_input"
                                                />
                                            </div>
                                            <div className="edit__input">
                                                <TextInput
                                                    name="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    className="edit_input"
                                                />
                                            </div>
                                            <div className="edit__input">
                                                <TextInput
                                                    name="phoneNumber"
                                                    type="text"
                                                    placeholder="phoneNumber"
                                                    className="edit_input"
                                                />
                                            </div>
                                        </div>
                                        <div className="update_info">
                                            {!requesting && (
                                                <button
                                                    type="submit"
                                                    className="edit___btn"
                                                >
                                                    UPDATE
                                                </button>
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
    );
};

const mapStateToProps = (state) => {
    return {
        requesting: state.user?.UpdateUserDetails?.requesting,
    };
};

export default connect(mapStateToProps, { UpdateUserDetails })(
    UpdateUserDetail
);
