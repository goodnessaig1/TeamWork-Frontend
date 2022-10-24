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
            <div className='cover_bg'></div>
            {
                 userDetail && userDetail.profile !== null ? (
                     <div className='profile_bg'>
                        <img src={userDetail.profile} alt='' className='profile_photo'/>
                    </div>
                    ):
                    <div className='profile_bg'>
                        <img src={Unavailiabe} alt='' className='profile_photo unav'/>
                    </div>
            }
            {
                userDetail && userDetail ? (
                    <div>
                        <div className='user_name'>
                            <h2>{userDetail.firstName}</h2>
                            <h2>{userDetail.lastName}</h2>
                        </div>
                        <div className='profile_others'>
                            <div>{userDetail.jobRole}</div>
                            <div className='joined_at'>
                                <span>Joined</span>
                                <span>
                                    {userDetail.createdAt.length > 4 ?
                                        `${userDetail.createdAt.substring(0, 4)}` :userDetail.userData.createdAt
                                    }    
                                </span>
                            </div>
                        </div>
                    </div>
                ):  null
            }
           <div className='profile_bt'>
            <div className=' link_button'>
                <Link className="profile_btn" to='/profile'>
                    View Profile
                </Link>
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


export default connect(mapStateToProps)(Profile)