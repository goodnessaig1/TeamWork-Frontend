import React, { useState } from 'react';
import moment from 'moment';
import commentIcon from '../Assets/comment.png';
import {
    ArrowUpwardRounded,
    EmojiEmotionsOutlined,
    ThumbUpAltRounded,
} from '@material-ui/icons';
import { getBackgroundColor } from '../../Utils/colors';
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
    // console.log(feeds);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState(null);
    const [gifModal, setGifModal] = useState(false);
    const [articleModal, setArticleModal] = useState(false);
    const [index, setIndex] = useState(null);
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
    const handleLikes = (post_id, index) => {
        dispatch(LikeArticles(post_id, index));
    };
    const handleGifLikes = (post_id, index) => {
        dispatch(LikeGif(post_id, index));
    };
    const handleClick = (item, user) => {
        setClickedImage(item.post);
        setOpen(true);
        setUser(user);
    };
    const handleCommentClick = (id, index) => {
        dispatch(GetSingleGif(id));
        setGifModal(true);
        setIndex(index);
    };
    const handleArticleComment = (id, index) => {
        dispatch(GetSingleArticle(id, setArticleModal));
        setArticleModal(true);
        setIndex(index);
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
                                                <div className="feed_content">
                                                    <div className="feed_top">
                                                        <ProfilePicture
                                                            image={
                                                                item?.profile
                                                            }
                                                            className="profile__pix"
                                                        />
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    item?.post_author
                                                                }
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {item?.jobrole}
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
                                                    <hr
                                                        style={{
                                                            marginTop: '26px',
                                                        }}
                                                    />
                                                    <div className="like_comment_container">
                                                        <div
                                                            className="like"
                                                            onClick={() =>
                                                                handleGifLikes(
                                                                    item?.postid,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {item?.liked ===
                                                            false ? (
                                                                <ThumbUpAltRounded className="like_icon" />
                                                            ) : (
                                                                <ThumbUpAltRounded className="is_like_icon" />
                                                            )}
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
                                                                        item.postid,
                                                                        index
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
                                                    <hr />
                                                    {/* Comments here */}
                                                    <Comments
                                                        item={item}
                                                        index={index}
                                                        userData={userData}
                                                        handleCommentClick={
                                                            handleCommentClick
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div className="feed_content">
                                                    <div className="feed_top">
                                                        <ProfilePicture
                                                            image={
                                                                item?.profile
                                                            }
                                                            className="profile__pix"
                                                        />
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    item?.post_author
                                                                }
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {item?.jobrole}
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
                                                                <span
                                                                    className="small_length_post"
                                                                    style={{
                                                                        background: `${getBackgroundColor(
                                                                            item
                                                                                ?.post
                                                                                .length
                                                                        )}`,
                                                                        color: 'white',
                                                                    }}
                                                                >
                                                                    {item?.post}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <hr
                                                            style={{
                                                                marginTop:
                                                                    '26px',
                                                            }}
                                                        />
                                                        <div className="like_comment_container">
                                                            <div
                                                                className="like"
                                                                onClick={() =>
                                                                    handleLikes(
                                                                        item.postid,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {item?.liked ===
                                                                    false ? (
                                                                        <ThumbUpAltRounded className="like_icon" />
                                                                    ) : (
                                                                        <ThumbUpAltRounded className="is_like_icon" />
                                                                    )}
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
                                                                            item.postid,
                                                                            index
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
                                                        <hr />
                                                        {/* Comments here */}
                                                        <Comments
                                                            item={item}
                                                            index={index}
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
                        index={index}
                    />
                )}
                {articleModal && (
                    <ArticleCommentModal
                        articleModal={articleModal}
                        setArticleModal={setArticleModal}
                        index={index}
                    />
                )}
            </div>
        </div>
    );
};

export default Feeds;
