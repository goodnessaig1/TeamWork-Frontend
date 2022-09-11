import React from 'react'
import { BubbleChart, Home, AddAPhoto, NotificationsNone, AccountCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <div className='header__container'>
        <div className='content'>
            <div className='left'>
                <div className='left_cont'>
                    <div className='logo_cont'>
                        <BubbleChart className='App-logo icon_logo' />
                    </div>
                    <div>
                        <h2>TEAMWORK</h2>
                    </div>
                </div>
            </div>
            <div className='center'>
                <div className='center_container'>
                    <div className='center_components'>
                        <Home className='center_icon'/>
                        <span>Home</span>
                    </div>
                    <div className='center_components'>
                        <AddAPhoto className='center_icon'/>
                        <span>Upload</span>
                    </div>
                    <div className='center_components'>
                        <NotificationsNone className='center_icon'/>
                        <span>Notification</span>
                    </div>
                    <div className='center_components'>
                        <AccountCircle className='center_icon'/>
                        <span>Profile</span>
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='right_container'>
                    <div className='link_button'>
                        <Link className="register_link" to='/signin'>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header