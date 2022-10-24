import React from 'react'
import { connect } from 'react-redux'
import SideBar from '../Pages/SideBar'
import "./UserProfile.css"
import { PhotoCamera, EmailOutlined, CameraAltOutlined } from '@material-ui/icons'
import Unavailiabe from "../../Utils/unavailiable1.png"
// import Upload from "../../Components/Assets/upload.png"
import { Link } from 'react-router-dom'
import Home from '../Assets/Vectorhome.png'
import Phone from '../Assets/Vectorphone.png'
import Edit from '../Assets/Vectoredit.png'


const UserProfile = ({userDetail}) => {
  return (
    <div className='user_profile_container'>
        <div className='user_container'>
            <div className='side_container'>
                <SideBar/>
            </div>
            <div className='user_main_container'>
                <div className='user_profile_board'>
                    <div className='user_photos'>
                        {
                            userDetail && userDetail.coverPhoto !== null ? (
                                <div className='user_cover_bg'>
                                    <img src={userDetail.coverPhoto} alt='' className='user_cover_photo'/>
                                    <span className='cover_icons'><CameraAltOutlined className='cover_icon'/></span>
                                </div>
                                ):
                                <div className='cover_bg'>
                                    {/* <img src={Upload} alt='' className='unavail'/> */}
                                </div>
                        }
                    </div>
                    <div className='user_ct_holder'>
                        {
                            userDetail && userDetail.profile !== null ? (
                                <div className='user_profile_bg'>
                                    <img src={userDetail.profile} alt='' className='user_profile_photo'/>
                                    <span className='user_profile_icons'><CameraAltOutlined className='profile_icon'/></span>
                                </div>
                                ):
                                <div className='profile_bg'>
                                    <img src={Unavailiabe} alt='' className='profile_photo unav'/>
                                    <span className='profile_icons'><PhotoCamera className='profile_icon'/></span>
                                </div>
                        }
                        {
                            userDetail && userDetail ? (
                                <div className='profile_mid'>
                                <div className='profile_user_name'>
                                    <span>{`${userDetail.firstName } ${userDetail.lastName}`}</span>
                                </div>
                                <div className='joined'>
                                <span>Joined</span>
                                <span>
                                    {userDetail.createdAt.length > 4 ?
                                        `${userDetail.createdAt.substring(0, 4)}` :userDetail.userData.createdAt
                                    }    
                                </span>
                            </div>
                                </div>
                            ):  null
                        }
                    </div>
                    {
                        userDetail && userDetail ? (
                            <div className='other_details'>
                                <div className='profile_item'>
                                    <span><img src={Home} alt='' className='profile_items_icon'/></span>
                                    <span className='profile_detail'>{userDetail.jobRole}</span>
                                </div>
                                <hr className='item_hr'/>
                                <div className='profile_item'>
                                    <span><EmailOutlined className='profile_item_icon'/></span>
                                    <span className='profile_detail'>{userDetail.email}</span>
                                </div>
                                <hr className='item_hr'/>
                                <div className='profile_item'>
                                    <span><img src={Phone} alt='' className='profile_items_icon'/></span>
                                    <span className='profile_detail'>{userDetail.number}</span>
                                </div>
                                <hr className='item_hr'/>
                            </div>
                        ): null
                    } 
                <div className='profile_btn_cnt'>
                    <div className='profile_btn'>
                        <Link className="profile_link_btn" to='/change_password'>
                            Change password
                        </Link>
                    </div>
                    <div className='profile_btn'>
                        <Link className="profile_link_btn" to='/edit_profile'>
                            Edit Profile <img src={Edit} alt='' className='edit_icon'/>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        userDetail: state.user.userData,
        Failed: state.user.failed
    }
}


//  esonosodia
export default connect(mapStateToProps)(UserProfile)
// export default UserProfile