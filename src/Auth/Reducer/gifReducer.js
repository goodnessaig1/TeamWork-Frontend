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
    GetUserGif: {
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
let gif;
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
            gif = action.payload;
            const comments = [...state.gifData.comments];
            return Object.assign({}, state, {
                LikeGif: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                ...state,
                gifData: {
                    gifs: gif,
                    comments: comments,
                },
            });

        case types.LIKE_GIF_FAILURE:
            return Object.assign({}, state, {
                LikeGif: {
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
                    gifs: action.payload.data,
                    comments: action.payload.comments,
                },
            });
        case types.GET_USER_GIF_SUCCESS:
            return Object.assign({}, state, {
                GetUserGif: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                gifData: {
                    gifs: action.payload.data,
                    comments: action.payload.comments,
                },
            });
        case types.GET_SINGLE_GIF_FAILURE:
            return Object.assign({}, state, {
                GetSingleGif: {
                    requesting: false,
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
                    gifs: action.payload.data,
                    comments: [
                        ...state.gifData.comments,
                        action.payload.comment,
                    ],
                },
            });
        case types.USER_GIF_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                PostGifComment: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                gifData: {
                    ...state,
                    gifs: action.payload.data,
                    comments: [
                        ...state.gifData.comments,
                        action.payload.comment,
                    ],
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

        case types.DELETE_GIF_REQUEST:
            return Object.assign({}, state, {
                DeleteGif: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.DELETE_GIF_SUCCESS:
            return Object.assign({}, state, {
                DeleteGif: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                gifData: {
                    gifs: action.payload.message,
                },
            });
        case types.DELETE_GIF_FAILURE:
            return Object.assign({}, state, {
                DeleteGif: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
