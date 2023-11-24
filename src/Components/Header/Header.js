import React, { useEffect, useState } from 'react';
import {
    Home,
    AddAPhoto,
    NotificationsNone,
    AccountCircle,
    KeyboardBackspaceRounded,
    Menu,
} from '@material-ui/icons';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import { connect, useDispatch } from 'react-redux';
import { LogoutUser } from '../../Auth/Actions/userActions';
import Search from '../../Components/Assets/Vectorsearch.png';
import PropTypes from 'prop-types';
import SideDrawer from '../Pages/SideDrawer';
import { getNotifications } from '../../Auth/Actions/notificationActions';
import UserSearch from '../UserDashboard/SearchUser';

const Header = ({ LogoutUser, userStatus, notifications }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getNotifications());
    }, []);

    return (
        <div className="header__container">
            <div className="content">
                <div className="left">
                    <div className="left_cont">
                        {!click && (
                            <span>
                                <h2>
                                    S<span>TAFFCONN</span>
                                </h2>
                            </span>
                        )}
                    </div>
                    {userStatus && userStatus ? (
                        <div className="search_bar">
                            <img
                                src={Search}
                                alt=""
                                className="search_bar_img"
                            />
                            <span>
                                <UserSearch />
                                {/* <input
                                    className="search"
                                    type="text"
                                    placeholder="Search...."
                                /> */}
                            </span>
                        </div>
                    ) : null}
                </div>

                {click && (
                    <>
                        <div className="search_input_container">
                            <div onClick={() => setClick(false)}>
                                <KeyboardBackspaceRounded />
                            </div>
                            <div className="search_input">
                                <UserSearch />
                                  <img
                                    src={Search}
                                    alt=""
                                    className="search_bar_img"
                                />
                            </div>
                        </div>
                        <div
                            className="search_overlay"
                            onClick={() => setClick(false)}
                        ></div>
                    </>
                )}
                <div className="center">
                    <div className="center_container">
                        <NavLink
                            to="/dashboard"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <Home className="center_icon active" />
                            <div className="nav_bar_container ">
                                <span className="nav_bar_item">Home</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/upload"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <AddAPhoto className="center_icon" />
                            <div className="nav_bar_container">
                                <span className="nav_bar_item">Upload</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/notifications"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <div className="center_notification">
                                <NotificationsNone className="center_icon" />
                                {notifications.totalUnread > 0 && (
                                    <span className="active_notification">
                                        {notifications.totalUnread}
                                    </span>
                                )}
                            </div>
                            <div className="nav_bar_container active__notifications">
                                <span className="nav_bar_item">
                                    Notification
                                </span>
                                {notifications.totalUnread > 0 && (
                                    <span className="active_notifications">
                                        {notifications.totalUnread}
                                    </span>
                                )}
                            </div>
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <AccountCircle className="center_icon" />
                            <div className="nav_bar_container">
                                <span className="nav_bar_item">Profile</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="middle">
                    {!click && (
                        <img
                            src={Search}
                            alt=""
                            className="search_bar_img"
                            onClick={() => setClick(true)}
                        />
                    )}

                    <div className="right">
                        {userStatus && userStatus.profile !== null ? (
                            <div className="profile_pix">
                                <img
                                    src={userStatus.profile}
                                    alt=""
                                    className="profile_pic"
                                />
                            </div>
                        ) : null}

                        <div className="link_button">
                            {!!userStatus ? (
                                <Link
                                    className="link_btn"
                                    to="/sign_in"
                                    onClick={() => LogoutUser(history)}
                                >
                                    Log Out
                                </Link>
                            ) : (
                                <Link className="link_btn" to="/sign_in">
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="menu_bar">
                        {!open && (
                            <Menu
                                className="menu__bar"
                                onClick={() => setOpen(true)}
                            />
                        )}
                        <SideDrawer open={open} setOpen={setOpen} />
                    </div>
                    {/* )} */}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.userData,
        notifications: state.notifications?.notifications,
    };
};

Header.propTypes = {
    userStatus: PropTypes.object,
    LogoutUser: PropTypes.func,
};

export default connect(mapStateToProps, { LogoutUser })(Header);
