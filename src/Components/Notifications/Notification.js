import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    getNotifications,
    ReadArticleNotification,
    ReadGifNotification,
} from '../../Auth/Actions/notificationActions';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import PageLayout from '../Pages/PageLayout';
import './Notifications.css';
import moment from 'moment';
import { ColorRing } from 'react-loader-spinner';
import { GetSingleArticle } from '../../Auth/Actions/articleActions';
import { GetSingleGif } from '../../Auth/Actions/gifActions';
import ArticleCommentModal from '../Dashboard/ArticleCommentModal';
import GifCommentModal from '../Dashboard/GifCommentModal';
import { NotificationsActiveOutlined } from '@material-ui/icons';

const Notification = ({ notifications, requesting, totalNotifications }) => {
    const dispatch = useDispatch();
    const [showArticleModal, setShowArticleModal] = useState(false);
    const [showGifModal, setShowGifModal] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        dispatch(getNotifications());
    }, []);

    const handleArticleOpen = (item) => {
        dispatch(ReadArticleNotification(item?.id));
        dispatch(GetSingleArticle(item?.postid));
        setShowArticleModal(true);
    };

    const handleGifOpen = (item) => {
        dispatch(ReadGifNotification(item?.id));
        dispatch(GetSingleGif(item?.postid));
        setShowGifModal(true);
    };

    const handReadArticle = (item) => {
        dispatch(GetSingleArticle(item?.postid));
        setShowArticleModal(true);
    };
    const handReadGif = (item) => {
        dispatch(GetSingleGif(item?.postid));
        setShowGifModal(true);
    };

    return (
        <PageLayout>
            <div className="notifications_container">
                <div className="notifications_header">
                    <h3>Notifications</h3>
                </div>
                {!requesting && (
                    <>
                        {totalNotifications > 0 ? (
                            <div>
                                <div className="new_notification_container">
                                    <h3>New</h3>
                                    {notifications &&
                                        notifications.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item?.notification_read ===
                                                    false ? (
                                                        <>
                                                            {item?.post.includes(
                                                                'https://'
                                                            ) ? (
                                                                <div
                                                                    className="new_notifications"
                                                                    onClick={() =>
                                                                        handleGifOpen(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <ProfilePicture
                                                                        image={
                                                                            item?.author_pix
                                                                        }
                                                                        className="profile____image"
                                                                    />
                                                                    <div className="notification_message">
                                                                        <div className="notification">
                                                                            <span className="author_user_name">
                                                                                {
                                                                                    item?.notifications_author
                                                                                }
                                                                            </span>{' '}
                                                                            <span>
                                                                                {
                                                                                    item?.message
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="date">
                                                                            {moment(
                                                                                item?.date
                                                                            ).fromNow()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="new_notifications"
                                                                    onClick={() =>
                                                                        handleArticleOpen(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <ProfilePicture
                                                                        image={
                                                                            item?.author_pix
                                                                        }
                                                                        className="profile____image"
                                                                    />
                                                                    <div className="notification_message">
                                                                        <div className="notification">
                                                                            <span className="author_user_name">
                                                                                {
                                                                                    item?.notifications_author
                                                                                }
                                                                            </span>{' '}
                                                                            <span>
                                                                                {
                                                                                    item?.message
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="date">
                                                                            {moment(
                                                                                item?.date
                                                                            ).fromNow()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="old_notification_container">
                                    <h3>Earlier</h3>
                                    {notifications &&
                                        notifications.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item?.notification_read ===
                                                    true ? (
                                                        <>
                                                            {item?.post.includes(
                                                                'https://'
                                                            ) ? (
                                                                <div
                                                                    className="old_notifications"
                                                                    onClick={() =>
                                                                        handReadGif(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <ProfilePicture
                                                                        image={
                                                                            item?.author_pix
                                                                        }
                                                                        className="profile____image"
                                                                    />
                                                                    <div className="notification_message">
                                                                        <div className="notification">
                                                                            <span className="author_user_name">
                                                                                {
                                                                                    item?.notifications_author
                                                                                }
                                                                            </span>{' '}
                                                                            <span>
                                                                                {
                                                                                    item?.message
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="date">
                                                                            {moment(
                                                                                item?.date
                                                                            ).fromNow()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="old_notifications"
                                                                    onClick={() =>
                                                                        handReadArticle(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <ProfilePicture
                                                                        image={
                                                                            item?.author_pix
                                                                        }
                                                                        className="profile____image"
                                                                    />
                                                                    <div className="notification_message">
                                                                        <div className="notification">
                                                                            <span className="author_user_name">
                                                                                {
                                                                                    item?.notifications_author
                                                                                }
                                                                            </span>{' '}
                                                                            <span>
                                                                                {
                                                                                    item?.message
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="date">
                                                                            {moment(
                                                                                item?.date
                                                                            ).fromNow()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        ) : (
                            <div className="no_notifications">
                                <span>No New notifications</span>
                                <NotificationsActiveOutlined className="notification_icon" />
                            </div>
                        )}
                    </>
                )}
                <>
                    {requesting && (
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
                </>
                {showArticleModal && (
                    <ArticleCommentModal
                        articleModal={showArticleModal}
                        setArticleModal={setShowArticleModal}
                    />
                )}
                {showGifModal && (
                    <GifCommentModal
                        gifModal={showGifModal}
                        setGifModal={setShowGifModal}
                    />
                )}
            </div>
        </PageLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications?.notifications?.notifications,
        totalNotifications: state.notifications.notifications.total,
        requesting: state.notifications?.getNotifications.requesting,
    };
};

export default connect(mapStateToProps)(Notification);
