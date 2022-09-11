import React from 'react'
import Header from '../Components/Header/Header'
import './Layout.css'


const Layout = (props) =>{
    return (
      <div>
        <Header/>
        <div className="page_container">
          {props.children}
          {/* Body */}
        </div>
      </div>
    )
  }


export default Layout
