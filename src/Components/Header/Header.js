import React from 'react'
import { BubbleChart, Home, AddAPhoto, NotificationsNone, AccountCircle } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import "./Header.css"
import { connect } from 'react-redux'
import { LogoutUser } from '../../Auth/Actions/userActions'

import PropTypes from 'prop-types'

const Header = ({LogoutUser, userStatus}) => {
    const history = useHistory()

    return (
    <div className='header__container'>
        <div className='content'>
            <div className='left'>
                <div className='left_cont'>
                    <div className='logo_cont'>
                        <BubbleChart className='App-logo icon_logo' />
                    </div>
                    <div>
                        <h2>STAFFCONN</h2>
                    </div>
                </div>
            </div>
            <div className='center'>
                <div className='center_container'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className='nav_bar_container '>
                            <Home className='center_icon active'/>
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link to='/upload' style={{ textDecoration: 'none' }}>
                        <div className='nav_bar_container'>
                            <AddAPhoto className='center_icon'/>
                            <span>Upload</span>
                        </div>
                    </Link>
                    <Link to='/notifications' style={{ textDecoration: 'none' }}>
                        <div className='nav_bar_container'>
                            <NotificationsNone className='center_icon'/>
                            <span>Notification</span>
                        </div>
                    </Link>
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                        <div className='nav_bar_container'>
                            <AccountCircle className='center_icon'/>
                            <span>Profile</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='right'>
                <div className='right_container'>
                    <div className='link_button'>
                        {
                            !!userStatus ?  (
                                <Link 
                                    className="register_link" 
                                    to='/sign_in'
                                    onClick={()=> LogoutUser(history)}
                                >
                                    Sign out
                                </Link>
                                ) : (
                                    
                                <Link 
                                    className="register_link" 
                                    to='/sign_in'
                                >
                                    Sign In
                                </Link>
                            )
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.userData
    }
}

Header.propTypes = {
  userStatus: PropTypes.object,
  LogoutUser: PropTypes.func
}

export default connect(mapStateToProps, {LogoutUser})(Header);