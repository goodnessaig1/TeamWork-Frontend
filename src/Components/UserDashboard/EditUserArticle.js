import { useState } from 'react';
import '../Profile/Modal.css';
import '../Post/Post.css';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import * as Yup from 'yup';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import ColorPicker from '../../Utils/ColorPicker';
import { UpdateUserArticle } from '../../Auth/Actions/articleActions';
import { Close } from '@material-ui/icons';
import { MdVerified } from 'react-icons/md';

const UpdateUserArticleModal = ({
    user,
    setUpdateArticleModal,
    updateArticleModal,
    postToUpdate,
    setPostToUpdate,
    UpdateUserArticle,
    requesting,
}) => {
    const [selectedColor, setSelectedColor] = useState(postToUpdate);
    const colorId = selectedColor?.id;
    const articleId = postToUpdate.postid;
    return (
        <div>
            {updateArticleModal && (
                <div className="overlay">
                    <div className="upload">
                        <div className="upload_profile_right">
                            <div className="modal_top create_post">
                                <span></span>
                                <h3>Update Post</h3>
                                <span
                                    className="close_upload cover "
                                    onClick={() => setUpdateArticleModal(false)}
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
                                title: postToUpdate?.title,
                                article: postToUpdate?.post,
                                colorId: postToUpdate?.color_id,
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Required')
                                    .max(35, 'Please, make the title brief'),
                                article: Yup.string().required('Required'),
                            })}
                            onSubmit={(values) => {
                                UpdateUserArticle(values, articleId).then(
                                    (response) => {
                                        const { data } = response;
                                        if (data.status === 'success') {
                                            toast.success('Successful', {
                                                position:
                                                    toast.POSITION.TOP_RIGHT,
                                            });
                                            setUpdateArticleModal(false);
                                            setPostToUpdate(null);
                                        }
                                    }
                                );
                            }}
                        >
                            {({ setFieldValue, handleSubmit }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="post_inputs">
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
                                                    autoFocus
                                                    style={{
                                                        backgroundColor:
                                                            selectedColor?.color,
                                                        color: selectedColor?.color
                                                            ? 'white'
                                                            : null,
                                                    }}
                                                    label="Article"
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
                                            </div>
                                            <div
                                                className="posts"
                                                style={{ marginTop: '15px' }}
                                            >
                                                {!requesting && (
                                                    <div className="upload_button">
                                                        <button
                                                            type="submit"
                                                            onClick={() => {
                                                                setFieldValue(
                                                                    'colorId',
                                                                    colorId
                                                                        ? colorId
                                                                        : postToUpdate?.color_id
                                                                );
                                                            }}
                                                            className="submit_btn"
                                                        >
                                                            UPDATE
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
        user: state.user?.userData,
        articleData: state.articles?.articleData.articles,
        requesting: state.articles.UpdateUserArticle.requesting,
    };
};

export default connect(mapStateToProps, { UpdateUserArticle })(
    UpdateUserArticleModal
);
