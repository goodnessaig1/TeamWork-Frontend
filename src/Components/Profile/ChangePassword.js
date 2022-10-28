import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import "./UserProfile.css"
import * as Yup from 'yup'
import { ChangeUserPassword } from '../../Auth/Actions/userActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'


const ChangePassword = ({ChangeUserPassword})=> {
    const history = useHistory()
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState({
        previousPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const makeRequest = (formData) => {
        ChangeUserPassword(formData, history)
    }

    const handleNextStep = (newData, final = false) =>{
        setData(prev => ({...prev, ...newData}))
        if (final) {
            makeRequest(newData)
        }
        setCurrentStep(prev => prev + 1) 
    }
    const steps = [
        <StepOne next={handleNextStep} data={data} />, 
        <StepTwo next={handleNextStep} data={data}/>
    ];

  return (
    <div className='change_password'>
        {steps[currentStep]}
    </div>
  );
}

export default connect(null, {ChangeUserPassword})(ChangePassword)

const stepOneValidatiionSchema = Yup.object({
    previousPassword: Yup.string()
    .min(3, "password is too short")
    .max(12, "password is too long")
    .required("Required")
})
const stepTwoValidatiionSchema = Yup.object({
    newPassword: Yup.string()
    .min(3, "password is too short")
    .max(12, "password is too long")
    .required("Required"),
    confirmPassword: Yup.string()
    .min(3, "password is too short")
    .max(12, "password is too long") 
    .required("Required")
    .oneOf([Yup.ref('newPassword')],"Passwords must match"),
})


const StepOne = (props) =>{
    const handleSubmit = (values )=> {
        props.next(values)
    }
    return (
        <div className='change_password_container'>
            <Formik
                validationSchema={stepOneValidatiionSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {()=>(
                    <Form>
                        <div className='password_container'>
                            <span style={{display:"flex", flexDirection:'column'}}>
                                <div className='password_input'>
                                    <Field 
                                        className='password__input' 
                                        name='previousPassword' 
                                        type='password' 
                                        placeholder='password'
                                        >
                                    </Field>
                                </div>
                                <div className='error_msg'>
                                    <ErrorMessage  name='previousPassword'/>
                                </div>
                            </span>
                            <button type='submit'>Next</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


const StepTwo = (props) =>{
    const handleSubmit = (values)=> {
        props.next(values, true)
    }
    return (
        <div className='change_password_container'>
            <Formik
                validationSchema={stepTwoValidatiionSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {()=> (
                    <Form>
                        <div className='password_container'>
                            <span>
                                <div className='password_input'>
                                    <Field 
                                        className='password__input' 
                                        name='newPassword' 
                                        type='password' 
                                        placeholder='New Password' >
                                    </Field>
                                </div>
                                <div className='error_msg'>
                                    <ErrorMessage  name='newPassword'/>
                                </div> 
                            </span>
                            <span>
                                <div className='password_input'>

                                <Field 
                                    className='password__input' 
                                    name='confirmPassword' 
                                    type='password' 
                                    placeholder='Confirm Password' >
                                </Field>
                                </div>
                                 <div className='error_msg'>
                                    <ErrorMessage  name='confirmPassword'/>
                                </div>                                        
                            </span>
                            <button type='submit'>Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}