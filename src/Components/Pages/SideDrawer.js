import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
    Menu,
    AddAPhotoOutlined,
    ExitToAppRounded,
    AccountCircleOutlined,
    SupervisorAccountOutlined,
    CreateNewFolderOutlined,
    HomeOutlined,
    NotificationsOutlined,
    LocalGasStationOutlined,
    VerifiedUserOutlined,
    AddOutlined,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { LogoutUser } from '../../Auth/Actions/userActions';

const SideDrawer = ({ LogoutUser, userStatus, open, setOpen }) => {
    const history = useHistory();

    return (
        <>
            {open && (
                <div className="draw_bar_container">
                    <div
                        onClick={() => setOpen(false)}
                        className="backdroup"
                    ></div>
                    <div className="side_bar_menu">
                        <div
                            className="close_draw_bar"
                            onClick={() => setOpen(false)}
                        >
                            <span>X</span>
                        </div>
                        <div
                            className="side_bar_items"
                            onClick={() => setOpen(false)}
                        >
                            <Link to="/dashboard" className="side_bar_link">
                                <div className="side_bar_item">
                                    <HomeOutlined className="draw_bar_icon" />
                                    <span>Home</span>
                                </div>
                            </Link>
                            <Link to="/upload" className="side_bar_link">
                                <div className="side_bar_item">
                                    <AddAPhotoOutlined className="draw_bar_icon" />
                                    <span>Upload</span>
                                </div>
                            </Link>
                            <Link to="/notifications" className="side_bar_link">
                                <div className="side_bar_item">
                                    <NotificationsOutlined className="draw_bar_icon" />
                                    <span>Notifications</span>
                                </div>
                            </Link>
                            <Link to="/profile" className="side_bar_link">
                                <div className="side_bar_item">
                                    <AccountCircleOutlined className="draw_bar_icon" />
                                    <span>Profile</span>
                                </div>
                            </Link>
                            {userStatus && userStatus.isAdmin ? (
                                <div>
                                    {/* <Link className="side_bar_link"> */}
                                    <div className="side_bar_item">
                                        <SupervisorAccountOutlined className="draw_bar_icon" />
                                        <span>Admin</span>
                                    </div>
                                    {/* </Link> */}
                                    <Link
                                        to="/category"
                                        className="side_bar_link"
                                    >
                                        <div className="side_bar_item">
                                            <AddOutlined className="draw_bar_icon" />
                                            <span>Add Category</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/create_admin"
                                        className="side_bar_link"
                                    >
                                        <div className="side_bar_item">
                                            <CreateNewFolderOutlined className="draw_bar_icon" />
                                            <span>Create Admin</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/manage_users"
                                        className="side_bar_link"
                                    >
                                        <div className="side_bar_item">
                                            <VerifiedUserOutlined className="draw_bar_icon" />
                                            <span>Manage Users</span>
                                        </div>
                                    </Link>
                                </div>
                            ) : null}
                            {!!userStatus ? (
                                <div onClick={() => LogoutUser(history)}>
                                    <Link
                                        to="/sign_in"
                                        className="side_bar_link"
                                    >
                                        <div className="side_bar_item">
                                            <ExitToAppRounded className="draw_bar_icon" />
                                            <span>Log Out</span>
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <Link to="/sign_in" className="side_bar_link">
                                    <div className="side_bar_item">
                                        <LocalGasStationOutlined className="draw_bar_icon" />
                                        <span>Log In</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.userData,
    };
};

export default connect(mapStateToProps, { LogoutUser })(SideDrawer);
