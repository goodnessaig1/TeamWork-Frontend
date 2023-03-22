import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { TextInput } from '../../Utils/FormLib';
import { Send } from '@material-ui/icons';
import { PostArticleComment } from '../../Auth/Actions/articleActions';
import { Comment, RotatingLines } from 'react-loader-spinner';
import { ProfilePicture } from '../../Utils/ProfilePicture';

const ArticleCommentModal = ({
    articleData,
    user,
    setArticleModal,
    comments,
    PostArticleComment,
    postCommentRequest,
    requesting,
}) => {
    const articleId = articleData?.postid;

    return (
        <div className="single_modal_container">
            <div className="modal_holder">
                <div className="close_modal_container">
                    <div
                        style={{ marginTop: '5px' }}
                        className="close_modal"
                        onClick={() => setArticleModal(false)}
                    >
                        X
                    </div>
                </div>
                <hr style={{ marginTop: '5px' }} />
                <>
                    {!requesting && (
                        <>
                            <div>
                                {articleData && (
                                    <div className="post___container">
                                        <div className="profile_top">
                                            <ProfilePicture
                                                image={articleData?.profile}
                                                className="profile_img profile_commnet"
                                            />
                                            <div style={{ marginTop: '5px' }}>
                                                <span className="post_user_name">
                                                    {articleData?.post_author}
                                                </span>
                                                <div className="post_time">
                                                    <span className="time">
                                                        {moment(
                                                            articleData.post_date
                                                        ).fromNow()}
                                                    </span>
                                                    <div className="dot">.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {articleData?.post?.length > 170 ? (
                                                <div>
                                                    <h3 className="post_title">
                                                        {articleData.title}
                                                    </h3>
                                                    <span className="large_length_post">
                                                        {articleData.post}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div>
                                                    {articleData.color ===
                                                    null ? (
                                                        <div>
                                                            <h3 className="post_title">
                                                                {
                                                                    articleData?.title
                                                                }
                                                            </h3>
                                                            <span className="large_length_post">
                                                                {
                                                                    articleData?.post
                                                                }
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span
                                                                className="small_length_post"
                                                                style={{
                                                                    background: `${
                                                                        articleData?.color ||
                                                                        null
                                                                    }`,
                                                                    color: 'white',
                                                                }}
                                                            >
                                                                {
                                                                    articleData?.post
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="comments____container">
                                            {comments &&
                                                comments.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="comments">
                                                                <ProfilePicture
                                                                    image={
                                                                        item.comment_author_profile
                                                                    }
                                                                    className="comment_author_profile_pix"
                                                                />
                                                                <div className="comment___container">
                                                                    <span
                                                                        style={{
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.post_author
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                '14px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.comment
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="post_comment__container">
                                <div className="add_comment_container">
                                    <ProfilePicture
                                        image={user?.profile}
                                        className="user_profile_pix profile_commnet"
                                    />
                                    <Formik
                                        initialValues={{
                                            comment: '',
                                        }}
                                        onSubmit={(values, { resetForm }) => {
                                            PostArticleComment(
                                                values,
                                                articleId
                                            ).then((res) => {
                                                const data = res.data;
                                                if (data.status === 'success') {
                                                    resetForm();
                                                }
                                            });
                                        }}
                                    >
                                        {() => (
                                            <Form>
                                                <div className="comment_input_container">
                                                    <TextInput
                                                        className="comment_input"
                                                        name="comment"
                                                        type="text"
                                                        autoFocus
                                                        placeholder="Write your comment"
                                                    />
                                                    {!postCommentRequest && (
                                                        <button
                                                            type="submit"
                                                            className="send"
                                                        >
                                                            <Send
                                                                style={{
                                                                    fontSize:
                                                                        '30px',
                                                                }}
                                                            />
                                                        </button>
                                                    )}
                                                    {postCommentRequest && (
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    '8px',
                                                            }}
                                                        >
                                                            <Comment
                                                                visible={true}
                                                                height="50"
                                                                width="50"
                                                                ariaLabel="comment-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass="comment-wrapper"
                                                                color="#fff"
                                                                backgroundColor="rgba(121, 144, 225, 1)"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </>
                    )}
                    {requesting && (
                        <div className="loading_container">
                            <RotatingLines
                                strokeColor="rgba(121, 144, 225, 1)"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="60"
                                visible={true}
                            />
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        articleData: state.articles?.articleData.articles,
        comments: state.articles?.articleData?.comments,
        user: state.user.userData,
        requesting: state.articles.GetSingleArticle.requesting,
        postCommentRequest: state.articles.PostArticleComment.requesting,
    };
};

export default connect(mapStateToProps, { PostArticleComment })(
    ArticleCommentModal
);
