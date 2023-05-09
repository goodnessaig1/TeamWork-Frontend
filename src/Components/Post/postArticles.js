import { useState } from 'react';
import '../Profile/Modal.css';
import './Post.css';
import { Formik, Form, Field } from 'formik';
import { Close, Collections } from '@material-ui/icons';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import * as Yup from 'yup';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import Category from './Category';
import { PostArticles } from '../../Auth/Actions/articleActions';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import ColorPicker from '../../Utils/ColorPicker';
import { MdVerified } from 'react-icons/md';

const PostArticlesModal = ({
    user,
    postArticleModal,
    setPostArticleModal,
    PostArticles,
    requesting,
    setPostGif,
    setPostGifModal,
}) => {
    // console.log(user);
    const [selectedColor, setSelectedColor] = useState(null);
    const handleUploadClick = (e) => {
        setPostGif(e);
        setPostArticleModal(false);
        setPostGifModal(true);
    };
    const colorId = selectedColor?.id;

    return (
        <div>
            {postArticleModal && (
                <div className="overlay">
                    <div className="upload">
                        <div className="upload_profile_right">
                            <div className="modal_top">
                                <span></span>
                                <h3>Create Post</h3>
                                <span
                                    className="close_upload"
                                    onClick={() => setPostArticleModal(false)}
                                >
                                    <Close className="close_upload_icon" />
                                </span>
                            </div>
                            <hr className="upload_hr" />
                        </div>
                        <div className="upload_profile_container">
                            <div>
                                <ProfilePicture
                                    image={user?.profile}
                                    className="profile___image"
                                />
                            </div>
                            <div className="user__name">
                                {user && (
                                    <div className="user_name_top">
                                        <h4 className="userName">
                                            {`${user?.firstName} ${user?.lastName}`}
                                            {user.isAdmin && (
                                                <MdVerified className="verified" />
                                            )}
                                        </h4>
                                        <span>{user?.jobRole}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                title: '',
                                article: '',
                                categoryId: undefined,
                                colorId: '',
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Required')
                                    .max(35, 'Please, make the title brief'),
                                article: Yup.string().required('Required'),
                            })}
                            onSubmit={(values) => {
                                // console.log(values);
                                PostArticles(values).then((response) => {
                                    const { data } = response;
                                    if (data.status === 'success') {
                                        toast.success('Successful', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                        setPostArticleModal(false);
                                    }
                                });
                            }}
                        >
                            {({ setFieldValue, handleSubmit }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="post_inputs">
                                                <div className="post_input_container category">
                                                    <div className="category_select">
                                                        <Field
                                                            className="select_category"
                                                            name="categoryId"
                                                            as="select"
                                                        >
                                                            <option
                                                                defaultValue
                                                            >
                                                                Category
                                                            </option>
                                                            <Category />
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className="post_input_container">
                                                    <TextInput
                                                        className="post_input"
                                                        name="title"
                                                        type="text"
                                                        label="Title"
                                                        placeholder="title"
                                                    />
                                                </div>
                                                <TextInput
                                                    name="article"
                                                    type="textarea"
                                                    style={{
                                                        backgroundColor:
                                                            selectedColor?.color,
                                                        color: selectedColor?.color
                                                            ? 'white'
                                                            : null,
                                                    }}
                                                    label="Article"
                                                    placeholder={`Share your thoughts, ${user?.firstName}`}
                                                />
                                            </div>

                                            <div className="add_to_post_container">
                                                <div>
                                                    <ColorPicker
                                                        selectedColor={
                                                            selectedColor
                                                        }
                                                        setSelectedColor={
                                                            setSelectedColor
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="add_photo"
                                                    onClick={(e) =>
                                                        handleUploadClick(true)
                                                    }
                                                >
                                                    <div className="add__photo">
                                                        Add a photo
                                                        <Collections className="add_photo_icon" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="posts">
                                                {!requesting && (
                                                    <div className="upload_button">
                                                        <button
                                                            type="submit"
                                                            onClick={() => {
                                                                setFieldValue(
                                                                    'colorId',
                                                                    colorId
                                                                );
                                                            }}
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
        requesting: state.articles.PostArticles.requesting,
    };
};

export default connect(mapStateToProps, { PostArticles })(PostArticlesModal);
