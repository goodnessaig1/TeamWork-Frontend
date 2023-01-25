import * as types from '../Actions/types';

const initialState = {
    getCategory: {
        requesting: false,
        error: null,
        success: false,
    },
    PostArticles: {
        requesting: false,
        error: null,
        success: false,
    },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_CATEGORIES_REQUEST:
            return Object.assign({}, state, {
                getCategory: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                getCategory: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                categories: action.payload,
            });

        case types.GET_CATEGORIES_FAILURE:
            return Object.assign({}, state, {
                getCategory: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });
        case types.POST_ARTICLES_REQUEST:
            return Object.assign({}, state, {
                PostArticles: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.POST_ARTICLES_SUCCESS:
            return Object.assign({}, state, {
                PostArticles: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                articles: action.payload,
            });

        case types.POST_ARTICLES_FAILURE:
            return Object.assign({}, state, {
                PostArticles: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
