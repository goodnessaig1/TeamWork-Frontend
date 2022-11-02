import React from 'react'
import { connect } from 'react-redux'
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
                           <span>
                            {
                                userDetail.firstName.length + userDetail.lastName.length < 14 ? (
                                    <h3>{`${userDetail.firstName } ${userDetail.lastName}`}</h3>
                                    ):
                                    <div>
                                        <h5 className='lenthy_user_name'>{`${userDetail.firstName.substring(0, 8) } ${userDetail.lastName.substring(0,3)}...`}</h5>
                                    </div>
                            }
                           </span>
                        </div>
                        <div className='profile_others'>
                            <div>{userDetail.jobRole}</div>
                            <div className='joined_at'>
                                <span>Joined</span>
                                <span>
                                    {userDetail.createdAt.length > 4 ?
                                        `${userDetail.createdAt.substring(0, 4)}` :userDetail.createdAt
                                    }    
                                </span>
                            </div>
                        </div>
                    </div>
                ):  null
            }
           <div className='side_bar_btn'>
            <Link className="profile_button" to='/profile'>
                <div className='profile__btn'>
                    View Profile
                </div>
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