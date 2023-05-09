import {
    HomeOutlined,
    NotificationsNone,
    AddAPhotoOutlined,
    AccountCircleOutlined,
    ExitToAppRounded,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { LogoutUser } from '../../Auth/Actions/userActions';
import AddColorModal from '../Admin/AddColorModal';
import AdminModal from '../Admin/AdminModal';
import './SideBar.css';

const SideBar = ({ isAdmin }) => {
    const history = useHistory();
    const [adminModal, setAdminModal] = useState(false);
    const [addColorModal, setAddColorModal] = useState(false);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);
    return (
        <>
            <div className="side_bar_container">
                <div className="side_bar">
                    <div className="items">
                        <ul className="menu_items">
                            <NavLink
                                to="/dashboard"
                                className="side_bar_nav "
                                activeClassName="active_side_bar"
                            >
                                <HomeOutlined className="side_bar_icon" />{' '}
                                <li>All Feeds</li>
                            </NavLink>
                            <NavLink
                                to="/upload"
                                className="side_bar_nav"
                                activeClassName="active_side_bar"
                            >
                                <AddAPhotoOutlined className="side_bar_icon" />{' '}
                                <li>Uploads</li>
                            </NavLink>
                            <NavLink
                                to="/notifications"
                                className="side_bar_nav"
                                activeClassName="active_side_bar"
                            >
                                <NotificationsNone className="side_bar_icon" />
                                <li>Notifications</li>
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className="side_bar_nav"
                                activeClassName="active_side_bar"
                            >
                                <AccountCircleOutlined className="side_bar_icon" />
                                <li>Profile</li>
                            </NavLink>
                            <NavLink
                                to="/sign_in"
                                onClick={() => LogoutUser(history)}
                                className="side_bar_nav"
                                activeClassName="active_side_bar"
                            >
                                <ExitToAppRounded className="side_bar_icon" />
                                <li>Log Out</li>
                            </NavLink>
                        </ul>
                    </div>

                    {/* Only Admins can access or see these routes */}
                    {isAdmin && (
                        <div className="items">
                            <h3>Admin</h3>
                            <ul className="menu_items">
                                <NavLink
                                    to="/create_admin"
                                    className="side_bar_nav"
                                    activeClassName="active_side_bar"
                                >
                                    <li className="admin">Create Admin</li>
                                </NavLink>
                                <NavLink
                                    to="/manage_users"
                                    className="side_bar_nav"
                                    activeClassName="active_side_bar"
                                >
                                    <li className="admin">Manage users</li>
                                </NavLink>
                                <li
                                    className="admin"
                                    onClick={() => setAdminModal(true)}
                                >
                                    Add category
                                </li>
                                <li
                                    onClick={() => setAddColorModal(true)}
                                    className="admin"
                                >
                                    Add color
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {adminModal && (
                <AdminModal
                    adminModal={adminModal}
                    setAdminModal={setAdminModal}
                />
            )}
            {addColorModal && (
                <AddColorModal
                    addColorModal={addColorModal}
                    setAddColorModal={setAddColorModal}
                />
            )}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        isAdmin: state.user?.userData?.isAdmin,
    };
};

export default connect(mapStateToProps)(SideBar);

// export default SideBar;
