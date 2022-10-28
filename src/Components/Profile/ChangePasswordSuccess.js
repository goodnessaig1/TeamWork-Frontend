import React from 'react'
import { useEffect } from "react";
import { useHistory, } from 'react-router-dom'
import Good from "../Assets/good.png"

const ChangePasswordSuccess = () => {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push('/profile')
        }, 8000);
        // eslint-disable-next-line
    }, []);

  return (
    <div className='password_change_success'>
        <div className='password_change_container'>
           <span className='password_span'>
                <img src={Good} alt='' className='success_img' />
                <p>You’ve successfully changed your pasword</p>
           </span>
        </div>
    </div>
  )
}

export default ChangePasswordSuccess