import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import SideBar from '../Pages/SideBar';
import './UserProfile.css';
import {
    EmailOutlined,
    CameraAltOutlined,
    CameraAlt,
    DragIndicator,
    FileCopyOutlined,
} from '@material-ui/icons';
import Unavailiabe from '../../Utils/unavailiable1.png';
import Wave from '../Assets/Rectangle19.png';
import { Link } from 'react-router-dom';
import Home from '../Assets/Vectorhome.png';
import Phone from '../Assets/Vectorphone.png';
import Edit from '../Assets/Vectoredit.png';
import UserProfileModal from './UserProfileModal';
import UserCoverModal from './UserCoverModal';
import ChangePhoneNumber from './ChangePhoneNumber';

const UserProfile = ({ userDetail }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [profile, setProfile] = useState(null);
    const [coverImg, setCoverImg] = useState(null);
    const [modal, setModal] = useState(false);
    const [coverModal, setCoverModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);
    const divRef = useRef(null);

    function copyText() {
        const textToCopy = divRef.current.innerText;
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
    const handleImgClick = (profile) => {
        setProfile(profile);
        setModal(true);
    };

    const handleCoverImgClick = (profile) => {
        setCoverImg(profile);
        setCoverModal(true);
    };

    return (
        <div className="user_profile_container">
            <div className="user_container">
                <div className="side_container">
                    <SideBar />
                </div>
                <div className="user_main_container">
                    <div className="user_profile_board">
                        <div className="profile_details_container">
                            <div className="user_photos">
                                {userDetail &&
                                userDetail.coverPhoto !== null ? (
                                    <div className="user_cover_bg">
                                        <img
                                            src={userDetail.coverPhoto}
                                            alt=""
                                            className="user_cover_photo"
                                        />
                                        <span
                                            onClick={() =>
                                                handleCoverImgClick(
                                                    userDetail.coverPhoto
                                                )
                                            }
                                            className="cover_icons"
                                        >
                                            <CameraAltOutlined className="cover_icon" />
                                        </span>
                                    </div>
                                ) : (
                                    <div className="cover_bg">
                                        <span
                                            onClick={() =>
                                                handleCoverImgClick(Unavailiabe)
                                            }
                                            className="cover_icons unavailiable"
                                        >
                                            <CameraAltOutlined className="cover_icon" />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="user_ct_holder">
                                {userDetail && userDetail.profile !== null ? (
                                    <div className="user_profile_bg">
                                        <img
                                            src={userDetail.profile}
                                            alt=""
                                            className="user_profile_photo"
                                        />
                                        <span
                                            onClick={() =>
                                                handleImgClick(
                                                    userDetail.profile
                                                )
                                            }
                                            className="user_profile_icons"
                                        >
                                            <CameraAltOutlined className="profile_icon" />
                                        </span>
                                    </div>
                                ) : (
                                    <div className="user_profile_bg">
                                        <img
                                            src={Unavailiabe}
                                            alt=""
                                            className="user_profile_photo unav"
                                        />
                                        <span
                                            onClick={() =>
                                                handleImgClick(Unavailiabe)
                                            }
                                            className="user_profile_icons"
                                        >
                                            <CameraAltOutlined className="profile_icon" />
                                        </span>
                                    </div>
                                )}

                                <div></div>
                                {userDetail && userDetail ? (
                                    <div className="profile_mid">
                                        <div>
                                            <div className="profile_user_name">
                                                {userDetail.firstName.length +
                                                    userDetail.lastName.length <
                                                16 ? (
                                                    <span>{`${userDetail.firstName} ${userDetail.lastName}`}</span>
                                                ) : (
                                                    <div>
                                                        <h5 className="lenthy__user_name">{`${userDetail.firstName.substring(
                                                            0,
                                                            8
                                                        )} ${userDetail.lastName.substring(
                                                            0,
                                                            8
                                                        )}...`}</h5>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="joined">
                                                <span>Joined</span>
                                                <span>
                                                    {userDetail.createdAt
                                                        .length > 4
                                                        ? `${userDetail.createdAt.substring(
                                                              0,
                                                              4
                                                          )}`
                                                        : userDetail.userData
                                                              .createdAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="mobile_profile_top">
                            <div className="mobile_profile_pix">
                                <div className="cover_photo_container">
                                    <div
                                        className="image-container"
                                        style={{
                                            backgroundColor: 'white',
                                            width: '414px',
                                            height: '390px',
                                            backgroundImage: `url(${Wave})`,
                                        }}
                                    >
                                        {userDetail?.coverPhoto && (
                                            <img
                                                className="image_wave"
                                                src={userDetail?.coverPhoto}
                                                alt="Your Image"
                                            />
                                        )}
                                    </div>
                                    <span
                                        onClick={() =>
                                            handleCoverImgClick(
                                                userDetail?.coverPhoto
                                            )
                                        }
                                        className="mobile_icon"
                                    >
                                        <CameraAlt className="circle_profile_icon" />
                                    </span>
                                </div>
                                <div className="profile_circle_container">
                                    <div className="profile_circle">
                                        <div className="small_circle">
                                            {userDetail?.profile ? (
                                                <img
                                                    src={userDetail?.profile}
                                                    alt=""
                                                    className="circle_profie"
                                                />
                                            ) : (
                                                <img
                                                    src={Unavailiabe}
                                                    alt=""
                                                    className="circle_profie"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        onClick={() =>
                                            handleImgClick(userDetail?.profile)
                                        }
                                        className="user_circle_icon"
                                    >
                                        <CameraAlt className="circle_profile_icon" />
                                    </span>
                                </div>
                            </div>
                            <div className="profile__details">
                                <div className="prfile__user_name">
                                    {userDetail && (
                                        <span className="user___name">{`${userDetail?.firstName} ${userDetail?.lastName}`}</span>
                                    )}
                                </div>
                                <div className="time_joined">
                                    <span>Joined</span>
                                    <span>
                                        {userDetail?.createdAt?.length > 4
                                            ? `${userDetail?.createdAt.substring(
                                                  0,
                                                  4
                                              )}`
                                            : userDetail?.userData?.createdAt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <hr className="user_name_hr" />
                        {userDetail && userDetail ? (
                            <div className="other_details">
                                <div>
                                    <div className="profile_item">
                                        <span>
                                            <img
                                                src={Home}
                                                alt=""
                                                className="profile_items_icon"
                                            />
                                        </span>
                                        <span className="profile_detail">
                                            {userDetail?.jobRole}
                                        </span>
                                    </div>
                                    <hr className="item_hr" />
                                    <div className="profile_item">
                                        <span>
                                            <EmailOutlined className="profile_item_icon" />
                                        </span>
                                        <span className="profile_detail">
                                            {userDetail?.email}
                                        </span>
                                    </div>
                                    <hr className="item_hr" />
                                    <div className="profile_item">
                                        <span>
                                            <img
                                                src={Phone}
                                                alt=""
                                                className="profile_items_icon phone_icon"
                                            />
                                        </span>
                                        {userDetail?.number !== null ? (
                                            <span
                                                ref={divRef}
                                                className="profile_detail Phone_num"
                                            >
                                                <span onClick={copyText}>
                                                    {userDetail?.number}
                                                </span>
                                                <DragIndicator
                                                    onClick={() =>
                                                        setPhoneNumber(true)
                                                    }
                                                    className="change_number_icon"
                                                />
                                            </span>
                                        ) : (
                                            <span
                                                className="profile_detail"
                                                onClick={() =>
                                                    setPhoneNumber(true)
                                                }
                                            >
                                                Add Contact
                                            </span>
                                        )}
                                    </div>
                                    <hr className="item_hr" />
                                </div>
                                {isCopied && (
                                    <div className="copy_message">
                                        <span>Copied!</span>
                                        <FileCopyOutlined className="copy_icon" />
                                    </div>
                                )}
                            </div>
                        ) : null}
                        <div className="profile_btn_cnt">
                            <div className="profile_btn">
                                <Link
                                    className="profile_link_btn"
                                    to="/change_password"
                                >
                                    Change password
                                </Link>
                            </div>
                            <div className="profile_btn">
                                <Link
                                    className="profile_link_btn"
                                    to="/edit_profile"
                                >
                                    Edit Profile{' '}
                                    <img
                                        src={Edit}
                                        alt=""
                                        className="edit_icon"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {profile && (
                        <UserProfileModal
                            profile={profile}
                            modal={modal}
                            setModal={setModal}
                            setProfile={setProfile}
                        />
                    )}
                    {coverImg && (
                        <UserCoverModal
                            coverModal={coverModal}
                            setCoverModal={setCoverModal}
                            coverImg={coverImg}
                            setCoverImg={setCoverImg}
                        />
                    )}
                    {phoneNumber && (
                        <ChangePhoneNumber
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            userDetail={userDetail}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userDetail: state.user.userData,
    };
};

export default connect(mapStateToProps)(UserProfile);
