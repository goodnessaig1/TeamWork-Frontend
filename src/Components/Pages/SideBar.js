import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { LogoutUser } from '../../Auth/Actions/userActions'
import './SideBar.css'


const SideBar = () => {
  const history = useHistory()
  useEffect(() => {
   window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
}, [])
  return (
    <div className='side_bar_container'>
      <div className='side_bar'>
      <div className='side_bar_top'>
          <h3>Menu</h3>
      </div>
      <div className='items'>
        <ul className='menu_items'>
          <NavLink to='/dashboard' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Home</li>
          </NavLink>
          <NavLink to='/upload' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Uploads</li>
          </NavLink>
          <NavLink to='/notifications' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Notifications</li>
          </NavLink>
          <NavLink to='/profile' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Profile</li>
          </NavLink>
        </ul>
      </div>
      <div className='items'>
        <h3>Quick Menu</h3>
        <ul className='menu_items'>
          <NavLink to='/dashboard' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>All Feeds</li>
          </NavLink>
          <NavLink to='/recent' className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Recent</li>
          </NavLink>
          <NavLink to='/sign_in'  onClick={()=> LogoutUser(history)} className='side_bar_nav' activeClassName='active_side_bar' >
            <li>Log Out</li>
          </NavLink>
        </ul>
      </div>
      
      {/* Only Admins can access or see these routes */}
      <div className='items'>
        <h3>Admin</h3>
        <ul className='menu_items'>
          <li>Add category</li>
          <li>Manage users</li>
          <li>Create Admin</li>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default SideBar