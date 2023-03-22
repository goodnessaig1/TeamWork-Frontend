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
let updatedFeeds;
let article;
let gif;
let index;
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
            article = action.payload;
            index = state.allFeeds.findIndex(
                (item) => item.postid === article.postid
            );
            updatedFeeds = [...state.allFeeds];
            updatedFeeds[index] = article;
            return Object.assign({}, state, {
                ...state,
                allFeeds: updatedFeeds,
            });

        case types.LIKE_GIF_SUCCESS:
            gif = action.payload;
            index = state.allFeeds.findIndex(
                (item) => item.postid === gif.postid
            );
            updatedFeeds = [...state.allFeeds];
            updatedFeeds[index] = gif;
            return Object.assign({}, state, {
                ...state,
                allFeeds: updatedFeeds,
            });

        case types.POST_GIF_COMMENT_SUCCESS:
            gif = action.payload.data;
            index = state.allFeeds.findIndex(
                (item) => item.postid === gif.postid
            );
            updatedFeeds = [...state.allFeeds];
            updatedFeeds[index] = gif;
            return Object.assign({}, state, {
                ...state,
                allFeeds: updatedFeeds,
            });

        case types.POST_ARTICLE_COMMENT_SUCCESS:
            article = action.payload.data;
            index = state.allFeeds.findIndex(
                (item) => item.postid === article.postid
            );
            updatedFeeds = [...state.allFeeds];
            updatedFeeds[index] = article;
            return Object.assign({}, state, {
                ...state,
                allFeeds: updatedFeeds,
            });

        default:
            return state;
    }
}
