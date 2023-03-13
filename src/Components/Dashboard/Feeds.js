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
import Unavailiabe from '../../Utils/unavailiable1.png';
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
const Feeds = ({
    feeds,
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
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState(null);
    const [gifModal, setGifModal] = useState(false);
    const [articleModal, setArticleModal] = useState(false);
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
    const handleCommentClick = (id) => {
        dispatch(GetSingleGif(id, setGifModal));
        setGifModal(true);
    };
    const handleArticleComment = (id) => {
        dispatch(GetSingleArticle(id, setArticleModal));
        setArticleModal(true);
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
                                            {item.post.includes('https://') ? (
                                                <div className="feed_content">
                                                    <div className="feed_top">
                                                        {item?.profile_pix ? (
                                                            <img
                                                                src={
                                                                    item.profile_pix
                                                                }
                                                                className="profile__pix"
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                src={
                                                                    Unavailiabe
                                                                }
                                                                className="profile__pix"
                                                                alt=""
                                                            />
                                                        )}
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    item.post_author
                                                                }
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {
                                                                    item.author_jobrole
                                                                }
                                                            </span>
                                                            <div className="time_container">
                                                                <span className="time">
                                                                    {moment(
                                                                        item.post_date
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
                                                            {item.title}
                                                        </div>
                                                        <img
                                                            src={item.post}
                                                            className="post"
                                                            alt=""
                                                            onClick={() =>
                                                                handleClick(
                                                                    item,
                                                                    item.profile_pix
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="like_comment_container">
                                                        <div
                                                            className="like"
                                                            onClick={() =>
                                                                handleGifLikes(
                                                                    item.postid,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {item.isliked ===
                                                            false ? (
                                                                <ThumbUpAltRounded className="like_icon" />
                                                            ) : (
                                                                <ThumbUpAltRounded className="is_like_icon" />
                                                            )}
                                                            <span>
                                                                {
                                                                    item.number_of_likes
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
                                                                    item.number_of_commennt
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {item?.comment ? (
                                                        <div className="post_comment_container">
                                                            <div className="post_comment">
                                                                {item.comment_author_profile !==
                                                                null ? (
                                                                    <img
                                                                        src={
                                                                            item.comment_author_profile
                                                                        }
                                                                        className="profile__pix profile_commnet"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            Unavailiabe
                                                                        }
                                                                        className="profile__pix"
                                                                        alt=""
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="comment_section">
                                                                <div className="comment__section">
                                                                    <span>{`${
                                                                        item.comment_author
                                                                    }  ${item.comment_author_last_name.substring(
                                                                        0,
                                                                        10
                                                                    )}`}</span>
                                                                    <div>
                                                                        {
                                                                            item.comment
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ) : (
                                                <div className="feed_content">
                                                    <div className="feed_top">
                                                        {item?.profile_pix ? (
                                                            <img
                                                                src={
                                                                    item.profile_pix
                                                                }
                                                                className="profile__pix"
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                src={
                                                                    Unavailiabe
                                                                }
                                                                className="profile__pix"
                                                                alt=""
                                                            />
                                                        )}
                                                        <div>
                                                            <h4 className="post_author">
                                                                {
                                                                    item.post_author
                                                                }
                                                            </h4>
                                                            <span className="author_job_role">
                                                                {
                                                                    item.author_jobrole
                                                                }
                                                            </span>
                                                            <div className="time_container">
                                                                <span className="time">
                                                                    {moment(
                                                                        item.post_date
                                                                    ).fromNow()}
                                                                </span>
                                                                <div className="dot">
                                                                    .
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="post_container">
                                                        {item.post.length >
                                                        170 ? (
                                                            <div>
                                                                <h3 className="post_title">
                                                                    {item.title}
                                                                </h3>
                                                                <span className="large_length_post">
                                                                    {item.post}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span
                                                                    className="small_length_post"
                                                                    style={{
                                                                        background: `${getBackgroundColor(
                                                                            item
                                                                                .post
                                                                                .length
                                                                        )}`,
                                                                        color: 'white',
                                                                    }}
                                                                >
                                                                    {item.post}
                                                                </span>
                                                            </div>
                                                        )}
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
                                                                    {item.isliked ===
                                                                    false ? (
                                                                        <ThumbUpAltRounded className="like_icon" />
                                                                    ) : (
                                                                        <ThumbUpAltRounded className="is_like_icon" />
                                                                    )}
                                                                </div>
                                                                <span>
                                                                    {
                                                                        item.number_of_likes
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
                                                                        item.number_of_commennt
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {item?.comment ? (
                                                            <div className="post_comment_container">
                                                                <div className="post_comment">
                                                                    {item.comment_author_profile !==
                                                                    null ? (
                                                                        <img
                                                                            src={
                                                                                item.comment_author_profile
                                                                            }
                                                                            className="profile__pix profile_commnet"
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                Unavailiabe
                                                                            }
                                                                            className="profile__pix"
                                                                            alt=""
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="comment_section">
                                                                    <div className="comment__section">
                                                                        <span>{`${
                                                                            item.comment_author
                                                                        }  ${item.comment_author_last_name.substring(
                                                                            0,
                                                                            8
                                                                        )}`}</span>
                                                                        <div>
                                                                            {
                                                                                item.comment
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
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
            </div>
        </div>
    );
};

export default Feeds;
