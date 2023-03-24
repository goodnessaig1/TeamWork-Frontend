import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { DeleteArticle } from '../../Auth/Actions/articleActions';
import { DeleteGif } from '../../Auth/Actions/gifActions';

const ConfirmModal = ({ postToDelete, setPostToDelete, setConfirmModal }) => {
    const dispatch = useDispatch();
    let postId = postToDelete?.postid;

    const handleArticleDelete = () => {
        dispatch(DeleteArticle(postId));
        setPostToDelete(null);
        setConfirmModal(false);
    };

    const handleGifDelete = () => {
        dispatch(DeleteGif(postId));
        setPostToDelete(null);
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
                {postToDelete?.post?.includes('https://') ? (
                    <div className="buttons_container">
                        <button
                            className="cancel-button"
                            onClick={() => setConfirmModal(false)}
                        >
                            No
                        </button>
                        <button
                            className="confirm-button"
                            onClick={handleGifDelete}
                        >
                            Yes
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default connect()(ConfirmModal);
