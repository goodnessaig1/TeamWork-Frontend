import * as types from '../Actions/types';

const initialState = {
    PostGif: {
        requesting: false,
        error: null,
        success: false,
    },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_GIF_REQUEST:
            return Object.assign({}, state, {
                PostGif: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.POST_GIF_SUCCESS:
            return Object.assign({}, state, {
                PostGif: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                gif: action.payload,
            });

        case types.POST_GIF_FAILURE:
            return Object.assign({}, state, {
                PostGif: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
