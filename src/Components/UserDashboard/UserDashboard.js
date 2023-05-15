import React, { useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleUserDetails } from '../../Auth/Actions/userActions';
import PageLayout from '../Pages/PageLayout';
import './UserDashboard.css';
import { MdVerified } from 'react-icons/md';
import { BiMale } from 'react-icons/bi';
import {
    AlternateEmailSharp,
    EmailOutlined,
    FileCopyOutlined,
} from '@material-ui/icons';
import Phone from '../Assets/Vectorphone.png';
import ConfirmModal from '../Dashboard/ConfirmModal';
import UserFeeds from './UserFeeds';
import UserGifModal from './UserGifModal';
import UserArticleModal from './UserArticleModal';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import ViewProfile from './ViewProfile';
import EditUserArticle from './EditUserArticle';

const UserDashboard = ({
    profileDetails,
    userPosts,
    userData,
    requesting,
    feedsTotal,
}) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [offSet, setOffSet] = useState(0);
    const [updateArticleModal, setUpdateArticleModal] = useState(false);
    const [gifModal, setGifModal] = useState(false);
    const [articleModal, setArticleModal] = useState(false);
    const [activeDiv, setActiveDiv] = useState(null);
    const [postToUpdate, setPostToUpdate] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [clickedImage, setClickedImage] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        dispatch(getSingleUserDetails(id, offSet));
    }, []);
    const handleViewProfile = (image) => {
        setClickedImage(image);
    };
    const divRef = useRef(null);

    function copyText() {
        const textToCopy = divRef.current.innerText;
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
    return (
        <>
            <PageLayout>
                <>
                    {!requesting && (
                        <div className="profile_details__container">
                            <div className="profile_details_holder">
                                <div className="profile__details">
                                    <div className="user_details_cover">
                                        {profileDetails?.cover_photo != null ? (
                                            <img
                                                src={
                                                    profileDetails?.cover_photo
                                                }
                                                onClick={() =>
                                                    handleViewProfile(
                                                        profileDetails.cover_photo
                                                    )
                                                }
                                                alt=""
                                                className="user_detail__cover"
                                            />
                                        ) : (
                                            <div className="user_detail__cover unaveliable"></div>
                                        )}
                                    </div>
                                    <div className="user_details_profile">
                                        <div className="user_profile_holder">
                                            <div
                                                onClick={() =>
                                                    handleViewProfile(
                                                        profileDetails.profile_pix
                                                    )
                                                }
                                            >
                                                <ProfilePicture
                                                    image={
                                                        profileDetails?.profile_pix
                                                    }
                                                    className="user_detail_profile_pix"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_detail_name">
                                    <span className="profile__detail__name">
                                        {`${profileDetails?.first_name} ${profileDetails?.last_name}`}
                                        {profileDetails?.is_admin && (
                                            <MdVerified className="verified_user" />
                                        )}
                                    </span>
                                    <span className="user_profile_joined">
                                        Joined{' '}
                                        {`${profileDetails?.created_at?.substring(
                                            0,
                                            4
                                        )}`}
                                    </span>
                                </div>
                                <div className="other_user_details">
                                    <div>
                                        <EmailOutlined className="profile_detail__icon" />
                                        <span>{profileDetails?.email}</span>
                                    </div>
                                    <hr className="profile_detail_hr" />
                                    <div>
                                        <img
                                            src={Phone}
                                            alt=""
                                            className="profile_items_icon phone_icon"
                                        />
                                        {profileDetails.number && (
                                            <span ref={divRef}>
                                                <span onClick={copyText}>
                                                    {profileDetails?.number}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    <hr className="profile_detail_hr" />
                                    {isCopied && (
                                        <div className="copy_message user_copy">
                                            <span>Copied!</span>
                                            <FileCopyOutlined className="copy_icon" />
                                        </div>
                                    )}
                                    <div>
                                        <BiMale className="profile_detail__icon" />
                                        <span>{profileDetails?.gender}</span>
                                    </div>
                                    <hr className="profile_detail_hr" />
                                    <div>
                                        <AlternateEmailSharp className="profile_detail__icon" />
                                        <span>{profileDetails?.address}</span>
                                    </div>
                                </div>
                            </div>
                            <UserFeeds
                                offSet={offSet}
                                id={id}
                                setOffSet={setOffSet}
                                setUpdateArticleModal={setUpdateArticleModal}
                                setActiveDiv={setActiveDiv}
                                setPostToUpdate={setPostToUpdate}
                                postToUpdate={postToUpdate}
                                confirmModal={confirmModal}
                                setConfirmModal={setConfirmModal}
                                gifModal={gifModal}
                                userPosts={userPosts}
                                feedsTotal={feedsTotal}
                                userData={userData}
                                activeDiv={activeDiv}
                                setGifModal={setGifModal}
                                setArticleModal={setArticleModal}
                                articleModal={articleModal}
                            />
                            <div className="profile_bottom"></div>
                        </div>
                    )}
                </>
                {requesting && (
                    <div className="loading_container">
                        <ColorRing
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperClass="blocks-wrapper"
                            colors={[
                                '#e15b64',
                                '#f47e60',
                                'rgba(121, 144, 225, 1)',
                                '#abbd81',
                                '#849b87',
                            ]}
                        />
                    </div>
                )}
                <div>
                    {gifModal && (
                        <UserGifModal
                            gifModal={gifModal}
                            setGifModal={setGifModal}
                        />
                    )}
                    {articleModal && (
                        <UserArticleModal
                            articleModal={articleModal}
                            setArticleModal={setArticleModal}
                        />
                    )}
                    {updateArticleModal && (
                        <EditUserArticle
                            updateArticleModal={updateArticleModal}
                            setUpdateArticleModal={setUpdateArticleModal}
                            postToUpdate={postToUpdate}
                            setPostToUpdate={setPostToUpdate}
                        />
                    )}
                    {activeDiv !== null && (
                        <div className="bottom_back">
                            <div
                                onClick={() => setActiveDiv(null)}
                                className="backdroup"
                            ></div>
                        </div>
                    )}
                    {confirmModal && (
                        <ConfirmModal
                            postToDelete={postToDelete}
                            setPostToDelete={setPostToDelete}
                            setConfirmModal={setConfirmModal}
                        />
                    )}
                    {clickedImage && (
                        <ViewProfile
                            clickedImage={clickedImage}
                            setClickedImage={setClickedImage}
                        />
                    )}
                </div>
            </PageLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        feedsTotal: state.user?.total?.totalrows,
        profileDetails: state.user.userDetails.profileDetails,
        userData: state.user.userData,
        userPosts: state.user.userDetails.userPosts,
        requesting: state.user.getSingleUserDetails?.requesting,
    };
};

export default connect(mapStateToProps)(UserDashboard);
