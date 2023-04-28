import React, { useEffect, useState } from 'react';
import moment from 'moment';
import commentIcon from '../Assets/comment.png';
import {
    ArrowUpwardRounded,
    Close,
    EmojiEmotionsOutlined,
} from '@material-ui/icons';
import { ColorRing, Oval } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMoreFeeds } from '../../Auth/Actions/feedActions';
import { useDispatch } from 'react-redux';
import {
    GetSingleArticle,
    LikeArticles,
} from '../../Auth/Actions/articleActions';
import { GetSingleGif, LikeGif } from '../../Auth/Actions/gifActions';
import ViewGifModal from './ViewGifModal';
import GifCommentModal from './GifCommentModal';
import ArticleCommentModal from './ArticleCommentModal';
import Comments from './Comments';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import UpdateArticle from './UpdateArticle';
import ConfirmModal from './ConfirmModal';
import LikeButton from './Likes';

const Feeds = ({
    feeds,
    userData,
    setPostArticle,
    setPostArticleModal,
    offSet,
    setOffSet,
    feedsLength,
    requesting,
    feedsTotal,
    clickedImage,
    setClickedImage,
    open,
    setOpen,
}) => {
    // console.log(userData);
    const dispatch = useDispatch();
    const [updateArticleModal, setUpdateArticleModal] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState(null);
    const [gifModal, setGifModal] = useState(false);
    const [articleModal, setArticleModal] = useState(false);
    const [activeDiv, setActiveDiv] = useState(null);
    const [postToUpdate, setPostToUpdate] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

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
        if (feedsTotal != feedsLength) {
            setTimeout(() => {
                const newOffset = offSet + 10;
                setOffSet(newOffset);
                dispatch(getMoreFeeds(newOffset));
            }, 1700);
        } else {
            setHasMore(false);
        }
    };

    const handleTopClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const handleUploadClick = (e) => {
        setPostArticle(e);
        setPostArticleModal(true);
    };

    const handleLikes = (post_id) => {
        dispatch(LikeArticles(post_id));
    };

    const handleGifLikes = (post_id) => {
        dispatch(LikeGif(post_id));
    };

    const handleClick = (item, user) => {
        setClickedImage(item.post);
        setOpen(true);
        setUser(user);
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

    const handleUpdateArticle = (item) => {
        setPostToUpdate(item);
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
        <div>
            {!requesting && (
                <div className="dash_board_container">
                    <InfiniteScroll
                        dataLength={feeds?.length}
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
                            <div className="bottom_container">
                                <div className="end_message">
                                    <div
                                        onClick={() => handleUploadClick(true)}
                                    >
                                        You Can Share something new
                                        <EmojiEmotionsOutlined />
                                    </div>
                                </div>
                                <div onClick={handleTopClick}>
                                    <ArrowUpwardRounded className="arrow_up" />
                                </div>
                            </div>
                        }
                    >
                        {feeds &&
                            feeds.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="feed_content">
                                            {item?.post.includes('https://') ? (
                                                <div className="feed__content">
                                                    <div className="feed_top">
                                                        <ProfilePicture
                                                            image={
                                                                item?.profile
                                                            }
                                                            className="profile__pix"
                                                        />
                                                        <div className="feed_top_container">
                                                            <div>
                                                                <h4 className="post_author">
                                                                    {
                                                                        item?.post_author
                                                                    }
                                                                </h4>
                                                                <span className="author_job_role">
                                                                    {
                                                                        item?.jobrole
                                                                    }
                                                                </span>
                                                                <div className="time_container">
                                                                    <span className="time">
                                                                        {moment(
                                                                            item?.post_date
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
                                                                                    item.postid
                                                                                )
                                                                            }
                                                                        >
                                                                            View
                                                                            Post
                                                                        </span>
                                                                        {userData?.userId ==
                                                                            item?.user_id && (
                                                                            <>
                                                                                <span
                                                                                    style={{
                                                                                        color: 'red',
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        handleDeleteGif(
                                                                                            item
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
                                                            {item?.title}
                                                        </div>
                                                        <img
                                                            src={item?.post}
                                                            className="post"
                                                            alt=""
                                                            onClick={() =>
                                                                handleClick(
                                                                    item,
                                                                    item?.profile
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <hr className="hr_" />
                                                    <div className="like_comment_container">
                                                        <div className="like">
                                                            <div
                                                                onClick={() =>
                                                                    handleGifLikes(
                                                                        item?.postid
                                                                    )
                                                                }
                                                            >
                                                                <LikeButton
                                                                    isLiked={
                                                                        item?.liked
                                                                    }
                                                                />
                                                            </div>
                                                            <span>
                                                                {
                                                                    item?.number_of_likes
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
                                                                    handleCommentClick(
                                                                        item.postid
                                                                    )
                                                                }
                                                            />
                                                            <span>
                                                                {
                                                                    item?.number_of_comment
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <hr className="hr__" />
                                                    {/* Comments here */}
                                                    <Comments
                                                        item={item}
                                                        userData={userData}
                                                        handleCommentClick={
                                                            handleCommentClick
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div className="feed__content">
                                                    <div className="feed_top">
                                                        <ProfilePicture
                                                            image={
                                                                item?.profile
                                                            }
                                                            className="profile__pix"
                                                        />
                                                        <div className="feed_top_container">
                                                            <div>
                                                                <h4 className="post_author">
                                                                    {
                                                                        item?.post_author
                                                                    }
                                                                </h4>
                                                                <span className="author_job_role">
                                                                    {
                                                                        item?.jobrole
                                                                    }
                                                                </span>
                                                                <div className="time_container">
                                                                    <span className="time">
                                                                        {moment(
                                                                            item?.post_date
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
                                                                                    item.postid
                                                                                )
                                                                            }
                                                                        >
                                                                            View
                                                                            Post
                                                                        </span>
                                                                        {userData?.userId ==
                                                                            item?.user_id && (
                                                                            <>
                                                                                <span
                                                                                    onClick={() =>
                                                                                        handleUpdateArticle(
                                                                                            item
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
                                                                                            item
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
                                                        {item?.post?.length >
                                                        170 ? (
                                                            <div>
                                                                <h3 className="post_title">
                                                                    {
                                                                        item?.title
                                                                    }
                                                                </h3>
                                                                <span className="large_length_post">
                                                                    {item?.post}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {item.color ===
                                                                null ? (
                                                                    <div>
                                                                        <h3 className="post_title">
                                                                            {
                                                                                item?.title
                                                                            }
                                                                        </h3>
                                                                        <span className="large_length_post">
                                                                            {
                                                                                item?.post
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <span
                                                                            className="small_length_post"
                                                                            style={{
                                                                                background: `${
                                                                                    item?.color ||
                                                                                    null
                                                                                }`,
                                                                                color: 'white',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.post
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
                                                                            item.postid
                                                                        )
                                                                    }
                                                                >
                                                                    <LikeButton
                                                                        isLiked={
                                                                            item?.liked
                                                                        }
                                                                    />
                                                                </div>
                                                                <span>
                                                                    {
                                                                        item?.number_of_likes
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
                                                                            item.postid
                                                                        )
                                                                    }
                                                                />
                                                                <span>
                                                                    {
                                                                        item?.number_of_comment
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="hr__" />
                                                        {/* Comments here */}
                                                        <Comments
                                                            item={item}
                                                            userData={userData}
                                                            handleArticleComment={
                                                                handleArticleComment
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </InfiniteScroll>
                </div>
            )}
            {offSet === 0 && requesting && (
                <div className="loading_container">
                    <ColorRing
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        colors={[
                            '#e15b64',
                            '#f47e60',
                            'rgba(121, 144, 225, 1)',
                            '#abbd81',
                            '#849b87',
                        ]}
                    />
                </div>
            )}
            <div>
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
                {gifModal && (
                    <GifCommentModal
                        gifModal={gifModal}
                        setGifModal={setGifModal}
                    />
                )}
                {articleModal && (
                    <ArticleCommentModal
                        articleModal={articleModal}
                        setArticleModal={setArticleModal}
                    />
                )}
                {updateArticleModal && (
                    <UpdateArticle
                        updateArticleModal={updateArticleModal}
                        setUpdateArticleModal={setUpdateArticleModal}
                        postToUpdate={postToUpdate}
                        setPostToUpdate={setPostToUpdate}
                    />
                )}
                {activeDiv !== null && (
                    <div className="bottom_back">
                        <div
                            onClick={() => setActiveDiv(null)}
                            className="backdroup"
                        ></div>
                    </div>
                )}
                {confirmModal && (
                    <ConfirmModal
                        postToDelete={postToDelete}
                        setPostToDelete={setPostToDelete}
                        setConfirmModal={setConfirmModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Feeds;
