import React, { useState } from 'react';
import Like from '../Assets/like.png';
import isLike from '../Assets/liked.png';
import moment from 'moment';
import commentIcon from '../Assets/comment.png';
import { EmojiEmotionsOutlined } from '@material-ui/icons';
import { getBackgroundColor } from '../../Utils/colors';
import { ColorRing, Oval } from 'react-loader-spinner';
import Unavailiabe from '../../Utils/unavailiable1.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFeedDetails } from '../../Auth/Actions/feedActions';
import { useDispatch } from 'react-redux';

const Feeds = ({
    feeds,
    setData,
    setPostArticle,
    setPostArticleModal,
    offSet,
    setOffSet,
    feedsLength,
    requesting,
}) => {
    // console.log(feeds);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = () => {
        if (feedsLength >= 10) {
            setTimeout(() => {
                setOffSet(offSet + 10);
                const newOffset = offSet + 10;
                dispatch(getFeedDetails(newOffset)).then((res) => {
                    setData(feeds.concat(res.data.data));
                });
            }, 3000);
        } else {
            setHasMore(false);
        }
    };
    const handleUploadClick = (e) => {
        setPostArticle(e);
        setPostArticleModal(true);
    };

    return (
        <div>
            {!requesting && (
                <div className="dash_board_container">
                    <InfiniteScroll
                        dataLength={200}
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
                            <div className="end_message">
                                <div onClick={() => handleUploadClick(true)}>
                                    You Can Share something new
                                    <EmojiEmotionsOutlined />
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
                                                        />
                                                    </div>
                                                    <div className="like_comment_container">
                                                        <div className="like">
                                                            {item.isliked ===
                                                            false ? (
                                                                <img
                                                                    className="like_img"
                                                                    src={Like}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    className="like_img"
                                                                    src={isLike}
                                                                    alt=""
                                                                />
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
                                                            <div className="like">
                                                                {item.isliked ===
                                                                false ? (
                                                                    <img
                                                                        className="like_img"
                                                                        src={
                                                                            Like
                                                                        }
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        className="like_img"
                                                                        src={
                                                                            isLike
                                                                        }
                                                                        alt=""
                                                                    />
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
        </div>
    );
};

export default Feeds;
