import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { DeleteUser } from '../../Auth/Actions/adminActions';

const ConfirmDelete = ({ userToDelete, setUserToDelete, setConfirmModal }) => {
    const dispatch = useDispatch();
    let userId = userToDelete?.id;
    const handleArticleDelete = () => {
        dispatch(DeleteUser(userId));
        setUserToDelete(null);
        setConfirmModal(false);
    };
    return (
        <div className="confirm_modal_container">
            <div
                onClick={() => setConfirmModal(false)}
                className="backdroup"
            ></div>
            <div className="modal-content">
                <h2>Are you sure?</h2>
                <p>This action cannot be undone.</p>

                <div className="buttons_container">
                    <button
                        className="cancel-button"
                        onClick={() => setConfirmModal(false)}
                    >
                        No
                    </button>
                    <button
                        className="confirm-button"
                        onClick={handleArticleDelete}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect()(ConfirmDelete);
