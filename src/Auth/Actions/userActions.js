import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify'

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PICTURE_SUCCESS
} from './types';


export const registerUserSuccess = request => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: request
    }
}

export const registerUserFailure = request => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: request
    }
}

export const loginUserSuccess = request => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: request
    }
}

export const loginUserFailure = error => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: error
    }
}

export const userDetailsSuccess = request => {
    return {
        type: GET_USER_DETAILS_SUCCESS,
        payload: request
    }
}
export const userDetailsRequest = request => {
    return {
        type: GET_USER_DETAILS_REQUEST,
        payload: request
    }
}

export const getUserDetailsFailure = error => {
    return {
        type: GET_USER_DETAILS_FAILURE,
        payload: error
    }
}
export const changePasswordSuccess = success => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: success
    }
}
export const changePictureSuccess = success => {
    return {
        type: CHANGE_PICTURE_SUCCESS,
        payload: success
    }
}
export const changePasswordFailure = error => {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        payload: error
    }
}




export function RegisterUser(credentials, history, setFieldError, setSubmitting) {
    return dispatch => {
        const promise = apiRequest('POST', `auth/v1/create-user`, credentials);
        promise.then(
            function (payload) {
                const { data } = payload;
                if (data.status === "Failed") {
                    const { message} = data;
                    if (message.includes("email")) {
                        setFieldError("email", message)
                    }
                    // complete submittiion
                    setSubmitting(false);
                } else if (data.status === "success") {
                    dispatch(registerUserFailure(data))
                    history.push("/registration_success")
                }
            },
            function (error) {
                const errorMsg = error
                dispatch(registerUserFailure(errorMsg))
            }
        );
        return promise;
    };
}


export function LoginUser(credentials, history, setFieldError, setSubmitting) {
    return dispatch => {
        const promise = apiRequest('POST', `auth/v1/signin`, credentials);
        promise.then(
            function (payload) {
                const { data } = payload;
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
                    dispatch(loginUserSuccess(data))
                }
                setSubmitting(false);
            },
            function (error) {
                const errorMsg = error
                dispatch(loginUserFailure(errorMsg))
            }
        );
        return promise;
    };
}

export function getUserDetails() {
    return dispatch => {
        const promise = apiRequest('GET',`auth/v1/auth`);
        dispatch(userDetailsRequest());
        promise.then(
            function (payload) {
                const  userData  = payload.data;
                dispatch(userDetailsSuccess(userData?.data));
            },
            function (error) {
                const errorMsg = error
                dispatch(getUserDetailsFailure(errorMsg))
            }
        );
        return promise;
    };
}

export function ChangeUserPassword(credentials, history) {
    return dispatch => {
        const promise = apiRequest('PATCH',`auth/v1/change_password`,credentials);
        promise.then(
            function (payload) {
                const  {data}  = payload; 
                if (data.status === "Failed") {
                    dispatch(changePasswordFailure(data))
                    toast.error('Wrong Password!', {position: toast.POSITION.TOP_RIGHT});
                    history.push('profile')
                } else if (data.status === "success") {
                    toast.success('Successful', {position: toast.POSITION.TOP_RIGHT});
                    dispatch(changePasswordSuccess(data))
                    history.push("/change_password_success")
                }
            },
            function (error) {
                dispatch(changePasswordFailure(error))
            }
        );
        return promise;
    };
}


export const UploadProfilePIx = (formData, history,setProfile,setSubmitting) =>{
    return async (dispatch) => {
       const promise =   apiRequest('PATCH', `auth/v1/upload_pix`,formData,
        {
            headers: {
                
                "Content-Type": "multipart/form-data",
                'Accept': 'multipart/form-data',
            },
        });
         promise.then(
            function (payload) {
                const  {data}  = payload; 
                if (data.status === "Failed") {
                    toast.error('An Error occured!', {position: toast.POSITION.TOP_RIGHT});
                    history.push('profile')
                } else if (data.status === "success") {
                    toast.success('Successful', {position: toast.POSITION.TOP_RIGHT});
                    dispatch(getUserDetails())
                    dispatch(changePictureSuccess(data))
                    return setProfile(null)
                }
                setSubmitting(false);
            },
            function (error) {
                toast.error('An Error occured, Please try again', {position: toast.POSITION.TOP_RIGHT});
                throw new Error(error)
            }
        );
        return promise;
    }
}


export const UploadCoverPhoto = (formData, history,setCoverImg,setSubmitting) =>{
    return async (dispatch) => {
       const promise =   apiRequest('PATCH', `auth/v1/cover_photo`,formData,
        {
            headers: {
                
                "Content-Type": "multipart/form-data",
                'Accept': 'multipart/form-data',
            },
        });
         promise.then(
            function (payload) {
                const  {data}  = payload; 
                if (data.status === "Failed") {
                    toast.error('An Error occured!', {position: toast.POSITION.TOP_RIGHT});
                    history.push('profile')
                } else if (data.status === "success") {
                    dispatch(getUserDetails())
                    toast.success('Successful', {position: toast.POSITION.TOP_RIGHT});
                    dispatch(changePictureSuccess(data))
                    return setCoverImg(null)
                }
                setSubmitting(false);
            },
            function (error) {
                toast.error('An Error occured, Please try again', {position: toast.POSITION.TOP_RIGHT});
                throw new Error(error);
            }
        );
        return promise;
    }
}


export const LogoutUser = (history) =>{
   return () => {
    localStorage.removeItem("token");
    
    history.push("/sign_in");
  };
};
