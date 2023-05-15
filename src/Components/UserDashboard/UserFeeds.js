import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import Comments from '../Dashboard/Comments';
import LikeButton from '../Dashboard/Likes';
import commentIcon from '../Assets/comment.png';
import moment from 'moment';

import {
    GetSingleArticle,
    LikeUserArticle,
} from '../../Auth/Actions/articleActions';
import { GetSingleGif, LikeUserGif } from '../../Auth/Actions/gifActions';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Oval } from 'react-loader-spinner';
import { getMoreUserData } from '../../Auth/Actions/userActions';
import ViewGifModal from '../Dashboard/ViewGifModal';
const UserFeeds = ({
    id,
    offSet,
    setOffSet,
    setUpdateArticleModal,
    setActiveDiv,
    setPostToUpdate,
    setPostToDelete,
    setConfirmModal,
    gifModal,
    userPosts,
    feedsTotal,
    userData,
    activeDiv,
    setGifModal,
    setArticleModal,
    articleModal,
}) => {
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    let userTotalPost = userPosts?.length;
    const [open, setOpen] = useState(false);
    const [clickedImage, setClickedImage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const body = document.querySelector('body');

        if (gifModal || articleModal) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }

        return () => {
            body.style.overflow = 'auto';
        };
    }, [gifModal || articleModal]);
    const fetchMoreData = () => {
        if (feedsTotal != userTotalPost) {
            setTimeout(() => {
                const newOffset = offSet + 10;
                setOffSet(newOffset);
                dispatch(getMoreUserData(id, newOffset));
            }, 1700);
        } else {
            setHasMore(false);
        }
    };

    const handleLikes = (post_id) => {
        dispatch(LikeUserArticle(post_id));
    };

    const handleGifLikes = (post_id) => {
        dispatch(LikeUserGif(post_id));
    };

    const handleClick = (post) => {
        setClickedImage(post?.post);
        setUser(post?.profile);
        setOpen(true);
    };

    const handleCommentClick = (id) => {
        dispatch(GetSingleGif(id));
        setGifModal(true);
        setActiveDiv(null);
    };

    const handleArticleComment = (id) => {
        dispatch(GetSingleArticle(id));
        setArticleModal(true);
        setActiveDiv(null);
    };

    const handleUpdateArticle = (post) => {
        setPostToUpdate(post);
        setUpdateArticleModal(true);
        setActiveDiv(null);
    };

    const handleDeleteArticle = (item) => {
        setPostToDelete(item);
        setConfirmModal(true);
        setActiveDiv(null);
    };

    const handleDeleteGif = (item) => {
        setPostToDelete(item);
        setConfirmModal(true);
        setActiveDiv(null);
    };

    const handleActiveModal = () => {
        setActiveDiv(null);
    };
    return (
        <div className="user_post_container">
            <div className="user_posts">
                {userTotalPost > 0 ? (
                    <InfiniteScroll
                        dataLength={userPosts?.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <div className="loading_more">
                                <Oval
                                    height={40}
                                    width={40}
                                    color="rgba(121, 144, 225, 1)"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="rgba(121, 144, 225, 1)"
                                    strokeWidth={4}
                                    strokeWidthSecondary={2}
                                />
                            </div>
                        }
                        endMessage={
                            <div className="profile_bottom no_post">
                                No more post
                            </div>
                        }
                    >
                        {userPosts &&
                            userPosts.map((post, index) => {
                                return (
                                    <div key={index}>
                                        {post.post.includes('https://') ? (
                                            <div className="single_post">
                                                <div className="post_top">
                                                    <ProfilePicture
                                                        image={post?.profile}
                                                        className="profile__pix pix"
                                                    />
                                                    <div className="post_top_container">
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    post?.post_author
                                                                }
                                                                {post?.isadmin && (
                                                                    <MdVerified className="verified" />
                                                                )}
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {post?.jobrole}
                                                            </span>
                                                            <div className="time_container">
                                                                <span className="time">
                                                                    {moment(
                                                                        post?.post_date
                                                                    ).fromNow()}
                                                                </span>
                                                                <div className="dot">
                                                                    .
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*  EDIT POST */}
                                                        <div className="dropdown">
                                                            <div
                                                                className="dropbtn"
                                                                onClick={() =>
                                                                    setActiveDiv(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                ...
                                                            </div>
                                                            {activeDiv ===
                                                                index && (
                                                                <div className="dropdown_content">
                                                                    <div className="close_dropdown">
                                                                        <span
                                                                            onClick={
                                                                                handleActiveModal
                                                                            }
                                                                        >
                                                                            <Close />
                                                                        </span>
                                                                    </div>
                                                                    <span
                                                                        onClick={() =>
                                                                            handleCommentClick(
                                                                                post?.postid
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                        Post
                                                                    </span>
                                                                    {userData?.userId ==
                                                                        post?.user_id && (
                                                                        <>
                                                                            <span
                                                                                style={{
                                                                                    color: 'red',
                                                                                }}
                                                                                onClick={() =>
                                                                                    handleDeleteGif(
                                                                                        post
                                                                                    )
                                                                                }
                                                                            >
                                                                                Delete
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post_container">
                                                    <div className="gif_post_title">
                                                        {post?.title}
                                                    </div>
                                                    <img
                                                        src={post?.post}
                                                        className="post"
                                                        alt=""
                                                        onClick={() =>
                                                            handleClick(post)
                                                        }
                                                    />
                                                </div>
                                                <hr className="hr_" />
                                                <div className="like_comment_container">
                                                    <div className="like">
                                                        <div
                                                            onClick={() =>
                                                                handleGifLikes(
                                                                    post?.postid
                                                                )
                                                            }
                                                        >
                                                            <LikeButton
                                                                isLiked={
                                                                    post?.liked
                                                                }
                                                            />
                                                        </div>
                                                        <span>
                                                            {
                                                                post?.number_of_likes
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="comment">
                                                        <img
                                                            src={commentIcon}
                                                            className="comment_Icon"
                                                            alt=""
                                                            onClick={() =>
                                                                handleCommentClick(
                                                                    post?.postid
                                                                )
                                                            }
                                                        />
                                                        <span>
                                                            {
                                                                post?.number_of_comment
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr className="hr__" />
                                                {/* Comments here */}
                                                <Comments
                                                    item={post}
                                                    userData={userData}
                                                    handleCommentClick={
                                                        handleCommentClick
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="single_post">
                                                <div className="post_top">
                                                    <ProfilePicture
                                                        image={post?.profile}
                                                        className="profile__pix pix"
                                                    />
                                                    <div className="post_top_container">
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    post?.post_author
                                                                }
                                                                {post?.isadmin && (
                                                                    <MdVerified className="verified" />
                                                                )}
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {post?.jobrole}
                                                            </span>
                                                            <div className="time_container">
                                                                <span className="time">
                                                                    {moment(
                                                                        post?.post_date
                                                                    ).fromNow()}
                                                                </span>
                                                                <div className="dot">
                                                                    .
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*  EDIT POST */}
                                                        <div className="dropdown">
                                                            <div
                                                                className="dropbtn"
                                                                onClick={() =>
                                                                    setActiveDiv(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                ...
                                                            </div>
                                                            {activeDiv ===
                                                                index && (
                                                                <div className="dropdown_content">
                                                                    <div className="close_dropdown">
                                                                        <span
                                                                            onClick={
                                                                                handleActiveModal
                                                                            }
                                                                        >
                                                                            <Close />
                                                                        </span>
                                                                    </div>
                                                                    <span
                                                                        onClick={() =>
                                                                            handleArticleComment(
                                                                                post?.postid
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                        Post
                                                                    </span>
                                                                    {userData?.userId ==
                                                                        post?.user_id && (
                                                                        <>
                                                                            <span
                                                                                onClick={() =>
                                                                                    handleUpdateArticle(
                                                                                        post
                                                                                    )
                                                                                }
                                                                            >
                                                                                Edit
                                                                                post
                                                                            </span>
                                                                            <span
                                                                                style={{
                                                                                    color: 'red',
                                                                                }}
                                                                                onClick={() =>
                                                                                    handleDeleteArticle(
                                                                                        post
                                                                                    )
                                                                                }
                                                                            >
                                                                                Delete
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post_container">
                                                    {post?.post?.length >
                                                    170 ? (
                                                        <div>
                                                            <h3 className="post_title">
                                                                {post?.title}
                                                            </h3>
                                                            <span className="large_length_post">
                                                                {post?.post}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {post?.color ===
                                                            null ? (
                                                                <div>
                                                                    <h3 className="post_title">
                                                                        {
                                                                            post?.title
                                                                        }
                                                                    </h3>
                                                                    <span className="large_length_post">
                                                                        {
                                                                            post?.post
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <span
                                                                        className="small_length_post"
                                                                        style={{
                                                                            background: `${
                                                                                post?.color ||
                                                                                null
                                                                            }`,
                                                                            color: 'white',
                                                                        }}
                                                                    >
                                                                        {
                                                                            post?.post
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <hr className="hr_" />
                                                    <div className="like_comment_container">
                                                        <div className="like">
                                                            <div
                                                                onClick={() =>
                                                                    handleLikes(
                                                                        post?.postid
                                                                    )
                                                                }
                                                            >
                                                                <LikeButton
                                                                    isLiked={
                                                                        post?.liked
                                                                    }
                                                                />
                                                            </div>
                                                            <span>
                                                                {
                                                                    post?.number_of_likes
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="comment">
                                                            <img
                                                                src={
                                                                    commentIcon
                                                                }
                                                                className="comment_Icon"
                                                                alt=""
                                                                onClick={() =>
                                                                    handleArticleComment(
                                                                        post?.postid
                                                                    )
                                                                }
                                                            />
                                                            <span>
                                                                {
                                                                    post?.number_of_comment
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <hr className="hr__" />
                                                    {/* Comments here */}
                                                    <Comments
                                                        item={post}
                                                        userData={userData}
                                                        handleArticleComment={
                                                            handleArticleComment
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </InfiniteScroll>
                ) : (
                    <div className="no_post"> No posts available</div>
                )}
            </div>
            {open && (
                <ViewGifModal
                    open={open}
                    setOpen={setOpen}
                    clickedImage={clickedImage}
                    setClickedImage={setClickedImage}
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    );
};

export default UserFeeds;
