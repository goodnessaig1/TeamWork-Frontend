import React from 'react'
import "./PageLayout.css"
import SideBar from './SideBar'


const PageLayout = ({children}) => {
  return (
    <div className='page_layout_container'>
        <div className='page_right'>
            <SideBar/>
        </div>
        <div className='page_center'>
            {children}
        </div>
        <div className='page_left'>
            UserProfile
        </div>
    </div>
  )
}

export default PageLayout