import * as types from '../Actions/types';

const initialState = {
    PostGif: {
        requesting: false,
        error: null,
        success: false,
    },
    LikeGif: {
        requesting: false,
        error: null,
        success: false,
    },
    GetSingleGif: {
        requesting: false,
        error: null,
        success: false,
    },
    PostGifComment: {
        requesting: false,
        error: null,
        success: false,
    },
    gifData: {
        gifs: {},
        comments: [],
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

        case types.LIKE_GIF_REQUEST:
            return Object.assign({}, state, {
                LikeGif: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.LIKE_GIF_SUCCESS:
            return Object.assign({}, state, {
                PostGif: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                like: action.payload,
            });

        case types.LIKE_GIF_FAILURE:
            return Object.assign({}, state, {
                PostGif: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });
        case types.GET_SINGLE_GIF_REQUEST:
            return Object.assign({}, state, {
                GetSingleGif: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });
        case types.GET_SINGLE_GIF_SUCCESS:
            return Object.assign({}, state, {
                GetSingleGif: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                gifData: {
                    gifs: action.payload.gifs,
                    comments: action.payload.comments,
                },
            });
        case types.GET_SINGLE_GIF_FAILURE:
            return Object.assign({}, state, {
                GetSingleGif: {
                    requesting: true,
                    error: action.payload,
                    success: true,
                },
            });

        case types.POST_GIF_COMMENT_REQUEST:
            return Object.assign({}, state, {
                PostGifComment: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.POST_GIF_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                PostGifComment: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                gifData: {
                    ...state,
                    gifs: action.payload.gifs,
                    comments: state.gifData.comments.concat(
                        action.payload.comments
                    ),
                },
            });
        case types.POST_GIF_COMMENT_FAILURE:
            return Object.assign({}, state, {
                PostGifComment: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        default:
            return state;
    }
}
