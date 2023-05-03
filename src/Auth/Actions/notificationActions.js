import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import * as types from './types';

export const getAllNotificationsRequest = () => {
    return {
        type: types.GET_ALL_NOTIFICATIONS_REQUEST,
    };
};

export const getAllNotificationsSuccess = (request) => {
    return {
        type: types.GET_ALL_NOTIFICATIONS_SUCCESS,
        payload: request,
    };
};

export const getAllNotificationsFailure = (error) => {
    return {
        type: types.GET_ALL_NOTIFICATIONS_FAILURE,
        payload: error,
    };
};
export const readArticleNotificationRequest = () => {
    return {
        type: types.READ_ARTICLE_NOTIFICATION_REQUEST,
    };
};

export const readArticleNotificationSuccess = (request) => {
    return {
        type: types.READ_ARTICLE_NOTIFICATION_SUCCESS,
        payload: request,
    };
};

export const readArticleNotificationFailure = (error) => {
    return {
        type: types.READ_ARTICLE_NOTIFICATION_FAILURE,
        payload: error,
    };
};
export const readGifNotificationRequest = () => {
    return {
        type: types.READ_GIF_NOTIFICATION_REQUEST,
    };
};

export const readGifNotificationSuccess = (request) => {
    return {
        type: types.READ_GIF_NOTIFICATION_SUCCESS,
        payload: request,
    };
};

export const readGifNotificationFailure = (error) => {
    return {
        type: types.READ_GIF_NOTIFICATION_FAILURE,
        payload: error,
    };
};

export function getNotifications() {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/notifications`);
        dispatch(getAllNotificationsRequest());
        promise.then(
            function (payload) {
                const notificationData = payload.data;
                if (notificationData.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (notificationData.status === 'Success') {
                    dispatch(getAllNotificationsSuccess(notificationData));
                }
            },
            function (error) {
                const errorMsg = error;
                dispatch(getAllNotificationsFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function ReadArticleNotification(id) {
    return (dispatch) => {
        const promise = apiRequest('PATCH', `v1/notifications/articles/${id}`);
        dispatch(readArticleNotificationRequest());
        promise.then(
            function (payload) {
                const { data } = payload;
                const notificationData = data;
                dispatch(readArticleNotificationSuccess(notificationData));
            },
            function (error) {
                const errorMsg = error;
                toast.error('An error occured, try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(readArticleNotificationFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function ReadGifNotification(id) {
    return (dispatch) => {
        const promise = apiRequest('PATCH', `v1/notifications/gifs/${id}`);
        dispatch(readGifNotificationRequest());
        promise.then(
            function (payload) {
                const { data } = payload;
                const notificationData = data;
                dispatch(readGifNotificationSuccess(notificationData));
            },
            function (error) {
                const errorMsg = error;
                toast.error('An error occured, try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(readGifNotificationFailure(errorMsg));
            }
        );
        return promise;
    };
}
