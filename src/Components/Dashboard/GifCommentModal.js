import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { TextInput } from '../../Utils/FormLib';
import { Send } from '@material-ui/icons';
import { PostGifComment } from '../../Auth/Actions/gifActions';
import { Comment, RotatingLines } from 'react-loader-spinner';
import { ProfilePicture } from '../../Utils/ProfilePicture';

const GifCommentModal = ({
    gifData,
    user,
    setGifModal,
    comments,
    PostGifComment,
    postGifRequest,
    requesting,
    index,
}) => {
    const gifId = gifData.postid;
    return (
        <div className="single_modal_container">
            <div className="modal_holder">
                <>
                    {!requesting && (
                        <>
                            <div className="user_name">
                                <span style={{ marginTop: '5px' }}>
                                    {gifData && (
                                        <h3>{`${gifData.post_author}'s Post`}</h3>
                                    )}
                                </span>
                                <div
                                    className="close_modal"
                                    onClick={() => setGifModal(false)}
                                >
                                    X
                                </div>
                            </div>
                            <hr style={{ marginTop: '5px' }} />
                            <div>
                                {gifData && (
                                    <div className="post___container">
                                        <div className="profile_top">
                                            <ProfilePicture
                                                image={gifData?.profile}
                                                className="profile_img"
                                            />
                                            <div>
                                                <span className="post_user_name">
                                                    {gifData?.post_author}
                                                </span>
                                                <div className="post_time">
                                                    <span className="time">
                                                        {moment(
                                                            gifData?.post_date
                                                        ).fromNow()}
                                                    </span>
                                                    <div className="dot">.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px' }}>
                                                {gifData.title}
                                            </div>
                                            <img
                                                className="gif_post"
                                                src={gifData?.post}
                                            />
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
                                        className="user_profile_pix"
                                    />
                                    <Formik
                                        initialValues={{
                                            comment: '',
                                        }}
                                        onSubmit={(values, { resetForm }) => {
                                            PostGifComment(
                                                values,
                                                gifId,
                                                index
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
                                                    {!postGifRequest && (
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
                                                    {postGifRequest && (
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
        gifData: state.gifs?.gifData?.gifs,
        comments: state.gifs?.gifData?.comments,
        user: state.user.userData,
        requesting: state.gifs?.GetSingleGif.requesting,
        postGifRequest: state.gifs?.PostGifComment.requesting,
    };
};

export default connect(mapStateToProps, { PostGifComment })(GifCommentModal);
