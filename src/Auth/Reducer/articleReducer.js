import * as types from '../Actions/types';

const initialState = {
    getCategory: {
        requesting: false,
        error: null,
        success: false,
    },
    getColors: {
        requesting: false,
        error: null,
        success: false,
    },
    PostArticles: {
        requesting: false,
        error: null,
        success: false,
    },
    LikeArticles: {
        requesting: false,
        error: null,
        success: false,
    },
    GetSingleArticle: {
        requesting: false,
        error: null,
        success: false,
    },
    PostArticleComment: {
        requesting: false,
        error: null,
        success: false,
    },
    UserArticleComment: {
        requesting: false,
        error: null,
        success: false,
    },
    UpdateArticle: {
        requesting: false,
        error: null,
        success: false,
    },
    UpdateUserArticle: {
        requesting: false,
        error: null,
        success: false,
    },
    DeleteArticle: {
        requesting: false,
        error: null,
        success: false,
    },
    articleData: {
        articles: {},
        comments: [],
    },
};

let article;
let index;
let updatedArticle;
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

        case types.GET_COLORS_REQUEST:
            return Object.assign({}, state, {
                getCategory: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.GET_COLORS_SUCCESS:
            return Object.assign({}, state, {
                getCategory: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                colors: action.payload,
            });

        case types.GET_COLORS_FAILURE:
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

        case types.LIKE_ARTICLES_REQUEST:
            return Object.assign({}, state, {
                LikeArticles: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });
        case types.LIKE_ARTICLES_SUCCESS:
            article = action.payload;
            const comments = [...state.articleData.comments];
            return Object.assign({}, state, {
                LikeArticles: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                ...state,
                articleData: {
                    articles: article,
                    comments: comments,
                },
            });

        case types.LIKE_ARTICLES_FAILURE:
            return Object.assign({}, state, {
                LikeArticles: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.GET_SINGLE_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                GetSingleArticle: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.GET_SINGLE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                GetSingleArticle: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    articles: action.payload.data,
                    comments: action.payload.comments,
                },
            });
        case types.GET_SINGLE_ARTICLE_FAILURE:
            return Object.assign({}, state, {
                GetSingleArticle: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.POST_ARTICLE_COMMENT_REQUEST:
            return Object.assign({}, state, {
                PostArticleComment: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.POST_ARTICLE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                PostArticleComment: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    ...state,
                    articles: action.payload.data,
                    comments: [
                        ...state.articleData.comments,
                        action.payload.comment,
                    ],
                },
            });
        case types.USER_ARTICLE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                UserArticleComment: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    ...state,
                    articles: action.payload.data,
                    comments: [
                        ...state.articleData.comments,
                        action.payload.comment,
                    ],
                },
            });
        case types.POST_ARTICLE_COMMENT_FAILURE:
            return Object.assign({}, state, {
                PostArticleComment: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case types.UPDATE_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                UpdateArticle: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.UPDATE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                UpdateArticle: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    articles: action.payload,
                },
            });
        case types.UPDATE_ARTICLE_FAILURE:
            return Object.assign({}, state, {
                UpdateArticle: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.UPDATE_USER_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                UpdateUserArticle: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.UPDATE_USER_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                UpdateUserArticle: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    articles: action.payload,
                },
            });
        case types.UPDATE_USER_ARTICLE_FAILURE:
            return Object.assign({}, state, {
                UpdateUserArticle: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.DELETE_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                DeleteArticle: {
                    requesting: true,
                    error: false,
                    success: true,
                },
            });

        case types.DELETE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                DeleteArticle: {
                    requesting: false,
                    error: false,
                    success: true,
                },
                articleData: {
                    articles: action.payload,
                },
            });
        case types.DELETE_ARTICLE_FAILURE:
            return Object.assign({}, state, {
                DeleteArticle: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
