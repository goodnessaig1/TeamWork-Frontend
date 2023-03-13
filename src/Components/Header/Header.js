import React, { useState } from 'react';
import {
    Home,
    AddAPhoto,
    NotificationsNone,
    AccountCircle,
    KeyboardBackspaceRounded,
    Menu,
    HomeOutlined,
    AddPhotoAlternateOutlined,
    AddAPhotoOutlined,
    NotificationsOutlined,
    AccountCircleOutlined,
} from '@material-ui/icons';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { LogoutUser } from '../../Auth/Actions/userActions';
import Search from '../../Components/Assets/Vectorsearch.png';
import PropTypes from 'prop-types';
import SideDrawer from '../Pages/SideDrawer';

const Header = ({ LogoutUser, userStatus }) => {
    const history = useHistory();
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

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
                </div>
                {click && (
                    <div className="search_input_container">
                        <div onClick={() => setClick(false)}>
                            <KeyboardBackspaceRounded />
                        </div>
                        <div className="search_input">
                            <input type="text" placeholder="Search" />
                            <img
                                src={Search}
                                alt=""
                                className="search_bar_img"
                            />
                        </div>
                    </div>
                )}
                {userStatus && userStatus ? (
                    <div className="search_bar">
                        <img src={Search} alt="" className="search_bar_img" />
                        <span>
                            <input
                                className="search"
                                type="text"
                                placeholder="Search...."
                            />
                        </span>
                    </div>
                ) : null}
                <div className="center">
                    <div className="center_container">
                        <NavLink
                            to="/dashboard"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <Home className="center_icon active" />
                            <div className="nav_bar_container ">
                                <span>Home</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/upload"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <AddAPhoto className="center_icon" />
                            <div className="nav_bar_container">
                                <span>Upload</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/notifications"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <NotificationsNone className="center_icon" />
                            <div className="nav_bar_container">
                                <span>Notification</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className="nav_bar"
                            activeClassName="active_link"
                        >
                            <AccountCircle className="center_icon" />
                            <div className="nav_bar_container">
                                <span>Profile</span>
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

                    <div className="middle_container">
                        {userStatus && userStatus.profile !== null ? (
                            <div className="profile_pix">
                                <img
                                    src={userStatus.profile}
                                    alt=""
                                    className="profile_pic"
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="right">
                    <div className="right_container">
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
                    {/* {!click && ( */}
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
    };
};

Header.propTypes = {
    userStatus: PropTypes.object,
    LogoutUser: PropTypes.func,
};

export default connect(mapStateToProps, { LogoutUser })(Header);
