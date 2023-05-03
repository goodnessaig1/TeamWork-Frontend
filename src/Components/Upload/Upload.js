import React, { useState } from 'react';
import PageLayout from '../Pages/PageLayout';
import PostArticles from '../Post/postArticles';
import PostGif from '../Post/postGif';
import { AddToPhotos } from '@material-ui/icons';
import './Upload.css';
const Upload = () => {
    const [postArticleModal, setPostArticleModal] = useState(true);
    const [postGifModal, setPostGifModal] = useState(false);
    const [postGif, setPostGif] = useState(true);
    const handleClick = () => {
        setPostArticleModal(true);
    };
    return (
        <PageLayout>
            <div className="upload___container">
                {!postArticleModal && (
                    <div className="upload_container_content">
                        <div>
                            <div>Click here to create a post</div>
                            <div onClick={handleClick} className="upload_btn">
                                <div className="upload___button">
                                    <span>Upload</span>
                                    <AddToPhotos className="upload_icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <PostArticles
                    postArticleModal={postArticleModal}
                    setPostArticleModal={setPostArticleModal}
                    setPostGif={setPostGif}
                    setPostGifModal={setPostGifModal}
                    postGif={postGif}
                    postGifModal={postGifModal}
                />
                <PostGif
                    postGifModal={postGifModal}
                    postGif={postGif}
                    setPostArticleModal={setPostArticleModal}
                    setPostGifModal={setPostGifModal}
                />
            </div>
        </PageLayout>
    );
};

export default Upload;
