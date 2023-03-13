import React, { useEffect, useState } from 'react';
import PageLayout from '../Pages/PageLayout';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { getFeeds } from '../../Auth/Actions/feedActions';
import './DashBoard.css';
import Unavailiabe from '../../Utils/unavailiable1.png';
import Feeds from './Feeds';
import PostArticles from '../Post/postArticles';
import PostGif from '../Post/postGif';

const MainPage = ({ user, feeds, requesting, feedsTotal }) => {
    const [offSet, setOffSet] = useState(0);
    const [postArticle, setPostArticle] = useState(null);
    const [postArticleModal, setPostArticleModal] = useState(false);
    const [postGif, setPostGif] = useState(null);
    const [postGifModal, setPostGifModal] = useState(false);
    const [clickedImage, setClickedImage] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        dispatch(getFeeds(offSet));
    }, []);
    let feedsLength = feeds?.length;
    const handleUploadClick = (e) => {
        setPostArticle(e);
        setPostArticleModal(true);
    };
    return (
        <PageLayout>
            <div className="dashboard_container">
                <div className="dash_board_top">
                    <div className="dashboard_top">
                        {user?.profile ? (
                            <img
                                src={user.profile}
                                alt=""
                                className="profile__image"
                            />
                        ) : (
                            <img
                                src={Unavailiabe}
                                className="profile__image"
                                alt=""
                            />
                        )}
                        <input
                            type="text"
                            className="share_input"
                            placeholder="Share your thoughts..."
                            onClick={() => handleUploadClick(true)}
                        />
                    </div>
                </div>
                {/*========    MAIN FEEDS ===========*/}
                <div>
                    <Feeds
                        feeds={feeds}
                        setPostArticle={setPostArticle}
                        setPostArticleModal={setPostArticleModal}
                        offSet={offSet}
                        setOffSet={setOffSet}
                        feedsLength={feedsLength}
                        requesting={requesting}
                        feedsTotal={feedsTotal}
                        open={open}
                        setOpen={setOpen}
                        clickedImage={clickedImage}
                        setClickedImage={setClickedImage}
                    />
                </div>
                <div>
                    {postArticle && (
                        <PostArticles
                            feeds={feeds}
                            postArticleModal={postArticleModal}
                            setPostArticleModal={setPostArticleModal}
                            postArticle={postArticle}
                            setPostGif={setPostGif}
                            setPostGifModal={setPostGifModal}
                            postGif={postGif}
                            postGifModal={postGifModal}
                        />
                    )}
                </div>
                <div>
                    {postGif && (
                        <PostGif
                            feeds={feeds}
                            postGif={postGif}
                            postGifModal={postGifModal}
                            setPostGifModal={setPostGifModal}
                            setPostArticleModal={setPostArticleModal}
                        />
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        feeds: state.feeds.allFeeds,
        feedsTotal: state.feeds?.total?.totalrows,
        user: state.user.userData,
        requesting: state.feeds.getFeeds?.requesting,
    };
};

export default connect(mapStateToProps)(MainPage);
