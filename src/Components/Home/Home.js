import React from 'react'
import { BubbleChart } from '@material-ui/icons'
import './Home.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <header>
        <div className='logo_container'>
            <BubbleChart style={{ fontSize: "60px", color: "white" }} className='App-logo' />
        </div>
        <h1>Hello welcome to TeamWork</h1>
        <p>Feel free to explore our page</p>
        <div className='link_buttons'>
            <Link className="link" to='/signin'>Login</Link>
            <Link className="link" to='/create-user' >Signup</Link>
        </div>
    </header>
  )
}

export default Home