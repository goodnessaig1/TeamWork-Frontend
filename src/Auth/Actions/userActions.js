import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';
import * as types from './types';

export const registerUserRequest = (request) => {
    return {
        type: types.REGISTER_USER_REQUEST,
        payload: request,
    };
};
export const registerUserSuccess = (request) => {
    return {
        type: types.REGISTER_USER_SUCCESS,
        payload: request,
    };
};

export const registerUserFailure = (error) => {
    return {
        type: types.REGISTER_USER_FAILURE,
        payload: error,
    };
};

export const loginUserRequest = (request) => {
    return {
        type: types.LOGIN_USER_REQUEST,
        payload: request,
    };
};

export const loginUserSuccess = (request) => {
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: request,
    };
};

export const loginUserFailure = (error) => {
    return {
        type: types.LOGIN_USER_FAILURE,
        payload: error,
    };
};

export const userDetailsSuccess = (request) => {
    return {
        type: types.GET_USER_DETAILS_SUCCESS,
        payload: request,
    };
};
export const userDetailsRequest = (request) => {
    return {
        type: types.GET_USER_DETAILS_REQUEST,
        payload: request,
    };
};

export const getUserDetailsFailure = (error) => {
    return {
        type: types.GET_USER_DETAILS_FAILURE,
        payload: error,
    };
};
export const changePasswordRequest = (request) => {
    return {
        type: types.CHANGE_PASSWORD_REQUEST,
        payload: request,
    };
};
export const changePasswordSuccess = (success) => {
    return {
        type: types.CHANGE_PASSWORD_SUCCESS,
        payload: success,
    };
};

export const changePasswordFailure = (error) => {
    return {
        type: types.CHANGE_PASSWORD_FAILURE,
        payload: error,
    };
};

export const changeProfilePictureRequest = (request) => {
    return {
        type: types.CHANGE_PROFILE_PICTURE_REQUEST,
        payload: request,
    };
};
export const changeProfilePictureSuccess = (success) => {
    return {
        type: types.CHANGE_PROFILE_PICTURE_SUCCESS,
        payload: success,
    };
};
export const changeProfilePictureFailure = (error) => {
    return {
        type: types.CHANGE_PROFILE_PICTURE_FAILURE,
        payload: error,
    };
};
export const changeCoverPhotoRequest = (request) => {
    return {
        type: types.CHANGE_COVER_PHOTO_REQUEST,
        payload: request,
    };
};
export const changeCoverPhotoSuccess = (success) => {
    return {
        type: types.CHANGE_COVER_PHOTO_SUCCESS,
        payload: success,
    };
};
export const changeCoverPhotoFailure = (error) => {
    return {
        type: types.CHANGE_COVER_PHOTO_FAILURE,
        payload: error,
    };
};

export function RegisterUser(
    credentials,
    history,
    setFieldError,
    setSubmitting
) {
    return (dispatch) => {
        const promise = apiRequest('POST', `auth/v1/create-user`, credentials);
        dispatch(registerUserRequest());
        promise.then(
            function (payload) {
                const { data } = payload;
                if (data.status === 'Failed') {
                    const { message } = data;
                    if (message.includes('email')) {
                        setFieldError('email', message);
                    }
                    // complete submittiion
                    setSubmitting(false);
                } else if (data.status === 'success') {
                    dispatch(registerUserSuccess(data));
                    history.push('/registration_success');
                }
            },
            function (error) {
                const errorMsg = error;
                dispatch(registerUserFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function LoginUser(credentials, history, setFieldError, setSubmitting) {
    return (dispatch) => {
        const promise = apiRequest('POST', `auth/v1/signin`, credentials);
        dispatch(loginUserRequest());
        promise.then(
            function (payload) {
                const { data } = payload;

                if (data.status === 'Failed') {
                    const { message } = data;
                    if (message.includes('email')) {
                        setFieldError('email', message);
                    }
                    if (message.includes('password')) {
                        setFieldError('password', message);
                    }
                } else if (data.status === 'success') {
                    const userData = data;
                    const token = userData.data.token;
                    localStorage.setItem('token', token);
                    dispatch(loginUserSuccess(data));
                    history.push('/dashboard');
                }
                setSubmitting(false);
            },
            function (error) {
                const errorMsg = error;
                toast.error(
                    'An error occured, please check your network and try again',
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
                dispatch(loginUserFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function getUserDetails() {
    return (dispatch) => {
        const promise = apiRequest('GET', `auth/v1/auth`);
        dispatch(userDetailsRequest());
        promise.then(
            function (payload) {
                const userData = payload.data;
                dispatch(userDetailsSuccess(userData?.data));
            },
            function (error) {
                const errorMsg = error;
                dispatch(getUserDetailsFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function ChangeUserPassword(credentials, history) {
    return (dispatch) => {
        const promise = apiRequest(
            'PATCH',
            `auth/v1/change_password`,
            credentials
        );
        dispatch(changePasswordRequest());
        promise.then(
            function (payload) {
                const { data } = payload;
                if (data.status === 'Failed') {
                    dispatch(changePasswordFailure(data));
                    toast.error('Wrong Password!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    history.push('profile');
                } else if (data.status === 'success') {
                    toast.success('Successful', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(changePasswordSuccess(data));
                    history.push('/change_password_success');
                }
            },
            function (error) {
                dispatch(changePasswordFailure(error));
            }
        );
        return promise;
    };
}

export const UploadProfilePhoto = (formData) => {
    return async (dispatch) => {
        const promise = apiRequest('PATCH', `auth/v1/upload_pix`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
        });
        dispatch(changeProfilePictureRequest());
        promise
            .then((payload) => {
                const { data } = payload;
                dispatch(getUserDetails());
                dispatch(changeProfilePictureSuccess(data));
            })
            .catch((error) => {
                toast.error(`An Error occured ${error}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(changeProfilePictureFailure(error));
            });
        return promise;
    };
};

export const UploadCoverPhoto = (formData) => {
    return async (dispatch) => {
        const promise = apiRequest('PATCH', `auth/v1/cover_photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
        });
        dispatch(changeCoverPhotoRequest());
        promise
            .then((payload) => {
                const { data } = payload;
                dispatch(getUserDetails());
                dispatch(changeCoverPhotoSuccess(data));
            })
            .catch((error) => {
                toast.error(`An Error occured ${error}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(changeCoverPhotoFailure(error));
            });
        return promise;
    };
};

export const LogoutUser = (history) => {
    return () => {
        localStorage.removeItem('token');

        history.push('/sign_in');
    };
};
