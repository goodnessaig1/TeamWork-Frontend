import {
    GET_ALL_FEEDS_SUCCESS,
    GET_ALL_FEEDS_REQUEST,
    GET_ALL_FEEDS_FAILURE,
} from '../Actions/types';

// eslint-disable-next-line
export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_FEEDS_REQUEST:
            return { ...state, feedsRequest: action.payload };
        case GET_ALL_FEEDS_SUCCESS:
            return { ...state, allFeeds: action.payload };
        case GET_ALL_FEEDS_FAILURE:
            return { ...state, Failled: action.payload };

        default:
            return state;
    }
}
