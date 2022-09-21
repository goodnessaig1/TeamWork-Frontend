import React from 'react'
import img from "../Register/registrationSuccess.jpg"
import { useEffect } from "react";
import { useHistory, } from 'react-router-dom'

const RegistrationSuccess = () => {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push('/sign_in')
        }, 8000);
        // eslint-disable-next-line
    }, []);

  return (
    <div className='registration_success_container'>
        <img src={img} className='registration_img' alt=''/>
        <div className='registration_success'>
            <h4>Registration Successful</h4>
            <p>You will be redirected to the sign in page shortly</p>
        </div>
    </div>
  )
}

export default RegistrationSuccess