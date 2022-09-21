import React from 'react'
import img from "../Register/registrationSuccess.jpg"

const RegistrationSuccess = () => {
  return (
    <div className='registration_success_container'>
        <img src={img} className='registration_img' alt=''/>

        <div className='registration_success'>
            <h4>Registration Successful</h4>
            <p>You will be redirected to your dashboard shortly</p>
        </div>
    </div>
  )
}

export default RegistrationSuccess