import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { TextInput } from '../../Utils/FormLib';
import { Close, Send, ThumbUpAltRounded } from '@material-ui/icons';
import { LikeGif, PostGifComment } from '../../Auth/Actions/gifActions';
import { Comment, RotatingLines } from 'react-loader-spinner';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import commentIcon from '../Assets/comment.png';
import { MdVerified } from 'react-icons/md';

const GifCommentModal = ({
    gifData,
    user,
    setGifModal,
    comments,
    PostGifComment,
    postGifRequest,
    requesting,
}) => {
    const gifId = gifData.postid;
    const dispatch = useDispatch();

    const handleGifLikes = (post_id) => {
        dispatch(LikeGif(post_id));
    };

    return (
        <div className="single_modal_container">
            <div className="modal_holder">
                <div className="top_close_modal">
                    <div className="close_modal_container">
                        <div
                            className="close_modal"
                            onClick={() => setGifModal(false)}
                        >
                            <Close />
                        </div>
                    </div>
                    <hr className="hr_" />
                </div>
                {/* <> */}
                {!requesting && (
                    <>
                        <div className="post___container_holder">
                            {gifData && (
                                <div className="post___container">
                                    <div className="profile_top">
                                        <ProfilePicture
                                            image={gifData?.profile}
                                            className="profile_img profile_commnet "
                                        />
                                        <div className="post_username_container">
                                            <span className="post_user_name">
                                                {gifData?.post_author}
                                                {gifData.isadmin && (
                                                    <MdVerified className="verified" />
                                                )}
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
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                marginTop: '5px',
                                            }}
                                        >
                                            {gifData.title}
                                        </div>
                                        <img
                                            className="gif_post"
                                            src={gifData?.post}
                                        />
                                    </div>
                                    <hr
                                        className="hr__"
                                        style={{
                                            marginTop: '16px',
                                        }}
                                    />
                                    <div className="like_comment_container">
                                        <div
                                            className="like"
                                            onClick={() =>
                                                handleGifLikes(gifData?.postid)
                                            }
                                        >
                                            {gifData?.liked === false ? (
                                                <ThumbUpAltRounded className="like_icon" />
                                            ) : (
                                                <ThumbUpAltRounded className="is_like_icon" />
                                            )}
                                            <span>
                                                {gifData?.number_of_likes}
                                            </span>
                                        </div>
                                        <div className="comment">
                                            <img
                                                src={commentIcon}
                                                className="comment_Icon"
                                                alt=""
                                            />
                                            <span>
                                                {gifData?.number_of_comment}
                                            </span>
                                        </div>
                                    </div>
                                    <hr className="hr__" />
                                    <div className="comments____container">
                                        {comments &&
                                            comments.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="comments">
                                                            <ProfilePicture
                                                                image={
                                                                    item?.comment_author_profile
                                                                }
                                                                className="comment_author_profile_pix"
                                                            />
                                                            <div className="comment___container">
                                                                <span className="comment_user_name">
                                                                    {
                                                                        item?.post_author
                                                                    }
                                                                    {item.isadmin && (
                                                                        <MdVerified className="verified" />
                                                                    )}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontSize:
                                                                            '14px',
                                                                    }}
                                                                >
                                                                    {
                                                                        item?.comment
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
                                        PostGifComment(values, gifId).then(
                                            (res) => {
                                                const data = res.data;
                                                if (data.status === 'success') {
                                                    resetForm();
                                                }
                                            }
                                        );
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
                                                            marginTop: '8px',
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
                {/* </> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        gifData: state.gifs?.gifData?.gifs,
        comments: state.gifs?.gifData?.comments,
        user: state.user.userData,
        requesting: state.gifs?.GetSingleGif?.requesting,
        postGifRequest: state.gifs?.PostGifComment.requesting,
    };
};

export default connect(mapStateToProps, { PostGifComment })(GifCommentModal);
