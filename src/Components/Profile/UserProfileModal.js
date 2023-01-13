import { useState } from 'react';
import './Modal.css';
import { Formik, Form } from 'formik';
import { AddToPhotos } from '@material-ui/icons';
import { connect } from 'react-redux';
import { UploadProfilePhoto } from '../../Auth/Actions/userActions';
import { Audio } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const UserProfileModal = ({ UploadProfilePhoto, setProfile }) => {
    const [preview, setPreview] = useState([]);

    const handlePhotoChange = (e, setFieldValue) => {
        const files = e.target.files[0];
        setFieldValue('profile', files);
        if (files) {
            const reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = () => {
                setPreview(reader.result);
            };
        }
    };

    const handleClick = (e) => {
        if (e.target.classList.contains('dismiss')) {
            setProfile(null);
        }
    };

    const handleCancle = (e) => {
        if (e.target) {
            setPreview([]);
        }
    };

    return (
        <div className="overlay dismiss" onClick={handleClick}>
            <div className="modal_container">
                <div className="upload_profile_right">
                    <div className="modal_top">
                        <h3>Upload Profile</h3>
                        <span className="dismiss button" onClick={handleClick}>
                            X
                        </span>
                    </div>
                    <hr className="upload_hr" />
                </div>
                <Formik
                    initialValues={{
                        profile: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        let formData = new FormData();
                        formData.append(`profile`, values.profile);
                        UploadProfilePhoto(formData).then((response) => {
                            const { data } = response;
                            if (data.status === 'success') {
                                toast.success('Successful', {
                                    position: toast.POSITION.TOP_RIGHT,
                                });
                                setProfile(null);
                            }
                            setSubmitting(false);
                        });
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => {
                        return (
                            <>
                                <Form>
                                    {preview.length === 0 && (
                                        <div className="upload_center">
                                            <div className="dropzoneContainer">
                                                <label className="upload_middle">
                                                    <AddToPhotos className="icon" />
                                                    <span>Add Photo</span>
                                                    <input
                                                        className="upload_input"
                                                        name="profile"
                                                        accept="image/*"
                                                        type="file"
                                                        onChange={(e) => {
                                                            handlePhotoChange(
                                                                e,
                                                                setFieldValue
                                                            );
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {preview.length !== 0 && (
                                        <div className="image">
                                            <img
                                                src={preview}
                                                alt=""
                                                className="selected_image"
                                            />
                                            <div
                                                className="cancel"
                                                onClick={handleCancle}
                                            >
                                                X
                                            </div>
                                        </div>
                                    )}
                                    <div className="button_container">
                                        {!isSubmitting && (
                                            <div className="upload_button">
                                                <button
                                                    type="submit"
                                                    className="submit_btn"
                                                >
                                                    Upload
                                                </button>
                                            </div>
                                        )}
                                        {isSubmitting && (
                                            <Audio
                                                type="ThreeDots"
                                                color="rgba(121, 144, 225, 1)"
                                                height={33}
                                                width={20}
                                            />
                                        )}
                                    </div>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default connect(null, { UploadProfilePhoto })(UserProfileModal);
