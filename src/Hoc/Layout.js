import React from 'react'
import Header from '../Components/Header/Header'
import './Layout.css'


const Layout = ({children}) =>{
    return (
      <div>
        <Header/>
        <div className="page_container">
          {children}
          {/* Body */}
        </div>
      </div>
    )
  }


export default Layout
