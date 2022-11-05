import React from 'react'
import img from "../../Assets/registrationSuccess.jpg"
import { useEffect } from "react";
import { useHistory, } from 'react-router-dom'

const RegistrationSuccess = () => {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push('/sign_in')
        }, 8000);
    }, [history]);

  return (
    <div className='success_container'>
        <img src={img} className='success_img' alt=''/>
        <div className='success_ct'>
            <h4>Registration Successful</h4>
            <p>You will be redirected to the sign in page shortly</p>
        </div>
    </div>
  )
}

export default RegistrationSuccess