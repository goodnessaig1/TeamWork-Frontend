import React from 'react'
import { MailOutline, Lock } from '@material-ui/icons'
import "./Login.css"
import { Formik, Form} from 'formik'
import { TextInput } from '../../../Utils/FormLib'
import * as Yup from 'yup'
import { Link, useHistory, } from 'react-router-dom'
import { Audio } from  'react-loader-spinner'


//  Auth & Redux
import { connect } from 'react-redux'
import { LoginUser } from '../../../Auth/Actions/userActions'

const Login = ({LoginUser}) => {
    const history = useHistory()
    return (
    <div className='login_page_container'>
        <div className='title'>
            <h2>STAFFCONN</h2>
        </div>
        <div className='login_container'>
            <Formik 
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema= {
                    Yup.object({
                        email: Yup.string().email("Invalid email address")
                        .required("Required"),
                        password: Yup.string()
                        .min(6, "password is too short")
                        .max(15, "password is too long")
                        .required("Required")
                    })
                }

                onSubmit={(values, {setSubmitting, setFieldError})=>{
                    // console.log(values)
                    LoginUser(values, history, setFieldError, setSubmitting)
                }}
            >
             {({isSubmitting}) => (
                    <Form >
                        <div className='form_inputs'>
                            <div className='input_container'>
                                <TextInput
                                    name="email"
                                    type='text'
                                    placeholder='Email'
                                    icon={ <MailOutline/>}
                                />
                            </div>  
                            <div className='input_container'>
                                <TextInput
                                    name="password"
                                    type='password'
                                    placeholder='Password'
                                    icon={ <Lock/>}
                                />
                            </div>
                        </div>
                        <div className='button__group'>
                        { !isSubmitting && ( 
                        <button type='submit' className='formButton' >
                            Login
                        </button>
                        )}
                        {isSubmitting && (
                            <Audio
                                type="ThreeDots"
                                color="rgba(121, 144, 225, 1)"
                                height={20}
                                width={10}
                            />
                        )}
                        </div>
                    </Form>
                )}   
                </Formik>
                <div className='signup_container'>
            <p className='more_text'>
                    New here ? 
                <Link to='/create-user' className='text_link'>
                    Signup
                </Link>
            </p>
            </div>
        </div>      
            <div className='copyright'>
                All rights reserved &copy; 2022
            </div>
    </div>
  )
}

export default connect(null, {LoginUser})(Login);