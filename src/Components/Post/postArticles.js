import '../Profile/Modal.css';
import './Post.css';
import { Formik, Form, Field } from 'formik';
import { Collections } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import * as Yup from 'yup';
import Unavailiabe from '../../Utils/unavailiable1.png';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import Category from './Category';
import { PostArticles } from '../../Auth/Actions/articleActions';

const PostArticlesModal = ({
    user,
    postArticleModal,
    setPostArticleModal,
    PostArticles,
    requesting,
    setPostGif,
    setPostGifModal,
}) => {
    const handleUploadClick = (e) => {
        setPostGif(e);
        setPostArticleModal(false);
        setPostGifModal(true);
    };
    return (
        <div>
            {postArticleModal && (
                <div className="overlay">
                    <div className="modal_containe upload">
                        <div className="upload_profile_right">
                            <div className="modal_top create_post">
                                <h3>Create Post</h3>
                                <span
                                    className="button cover "
                                    onClick={() => setPostArticleModal(false)}
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
                                article: '',
                                categoryId: '',
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Required')
                                    .max(35, 'Title too long'),
                                article: Yup.string().required('Required'),
                            })}
                            onSubmit={(values) => {
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
                            {() => {
                                return (
                                    <>
                                        <Form>
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
                                                <div className="post_input_container">
                                                    <TextInput
                                                        className="post_input"
                                                        name="article"
                                                        type="text"
                                                        label="Article"
                                                        placeholder="article"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="add_photo_container"
                                                onClick={(e) =>
                                                    handleUploadClick(true)
                                                }
                                            >
                                                <div className="add_photo">
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
                                                            className="submit_btn"
                                                        >
                                                            POST
                                                        </button>
                                                    </div>
                                                )}
                                                {requesting && (
                                                    <div className="audio_btn">
                                                        <Audio
                                                            type="ThreeDots"
                                                            color="rgba(121, 144, 225, 1)"
                                                            height={35}
                                                            width={30}
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
