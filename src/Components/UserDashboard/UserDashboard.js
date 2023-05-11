import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleUserDetails } from '../../Auth/Actions/userActions';
import PageLayout from '../Pages/PageLayout';
import './UserDashboard.css';

const UserDashboard = ({ profileDetails, userPosts }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getSingleUserDetails(id));
    }, []);
    console.log(profileDetails);
    return (
        <>
            <PageLayout>
                <div className="profile_details_container">
                    <div className="profile_details_holder">
                        <div>profile details</div>
                        <div>adadfa</div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        feeds: state.feeds.allFeeds,
        feedsTotal: state.feeds?.total?.totalrows,
        // user: state.user.userData,
        profileDetails: state.user.userDetails.profileDetails,
        userPosts: state.user.userDetails.userPosts,
        requesting: state.user.getFeeds?.requesting,
    };
};

export default connect(mapStateToProps)(UserDashboard);
