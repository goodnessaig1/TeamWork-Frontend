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

const SideDrawer = ({ LogoutUser, userStatus }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            <List>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <HomeOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/upload">
                    <ListItemIcon>
                        <AddAPhotoOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Upload" />
                </ListItem>
                <ListItem button component={Link} to="/notifications">
                    <ListItemIcon>
                        <NotificationsOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Notification" />
                </ListItem>
                <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                        <AccountCircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                {userStatus && userStatus.isAdmin ? (
                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <SupervisorAccountOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                        </ListItem>
                        <ListItem button component={Link} to="/category">
                            <ListItemIcon>
                                <AddOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Add Category" />
                        </ListItem>
                        <ListItem button component={Link} to="/create_admin">
                            <ListItemIcon>
                                <CreateNewFolderOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Create Admin" />
                        </ListItem>
                        <ListItem button component={Link} to="/manage_users">
                            <ListItemIcon>
                                <VerifiedUserOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Manage Users" />
                        </ListItem>
                    </div>
                ) : null}
                {!!userStatus ? (
                    <div onClick={() => LogoutUser(history)}>
                        <ListItem button component={Link} to="/sign_in">
                            <ListItemIcon>
                                <ExitToAppRounded />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </div>
                ) : (
                    <ListItem button component={Link} to="/sign_in">
                        <ListItemIcon>
                            <LocalGasStationOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Log In" />
                    </ListItem>
                )}
            </List>
        </div>
    );
    return (
        <div>
            <Menu onClick={() => setOpen(true)} />
            <Drawer open={open} anchor={'right'} onClose={() => setOpen(false)}>
                {getList()}
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.userData,
    };
};

export default connect(mapStateToProps, { LogoutUser })(SideDrawer);
