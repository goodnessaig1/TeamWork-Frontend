import React from 'react';
import { ProfilePicture } from '../../Utils/ProfilePicture';

const Comments = ({
    item,
    userData,
    handleArticleComment,
    handleCommentClick,
}) => {
    return (
        <>
            <div className="post__comment__container">
                {item?.post.includes('https://') ? (
                    <div>
                        {item?.number_of_comment > 3 && (
                            <div
                                className="view_more"
                                onClick={() => handleCommentClick(item.postid)}
                            >
                                View More Comments
                            </div>
                        )}
                        {item?.comments &&
                            item?.comments.map((item) => (
                                <div key={item.id}>
                                    <div className="post_comment_container">
                                        <div className="post_comment">
                                            <ProfilePicture
                                                image={
                                                    item?.comment_author_profile
                                                }
                                                className="profile__pix profile_commnet"
                                            />
                                        </div>
                                        <div className="comment_section">
                                            <div className="comment__section">
                                                <span>{`${item?.comment_author.substring(
                                                    0,
                                                    15
                                                )}`}</span>
                                                <div>{item?.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="add_comment__container">
                            <ProfilePicture
                                image={userData?.profile}
                                className="user_profile_pix profile_commnet"
                            />
                            <div
                                onClick={() => handleCommentClick(item.postid)}
                            >
                                Write your comment
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {item?.number_of_comment > 3 && (
                            <div
                                className="view_more"
                                onClick={() =>
                                    handleArticleComment(item.postid)
                                }
                            >
                                View More Comments
                            </div>
                        )}
                        {item?.comments &&
                            item?.comments.map((item) => (
                                <div key={item.id}>
                                    <div className="post_comment_container">
                                        <div className="post_comment">
                                            <ProfilePicture
                                                image={
                                                    item?.comment_author_profile
                                                }
                                                className="profile__pix profile_commnet"
                                            />
                                        </div>
                                        <div className="comment_section">
                                            <div className="comment__section">
                                                <span>{`${item?.comment_author.substring(
                                                    0,
                                                    20
                                                )}`}</span>
                                                <div>{item?.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="add_comment__container">
                            <ProfilePicture
                                image={userData?.profile}
                                className="user_profile_pix profile_commnet"
                            />
                            <div
                                onClick={() =>
                                    handleArticleComment(item.postid)
                                }
                            >
                                Write your comment
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Comments;
