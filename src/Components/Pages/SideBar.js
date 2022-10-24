import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'


const SideBar = () => {
  return (
    <div className='side_bar_container'>
      <div className='side_bar'>
      <div className='side_bar_top'>
          <h3>Menu</h3>
      </div>
      <div className='items'>
        <ul className='menu_items'>
          {/* <NavLink > */}
                    {/* <NavLink to='/dashboard' className='nav_bar' activeClassName='active_link' > */}

          <li>Home</li>
          {/* </NavLink> */}
          <li>Uploads</li>
          <li>Notifications</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className='items'>
        <h3>Quick Menu</h3>
        <ul className='menu_items'>
          <li>All Feeds</li>
          <li>Recent</li>
          <li>Sign out</li>
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