import * as types from '../Actions/types';

const initialState = {
    getFeeds: {
        requesting: false,
        error: null,
        success: false,
    },
    getMoreFeeds: {
        requesting: false,
        error: null,
        success: false,
    },

    allFeeds: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_FEEDS_REQUEST:
            return Object.assign({}, state, {
                getFeeds: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.GET_ALL_FEEDS_SUCCESS:
            return Object.assign({}, state, {
                getFeeds: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                allFeeds: action.payload,
            });
        case types.GET_MORE_FEEDS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                allFeeds: state.allFeeds.concat(action.payload),
            });

        case types.GET_ALL_FEEDS_FAILURE:
            return Object.assign({}, state, {
                getFeeds: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.GET_FEEDS_TOTAL:
            return Object.assign({}, state, {
                total: action.payload,
            });

        case types.POST_ARTICLES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                allFeeds: [action.payload, ...state.allFeeds],
            });

        case types.POST_GIF_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                allFeeds: [action.payload, ...state.allFeeds],
            });

        case types.LIKE_ARTICLES_SUCCESS:
            const { index, likedArticle } = action.payload;
            let newArray = [...state.allFeeds];
            newArray[index] = likedArticle;
            return Object.assign({}, state, {
                ...state,
                allFeeds: newArray,
            });

        case types.LIKE_GIF_SUCCESS:
            const { indexNumber, likedGif } = action.payload;
            let newFeeds = [...state.allFeeds];
            newFeeds[indexNumber] = likedGif;
            return Object.assign({}, state, {
                ...state,
                allFeeds: newFeeds,
            });

        case types.POST_GIF_COMMENT_SUCCESS:
            const { gifs } = action.payload;
            return Object.assign({}, state, {
                ...state,
                allFeeds: [gifs, ...state.allFeeds],
            });

        case types.POST_ARTICLE_COMMENT_SUCCESS:
            const { article } = action.payload;
            return Object.assign({}, state, {
                ...state,
                allFeeds: [article, ...state.allFeeds],
            });

        default:
            return state;
    }
}
