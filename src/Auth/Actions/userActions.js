import { apiRequest } from '../../Utils/axios';
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






export const RegisterUser = async (credentials, history, setFieldError, setSubmitting) => {
    try {
        const request = await apiRequest('POST', `auth/v1/create-user`, credentials )
            const { data } = request;
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
    } catch (error) {
        throw new Error(error)
    }
}


export const LoginUser = async (credentials, history, setFieldError, setSubmitting) => {
    try {
        const request = await apiRequest('POST', `auth/v1/signin`, credentials )
        const { data } = request;
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
                history.push("/dashboard")
                return dispatch => {
                    dispatch(loginUserSuccess(data))
                }
            }
            setSubmitting(false);
    } catch (error) {
        throw new Error(error)
    }
}


export const  getUserDetails = async () => {
    try {
        const request = await apiRequest('GET',`auth/v1/auth`)
        const  userData  = request.data; 
        return dispatch => {
            dispatch(userDetails(userData.data))
        }
    } catch (error) {
        return dispatch => {
            const errorMsg = error
            dispatch(getUserDetailsFailure(errorMsg))
        }
    }
}


export const ChangeUserPassword = async (credentials, history) => {
     try {
        const request = await apiRequest('PATCH',`auth/v1/change_password`,credentials)
        const  {data}  = request; 
         if (data.status === "Failed") {
                alert("The password you provideded is not correct. Check the password and try again")
                history.push('profile')
            } else if (data.status === "success") {
                history.push("/change_password_success")
            }
    } catch (error) {
        throw new Error(error)
    }
}


export const LogoutUser = (history) =>{
   return () => {
    localStorage.removeItem("token");
    
    history.push("/sign_in");
  };
};