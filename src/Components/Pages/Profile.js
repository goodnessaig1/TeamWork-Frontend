import React from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import { Link } from 'react-router-dom';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import { MdVerified } from 'react-icons/md';

const Profile = ({ userDetail }) => {
    return (
        <div className="profile_page">
            <div className="profile_container">
                <div className="cover_bg"></div>
                <div className="profile_bg">
                    <ProfilePicture
                        image={userDetail?.profile}
                        className="profile_photo"
                    />
                </div>
                {userDetail && userDetail ? (
                    <div>
                        <div className="user_name">
                            <span>
                                {userDetail.firstName.length +
                                    userDetail.lastName.length <
                                14 ? (
                                    <h3 className="userName">
                                        {`${userDetail.firstName} ${userDetail.lastName}`}
                                        {userDetail.isAdmin && (
                                            <MdVerified className="verified" />
                                        )}
                                    </h3>
                                ) : (
                                    <h3 className="userName">
                                        {`${userDetail.firstName.substring(
                                            0,
                                            10
                                        )}  . ${userDetail.lastName.substring(
                                            0,
                                            1
                                        )}`}
                                        {userDetail.isAdmin && (
                                            <MdVerified className="verified" />
                                        )}
                                    </h3>
                                )}
                            </span>
                        </div>
                        <div className="profile_others">
                            <div>{userDetail.jobRole}</div>
                            <div className="joined_at">
                                <span>Joined</span>
                                <span>
                                    {userDetail.createdAt.length > 4
                                        ? `${userDetail.createdAt.substring(
                                              0,
                                              4
                                          )}`
                                        : userDetail.createdAt}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="side_bar_btn">
                    <Link className="profile_button" to="/profile">
                        <div className="profile__btn">View Profile</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userDetail: state.user.userData,
        Failed: state.user.failed,
    };
};

export default connect(mapStateToProps)(Profile);
