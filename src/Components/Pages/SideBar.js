import React from 'react'
import './SideBar.css'


const SideBar = () => {
  return (
    <div className='side_bar_container'>
      <div className='side_bar'>
      <div className='side_bar_top'>
          <h3>Menu</h3>
      </div>
      <div className='items'>
        <ul>
          <li>Home</li>
          <li>Uploads</li>
          <li>Notifications</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className='items'>
        <h3>Quick Menu</h3>
        <ul>
          <li>All Feeds</li>
          <li>Recent</li>
          <li>Reports</li>
        </ul>
      </div>
      <div className='items'>
        <h3>View</h3>
        <p>Articles</p>
        <ul>
          <li>#Education</li>
          <li>#Business</li>
          <li>#Election</li>
          <li>#Sports</li>
        </ul>
        <p>Gifs</p>
        <ul>
          <li>All Gifs</li>
        </ul>
      </div>
      {/* Only Admins can access or see these routes */}
      <div className='items'>
        <h3>Admin</h3>
        <ul>
          <li>Add category</li>
          <li>Manage users</li>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default SideBar