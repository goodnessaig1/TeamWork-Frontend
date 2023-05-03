import {
    HomeOutlined,
    NotificationsNone,
    AddAPhotoOutlined,
    AccountCircleOutlined,
    CreateNewFolderOutlined,
    AddOutlined,
    VerifiedUserOutlined,
    ExitToAppRounded,
    FiberNew,
    DashboardOutlined,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { LogoutUser } from '../../Auth/Actions/userActions';
import './SideBar.css';

const SideBar = () => {
    const history = useHistory();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);
    return (
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
                <div className="items">
                    <h3>Admin</h3>
                    <ul className="menu_items">
                        <NavLink
                            to="/recent"
                            className="side_bar_nav"
                            activeClassName="active_side_bar"
                        >
                            {/* <CreateNewFolderOutlined className="side_bar_icon" /> */}
                            <li className="admin">Create Admin</li>
                        </NavLink>
                        <NavLink
                            to="/recent"
                            className="side_bar_nav"
                            activeClassName="active_side_bar"
                        >
                            {/* <AddOutlined className="side_bar_icon" /> */}
                            <li className="admin">Add category</li>
                        </NavLink>
                        <NavLink
                            to="/recent"
                            className="side_bar_nav"
                            activeClassName="active_side_bar"
                        >
                            {/* <AddOutlined className="side_bar_icon" /> */}
                            <li className="admin">Add color</li>
                        </NavLink>
                        <NavLink
                            to="/recent"
                            className="side_bar_nav"
                            activeClassName="active_side_bar"
                        >
                            {/* <VerifiedUserOutlined className="side_bar_icon" /> */}
                            <li className="admin">Manage users</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
