import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { TextInput } from '../../Utils/FormLib';
import { Send } from '@material-ui/icons';
import { useEffect } from 'react';
import { useRef } from 'react';
import { PostGifComment } from '../../Auth/Actions/gifActions';
import { Comment } from 'react-loader-spinner';

const GifCommentModal = ({
    gifData,
    user,
    setGifModal,
    comments,
    PostGifComment,
    requesting,
}) => {
    const gifId = gifData.postid;
    const messagesEndRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }, [comments]);
    return (
        <div className="single_modal_container">
            <div className="modal_holder">
                <div className="user_name">
                    <span style={{ marginTop: '5px' }}>
                        {gifData && <h3>{`${gifData.post_author}'s Post`}</h3>}
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
                                <img
                                    src={gifData.profile_pix}
                                    className="profile_img"
                                />
                                <div>
                                    <span className="post_user_name">
                                        {gifData.post_author}
                                    </span>
                                    <div className="post_time">
                                        <span className="time">
                                            {moment(
                                                gifData.post_date
                                            ).fromNow()}
                                        </span>
                                        <div className="dot">.</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img className="gif_post" src={gifData.post} />
                            </div>
                            <div className="comments____container">
                                {comments &&
                                    comments.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="comments">
                                                    <img
                                                        className="comment_author_profile_pix"
                                                        src={
                                                            item.comment_author_profile
                                                        }
                                                        alt=""
                                                    />
                                                    <div className="comment___container">
                                                        <span
                                                            style={{
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {item.post_author}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                        >
                                                            {item.comment}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div
                                    className="comment_bottom"
                                    ref={messagesEndRef}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="post_comment__container">
                    <div className="add_comment_container">
                        <img className="user_profile_pix" src={user.profile} />{' '}
                        <Formik
                            initialValues={{
                                comment: '',
                            }}
                            onSubmit={(values, { resetForm }) => {
                                PostGifComment(values, gifId).then((res) => {
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
                                            placeholder="Add your comment"
                                        />
                                        {!requesting && (
                                            <button
                                                type="submit"
                                                className="send"
                                            >
                                                <Send
                                                    style={{ fontSize: '30px' }}
                                                />
                                            </button>
                                        )}
                                        {requesting && (
                                            <div style={{ marginTop: '8px' }}>
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
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        gifData: state.gifs?.gifData?.gifs,
        comments: state.gifs?.gifData?.comments,
        user: state.user.userData,
        requesting: state.gifs?.PostGifComment.requesting,
    };
};

export default connect(mapStateToProps, { PostGifComment })(GifCommentModal);
