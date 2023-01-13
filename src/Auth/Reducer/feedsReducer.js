import { GET_ALL_FEEDS_SUCCESS } from '../Actions/types';

// eslint-disable-next-line
export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_FEEDS_SUCCESS:
            return { ...state, allFeeds: action.payload };

        default:
            return state;
    }
}
