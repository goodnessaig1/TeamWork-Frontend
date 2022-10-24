import axios from 'axios'
import { SERVER } from '../../Utils/Proxy'
import {
    LOGIN_USER,
    GET_USER_DATA,
    GET_USER_DETAILS_FAILURE,
} from './types';


export const loginUserSuccess = request => {
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const userDetails = request => {
    return {
        type: GET_USER_DATA,
        payload: request
    }
}

export const getUserDetailsFailure = error => {
    return {
        type: GET_USER_DETAILS_FAILURE,
        payload: error
    }
}


export const getUserDetails = () => {
    return (dispatch) => {
             axios.get(`${SERVER}auth/v1/auth`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(localStorage.getItem('token'))}`
            }
        }
    ).then((response) => {
        const userData = response.data
        dispatch(userDetails(userData.data))
    }).catch(error =>{
        console.log(error)
        const errorMsg = error
        dispatch(getUserDetailsFailure(errorMsg))
    })
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
                const userData = data
                const token = userData.data.token
                localStorage.setItem('token', token)
                history.push("/login_success")
                dispatch(loginUserSuccess(userData))
            }
            setSubmitting(false);
        })
        .catch(err => console.error(err));
    }
}

export const RegisterUser = (credentials, history, setFieldError, 
    setSubmitting)  => {
        
        return () => {
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
                history.push("/registration_success")
            }
        }).catch(err => console.error(err));
    }
}


export const LogoutUser = (history) =>{
   return () => {
    localStorage.removeItem("token");
    
    history.push("/sign_in");
  };
};