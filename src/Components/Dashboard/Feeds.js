import React from 'react';
import Like from '../Assets/like.png';
import Liked from '../Assets/liked.png';
import moment from 'moment';
import commentIcon from '../Assets/comment.png';
import LoadMore from './LoadMore';
import { getBackgroundColor } from '../../Utils/colors';
import { ColorRing } from 'react-loader-spinner';
import Unavailiabe from '../../Utils/unavailiable1.png';

const Feeds = ({
    feeds,
    offSet,
    setOffSet,
    feedsLength,
    setIsLoading,
    isLoading,
}) => {
    return (
        <div>
            {!isLoading && (
                <div className="dash_board_container">
                    {feeds &&
                        feeds.map((item, index) => (
                            <div key={index}>
                                <div className="feed_content">
                                    {item.post.includes('https://') ? (
                                        <div className="feed_content">
                                            <div className="feed_top">
                                                {item?.profile_pix ? (
                                                    <img
                                                        src={item.profile_pix}
                                                        className="profile__pix"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        src={Unavailiabe}
                                                        className="profile__pix"
                                                        alt=""
                                                    />
                                                )}
                                                <div>
                                                    <h4 className="post_author">
                                                        {item.post_author}
                                                    </h4>
                                                    <span className="author_job_role">
                                                        {item.author_jobrole}
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
                                                    {item.isliked === false ? (
                                                        <img
                                                            className="like_img"
                                                            src={Like}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            className="like_img"
                                                            src={Liked}
                                                            alt=""
                                                        />
                                                    )}
                                                    <span>
                                                        {item.number_of_likes}
                                                    </span>
                                                </div>
                                                <div className="comment">
                                                    <img
                                                        src={commentIcon}
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
                                                                {item.comment}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="feed_content">
                                            <div className="feed_top">
                                                {/* user?.profile ? */}
                                                {item?.profile_pix ? (
                                                    <img
                                                        src={item.profile_pix}
                                                        className="profile__pix"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        src={Unavailiabe}
                                                        className="profile__pix"
                                                        alt=""
                                                    />
                                                )}
                                                <div>
                                                    <h4 className="post_author">
                                                        {item.post_author}
                                                    </h4>
                                                    <span className="author_job_role">
                                                        {item.author_jobrole}
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
                                                {item.post.length > 170 ? (
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
                                                                    item.post
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
                                                                src={Like}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                className="like_img"
                                                                src={Liked}
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
                                                            src={commentIcon}
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
                        ))}
                    <div>
                        <LoadMore
                            offSet={offSet}
                            feedsLength={feedsLength}
                            setOffSet={setOffSet}
                            setIsLoading={setIsLoading}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
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
