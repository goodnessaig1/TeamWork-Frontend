import React from 'react'
import { useEffect } from "react";
import { useHistory, } from 'react-router-dom'
import img from '../../Assets/welcome.png'

const LoginSuccess = () => {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push('/dashboard')
        }, 4000);
        // eslint-disable-next-line
    }, []);

  return (
    <div className='success_container'>
        <img src={img} className='success_img' alt=''/>
        <div className='success_ct'>
            <h4>Welcome Back</h4>
            <p>You will be redirected to the dashboard shortly</p>
        </div>
    </div>
  )
}

export default LoginSuccess