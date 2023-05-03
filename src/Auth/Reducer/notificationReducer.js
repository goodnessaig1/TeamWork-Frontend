import * as types from '../Actions/types';

const initialState = {
    getNotifications: {
        requesting: false,
        error: null,
        success: false,
    },
    ReadArticleNotification: {
        requesting: false,
        error: null,
        success: false,
    },
    ReadGifNotification: {
        requesting: false,
        error: null,
        success: false,
    },
    notifications: {
        notifications: [],
        totalUnread: [],
        total: [],
    },
};
let updatedNotifications;
let post;
let index;
export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_NOTIFICATIONS_REQUEST:
            return Object.assign({}, state, {
                getNotifications: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.GET_ALL_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                getNotifications: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                notifications: {
                    notifications: action.payload.data,
                    totalUnread: action.payload.totalUnread,
                    total: action.payload.total,
                },
            });

        case types.GET_ALL_NOTIFICATIONS_FAILURE:
            return Object.assign({}, state, {
                getNotifications: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.READ_ARTICLE_NOTIFICATION_REQUEST:
            return Object.assign({}, state, {
                ReadArticleNotification: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.READ_ARTICLE_NOTIFICATION_SUCCESS:
            post = action.payload.data;
            index = state.notifications?.notifications.findIndex(
                (item) => item.id === post.id
            );
            updatedNotifications = [...state.notifications.notifications];
            updatedNotifications[index] = post;
            return Object.assign({}, state, {
                ReadArticleNotification: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                notifications: {
                    ...state,
                    notifications: updatedNotifications,
                    totalUnread: action.payload.totalUnread,
                    total: action.payload.total,
                },
            });

        case types.READ_ARTICLE_NOTIFICATION_FAILURE:
            return Object.assign({}, state, {
                ReadArticleNotification: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.READ_GIF_NOTIFICATION_REQUEST:
            return Object.assign({}, state, {
                ReadGifNotification: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.READ_GIF_NOTIFICATION_SUCCESS:
            post = action.payload.data;
            index = state.notifications?.notifications.findIndex(
                (item) => item.id === post.id
            );
            updatedNotifications = [...state.notifications.notifications];
            updatedNotifications[index] = post;
            return Object.assign({}, state, {
                ReadGifNotification: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                notifications: {
                    ...state,
                    notifications: updatedNotifications,
                    totalUnread: action.payload.totalUnread,
                    total: action.payload.total,
                },
            });

        case types.READ_GIF_NOTIFICATION_FAILURE:
            return Object.assign({}, state, {
                ReadGifNotification: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
