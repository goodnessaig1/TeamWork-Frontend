import React, { useEffect, useState } from 'react';
import PageLayout from '../Pages/PageLayout';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { getFeedDetails } from '../../Auth/Actions/feedActions';
import './DashBoard.css';
import Unavailiabe from '../../Utils/unavailiable1.png';
import Feeds from './Feeds';

const MainPage = ({ feeds, user, requesting }) => {
    const [offSet, setOffSet] = useState(0);
    const feedsLength = feeds?.length;
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        dispatch(getFeedDetails(offSet));
    }, []);
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
                            placeholder="Share your thoughts..."
                            className="share_input"
                        />
                    </div>
                </div>
                {/*========    MAIN FEEDS ===========*/}
                <div>
                    <Feeds
                        feeds={feeds}
                        offSet={offSet}
                        feedsLength={feedsLength}
                        setOffSet={setOffSet}
                        requesting={requesting}
                    />
                </div>
            </div>
        </PageLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        feeds: state.feeds.allFeeds,
        user: state.user.userData,
        requesting: state.feeds.getFeedDetails?.requesting,
    };
};

export default connect(mapStateToProps)(MainPage);
