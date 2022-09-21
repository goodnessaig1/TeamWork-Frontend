import axios from 'axios'
import { SERVER } from '../../Utils/Proxy'
import {
    LOGIN_USER
} from './types';


export const loginUserSuccess = request => {
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export const LoginUser = (credentials, history, setFieldError, setSubmitting) => {
    // Make checks and get some 
    return (dispatch) => {
        axios.post(`${SERVER}auth/v1/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            const { data } = response;

             if (data.status === "Failed") {
                const { message} = data;
                if (message.includes("email")) {
                    setFieldError("email", message)
                }
                if (message.includes("password")) {
                    setFieldError("password", message)
                }
            } else if (data.status === "success") {
                const userData = data.data

                const token = userData.token
                localStorage.setItem('token', token)
                console.log(token)
                history.push("/dashboard")
                dispatch(loginUserSuccess(userData))
            }
            setSubmitting(false);
        })
        .catch(err => console.error(err));
    }
}

export const RegisterUser = (credentials, history, setFieldError, 
    setSubmitting)  => {
        
        return (dispatch) => {
        axios.post(`${SERVER}auth/v1/create-user`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response)=>{
            const { data } = response;

            if (data.status === "Failed") {
                const { message} = data;
                if (message.includes("email")) {
                    setFieldError("email", message)
                }

                // complete submittiion
                setSubmitting(false);
            } else if (data.status === "success") {
                setTimeout(() => {
                    console.log('hi')
                    history.push("/registration_success")
                 }, 1000);
                setTimeout(() => {
                         const { email, password } = credentials

                dispatch(LoginUser({email, password }, history, setFieldError, setSubmitting ))
            }, 8000);
            }
        }).catch(err => console.error(err));
    }
}


