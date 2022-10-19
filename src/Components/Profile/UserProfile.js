import React from 'react'
import { connect } from 'react-redux'
import SideBar from '../Pages/SideBar'
import "./UserProfile.css"
import { PhotoCamera, EmailOutlined, HouseOutlined, PhoneOutlined } from '@material-ui/icons'
import Unavailiabe from "../../Utils/unavailiable1.png"
import { Link } from 'react-router-dom'


const UserProfile = ({userDetail}) => {
  return (
    <div className='user_profile_container'>
        <div className='user_container'>
            <div className='side_containe'>
                <SideBar/>
            </div>
            <div className='user_main_container'>
                <div className='user_profile_board'>
                    <div className='user_photos'>
                        {
                            userDetail && userDetail.coverPhoto !== null ? (
                                <div className='user_cover_bg'>
                                    <img src={userDetail.coverPhoto} alt='' className='user_cover_photo'/>
                                    <span className='user_cover_icons'><PhotoCamera className='user_cover_icon'/></span>
                                </div>
                                ):
                                <div className='cover_bg'>
                                    <span className='cover_icons'><PhotoCamera className='cover_icon'/></span>
                                </div>
                        }
                    </div>
                    <div className='user_ct_holder'>
                        {
                            userDetail && userDetail.profile !== null ? (
                                <div className='user_profile_bg'>
                                    <img src={userDetail.profile} alt='' className='user_profile_photo'/>
                                    <span className='user_profile_icons'><PhotoCamera className='profile_icon'/></span>
                                </div>
                                ):
                                <div className='profile_bg'>
                                    <img src={Unavailiabe} alt='' className='profile_photo unav'/>
                                    <span className='profile_icons'><PhotoCamera className='profile_icon'/></span>
                                </div>
                        }
                        {
                            userDetail && userDetail ? (
                                <div className='profile_user_name'>
                                    <span>{userDetail.firstName}</span>
                                    <span>{userDetail.lastName}</span>
                                </div>
                            ):  null
                        }
                    </div>
                    <hr className='hr'/>
                    {
                        userDetail && userDetail  ? (
                            <div className='joined'>
                                <span>Joined</span>
                                <span>
                                    {userDetail.createdAt.length > 4 ?
                                        `${userDetail.createdAt.substring(0, 4)}` :userDetail.userData.createdAt
                                    }    
                                </span>
                            </div>
                        ): null
                    }
                    {
                        userDetail && userDetail ? (
                            <div className='other_details'>
                                <div className='profile_item'>
                                    <span><HouseOutlined className='profile_item_icon'/></span>
                                    <span className='profile_detail'>{userDetail.jobRole}</span>
                                </div>
                                <hr className='item_hr'/>
                                <div className='profile_item'>
                                    <span><EmailOutlined className='profile_item_icon'/></span>
                                    <span className='profile_detail'>{userDetail.email}</span>
                                </div>
                                <hr className='item_hr'/>
                                <div className='profile_item'>
                                    <span><PhoneOutlined className='profile_item_icon phone' /></span>
                                    <span className='profile_detail'>{userDetail.number}</span>
                                </div>
                                <hr className='item_hr'/>
                            </div>
                        ): null
                    } 
                <div className='profile_btn_cnt'>
                    <div className='link_button'>
                        <Link className="link_btn" to='/change_password'>
                            Change password
                        </Link>
                    </div>
                    <div className='link_button'>
                        <Link className="link_btn" to='/edit_profile'>
                            Edit Profile
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