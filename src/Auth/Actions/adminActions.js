import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';
import * as types from './types';

export const getUsersRequest = (request) => {
    return {
        type: types.GET_USERS_REQUEST,
        payload: request,
    };
};
export const getUsersSuccess = (success) => {
    return {
        type: types.GET_USERS_SUCCESS,
        payload: success,
    };
};
export const getUsersFailure = (error) => {
    return {
        type: types.GET_USERS_FAILURE,
        payload: error,
    };
};

export const addCategoryRequest = () => {
    return {
        type: types.ADD_CATEGORY_REQUEST,
    };
};

export const addCategorySuccess = (success) => {
    return {
        type: types.ADD_CATEGORY_SUCCESS,
        payload: success,
    };
};

export const addCategoryFailure = (error) => {
    return {
        type: types.ADD_CATEGORY_FAILURE,
        payload: error,
    };
};

export const addColorRequest = () => {
    return {
        type: types.ADD_COLOR_REQUEST,
    };
};

export const addColorSuccess = (success) => {
    return {
        type: types.ADD_COLOR_SUCCESS,
        payload: success,
    };
};

export const addColorFailure = (error) => {
    return {
        type: types.ADD_COLOR_FAILURE,
        payload: error,
    };
};
export const deleteUserRequest = (userId) => {
    return {
        type: types.DELETE_USER_REQUEST,
        payload: userId,
    };
};

export const deleteUserSuccess = (success) => {
    return {
        type: types.DELETE_USER_SUCCESS,
        payload: success,
    };
};

export const deleteUserFailure = (error) => {
    return {
        type: types.DELETE_USER_FAILURE,
        payload: error,
    };
};
export const createAdminRequest = (userId) => {
    return {
        type: types.CREATE_ADMIN_REQUEST,
        payload: userId,
    };
};

export const createAdminSuccess = (success) => {
    return {
        type: types.CREATE_ADMIN_SUCCESS,
        payload: success,
    };
};

export const createAdminFailure = (error) => {
    return {
        type: types.CREATE_ADMIN_FAILURE,
        payload: error,
    };
};

export const disableAdminRequest = (userId) => {
    return {
        type: types.DISABLE_ADMIN_REQUEST,
        payload: userId,
    };
};

export const disableAdminSuccess = (success) => {
    return {
        type: types.DISABLE_ADMIN_SUCCESS,
        payload: success,
    };
};

export const disableAdminFailure = (error) => {
    return {
        type: types.DISABLE_ADMIN_FAILURE,
        payload: error,
    };
};

export function getUsers() {
    return (dispatch) => {
        const promise = apiRequest('GET', `auth/v1/users`);
        dispatch(getUsersRequest());
        promise.then(
            function (payload) {
                const userData = payload.data;
                dispatch(getUsersSuccess(userData?.data));
            },
            function (error) {
                const errorMsg = error;
                dispatch(getUsersFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function AddCategory(credentials) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/categories`, credentials);
        dispatch(addCategoryRequest());
        promise.then(
            function (payload) {
                const category = payload.data;
                dispatch(addCategorySuccess(category.data));
            },
            function (error) {
                const errorMsg = error;
                toast.error('Please try again', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(addCategoryFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function AddColor(credentials) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/colors`, credentials);
        dispatch(addColorRequest());
        promise.then(
            function (payload) {
                const color = payload.data;
                dispatch(addColorSuccess(color.data));
            },
            function (error) {
                const errorMsg = error;
                toast.error('Please try again', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(addColorFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function DeleteUser(userId) {
    return (dispatch) => {
        const promise = apiRequest('DELETE', `auth/v1/delete_user/${userId}`);
        dispatch(deleteUserRequest(userId));
        promise.then(
            function (payload) {
                const deleteUser = payload.data;
                dispatch(deleteUserSuccess(deleteUser));
            },
            function (error) {
                dispatch(deleteUserFailure(error.message));
                toast.error('An error occured', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        );
    };
}

export function CreateAdmin(userId) {
    return (dispatch) => {
        const promise = apiRequest('PATCH', `auth/v1/make_admin/${userId}`);
        dispatch(createAdminRequest(userId));
        promise.then(
            function (payload) {
                const newAdmin = payload.data;
                dispatch(createAdminSuccess(newAdmin));
            },
            function (error) {
                dispatch(createAdminFailure(error.message));
                toast.error('An error occured', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        );
    };
}

export function DisableAdmin(userId) {
    return (dispatch) => {
        const promise = apiRequest('PATCH', `auth/v1/disable_admin/${userId}`);
        dispatch(disableAdminRequest(userId));
        promise.then(
            function (payload) {
                const disabledAdmin = payload.data;
                dispatch(disableAdminSuccess(disabledAdmin));
            },
            function (error) {
                dispatch(disableAdminFailure(error.message));
                toast.error('An error occured', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        );
    };
}
