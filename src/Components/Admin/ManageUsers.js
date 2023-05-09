import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import SideBar from '../Pages/SideBar';
import './Admin.css';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import moment from 'moment';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import ConfirmDelete from './ConfirmDelete';
import {
    CreateAdmin,
    DisableAdmin,
    getUsers,
} from '../../Auth/Actions/adminActions';
import { MdVerified } from 'react-icons/md';

const ManageUsers = ({ users }) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const handleDeleteUser = (item) => {
        setUserToDelete(item);
        setConfirmModal(true);
    };

    const handleMakeAdmin = (userId) => {
        dispatch(CreateAdmin(userId));
    };

    const handleDisableAdmin = (userId) => {
        dispatch(DisableAdmin(userId));
    };

    return (
        <div>
            <div className="manage_users_container">
                <div className="manage_side_container">
                    <SideBar />
                </div>
                <div className="manage_users_main">
                    <div className="manage_users">
                        <div className="manage_users_top">
                            <h3>MANAGE USERS</h3>
                        </div>
                        <div className="manage_users_holder">
                            <div className="manage_users_description">
                                <div className="manage_user_id">ID</div>
                                <div className="manage_user_name">User</div>
                                <div className="manage_user_email">Email</div>
                                <div className="manage_user_joined">Joined</div>
                                <div className="manage_user_posts">Posts</div>
                                <div className="manage_user_actions">
                                    Actions
                                </div>
                            </div>
                            <hr className="manage_user_hr" />
                            {users &&
                                users.map((user, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="manage_users_description users">
                                                <span className="manage_user_id">
                                                    {user.id}
                                                </span>
                                                <div className="manage_user_name name">
                                                    <ProfilePicture
                                                        image={user.profile_pix}
                                                        className="manage_user_profile"
                                                    />
                                                    <span className="manage__user_name_">
                                                        {user.user_name}
                                                        {user.is_admin && (
                                                            <MdVerified className="verified" />
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="manage_user_email email">
                                                    {user.email}
                                                </div>
                                                <div className="manage_user_joined date">
                                                    {moment(user.joined).format(
                                                        'YYYY-MM-DD'
                                                    )}
                                                </div>
                                                <div className="manage_user_posts">
                                                    {user.user_total_posts}
                                                </div>
                                                <div className="manage_user_actions actions">
                                                    <div>
                                                        {user.is_admin ? (
                                                            <span
                                                                onClick={() =>
                                                                    handleDisableAdmin(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Disable
                                                            </span>
                                                        ) : (
                                                            <span
                                                                onClick={() =>
                                                                    handleMakeAdmin(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Verify
                                                            </span>
                                                        )}
                                                    </div>
                                                    <DeleteOutlineOutlined
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user
                                                            )
                                                        }
                                                        className="delete_icon"
                                                    />
                                                </div>
                                            </div>
                                            <hr className="manage_user_hr" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            {confirmModal && (
                <ConfirmDelete
                    setConfirmModal={setConfirmModal}
                    setUserToDelete={setUserToDelete}
                    userToDelete={userToDelete}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.admin?.users,
    };
};

export default connect(mapStateToProps)(ManageUsers);
