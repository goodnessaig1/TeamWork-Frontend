import '../Profile/Modal.css';
import React, { useState } from 'react';
import './Post.css';
import { Formik, Form } from 'formik';
import { AddToPhotos } from '@material-ui/icons';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import * as Yup from 'yup';
import Unavailiabe from '../../Utils/unavailiable1.png';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import { PostGif } from '../../Auth/Actions/gifActions';

const PostGifModal = ({
    user,
    requesting,
    postGifModal,
    setPostGifModal,
    setPostArticleModal,
    PostGif,
}) => {
    const [preview, setPreview] = useState([]);
    const handlePhotoChange = (e, setFieldValue) => {
        const files = e.target.files[0];
        setFieldValue('image', files);
        if (files) {
            const reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = () => {
                setPreview(reader.result);
            };
        }
    };
    const handleCancle = (e) => {
        if (e.target) {
            setPreview([]);
            setPostGifModal(false);
            setPostArticleModal(true);
        }
    };
    return (
        <div>
            {postGifModal && (
                <div className="overlay">
                    <div className="modal_containe upload">
                        <div className="upload_profile_right">
                            <div className="modal_top create_post">
                                <h3>Create Post</h3>
                                <span
                                    className="button cover "
                                    onClick={() => setPostGifModal(false)}
                                >
                                    X
                                </span>
                            </div>
                            <hr className="upload_hr" />
                        </div>
                        <div className="upload_profile_container">
                            <div>
                                {user?.profile ? (
                                    <img
                                        src={user.profile}
                                        alt=""
                                        className="profile___image"
                                    />
                                ) : (
                                    <img
                                        src={Unavailiabe}
                                        className="profile__image"
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="user__name">
                                {user && (
                                    <div className="user_name_top">
                                        <h4>{`${user.firstName} ${user.lastName}`}</h4>
                                        <span>{user.jobRole}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                title: '',
                                image: '',
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required('Required'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                let formData = new FormData();
                                formData.append(`image`, values.image);
                                formData.append(`title`, values.title);
                                PostGif(formData).then((response) => {
                                    const { data } = response;
                                    if (data.status === 'success') {
                                        toast.success('Successful', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                        setPostGifModal(false);
                                        setPreview([]);
                                    }
                                    setSubmitting(false);
                                });
                            }}
                        >
                            {({ setFieldValue }) => {
                                return (
                                    <>
                                        <Form>
                                            <div className="post_inputs gifs">
                                                <div className="post_input_container">
                                                    <div className="gif_drop_area">
                                                        <TextInput
                                                            className="post_input"
                                                            name="title"
                                                            type="text"
                                                            label="Title"
                                                            placeholder={`Share your toughts, ${user.firstName}`}
                                                        />
                                                        <div
                                                            className="toggle_modals"
                                                            onClick={
                                                                handleCancle
                                                            }
                                                        >
                                                            <span>X</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {preview.length === 0 && (
                                                    <div className="upload_gif_center">
                                                        <div className="gif_dropzone_container">
                                                            <label className="upload_middle">
                                                                <AddToPhotos className="icon" />
                                                                <span>
                                                                    Add Photo
                                                                </span>
                                                                <input
                                                                    className="upload_input"
                                                                    name="image"
                                                                    accept="image/*"
                                                                    type="file"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
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
                                                    <div className="gif_image">
                                                        <img
                                                            src={preview}
                                                            alt=""
                                                            className="selected_gif"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="posts">
                                                {!requesting && (
                                                    <div className="upload_button gif_upload_btn">
                                                        <button
                                                            type="submit"
                                                            className="submit_btn"
                                                        >
                                                            POST
                                                        </button>
                                                    </div>
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
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData,
        requesting: state.gifs.PostGif.requesting,
    };
};

export default connect(mapStateToProps, { PostGif })(PostGifModal);
