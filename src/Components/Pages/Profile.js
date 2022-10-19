import React from 'react'
import { connect } from 'react-redux'
import { PhotoCamera, EmailOutlined, HouseOutlined, PhoneOutlined } from '@material-ui/icons'
import './Profile.css'
import Unavailiabe from "../../Utils/unavailiable1.png"
import { Link } from 'react-router-dom'

const Profile = ({userDetail}) => {
  
  return (
    <div className='profile_page'>
        <div className='profile_container'>
           <div className='photos'>
            {
                userDetail && userDetail.coverPhoto !== null ? (
                    <div className='cover_bg'>
                        <img src={userDetail.coverPhoto} alt='' className='cover_photo'/>
                        <span className='cover_icons'><PhotoCamera className='cover_icon'/></span>
                    </div>
                    ):
                    <div className='cover_bg'>
                        <span className='cover_icons'><PhotoCamera className='cover_icon'/></span>
                    </div>
            }
            </div>
             {
                 userDetail && userDetail.profile !== null ? (
                     <div className='profile_bg'>
                        <img src={userDetail.profile} alt='' className='profile_photo'/>
                        <span className='profile_icons'><PhotoCamera className='profile_icon'/></span>
                    </div>
                    ):
                    <div className='profile_bg'>
                        <img src={Unavailiabe} alt='' className='profile_photo unav'/>
                        <span className='profile_icons'><PhotoCamera className='profile_icon'/></span>
                    </div>
            }
            {
                userDetail && userDetail ? (
                    <div className='user_name'>
                        <span>{userDetail.firstName}</span>
                        <span>{userDetail.lastName}</span>
                        <hr/> 
                    </div>
                ):  null
            }
            {
                userDetail && userDetail  ? (
                    <div className='profile_others'>
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
                    <div className='profile_other'>
                        <div className='profile_item'>
                            <span><HouseOutlined className='profile_other_icon'/></span>
                            <span className='details'>{userDetail.jobRole}</span>
                        </div>
                        <hr/>
                        <div className='profile_item'>
                            <span><EmailOutlined className='profile_other_icon'/></span>
                            <span className='details'>{userDetail.email}</span>
                        </div>
                        <div className='profile_item'>
                            <span><PhoneOutlined className='profile_other_icon phone' /></span>
                            <span className='details'>{userDetail.number}</span>
                        </div>
                        <hr/>
                    </div>
                ): null
            } 
           <div className='link_button profile_bt'>
                <Link className="link_btn profile_btn" to='/profile'>
                    View Profile
                </Link>
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


export default connect(mapStateToProps)(Profile)