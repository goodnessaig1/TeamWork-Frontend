import * as types from '../Actions/types';

const initialState = {
    getFeedDetails: {
        requesting: false,
        error: null,
        success: false,
    },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_FEEDS_REQUEST:
            return Object.assign({}, state, {
                getFeedDetails: {
                    requesting: false,
                    error: null,
                    success: true,
                },
            });
        case types.GET_ALL_FEEDS_SUCCESS:
            return Object.assign({}, state, {
                getFeedDetails: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                allFeeds: action.payload,
            });
        case types.GET_ALL_FEEDS_FAILURE:
            return Object.assign({}, state, {
                getFeedDetails: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
