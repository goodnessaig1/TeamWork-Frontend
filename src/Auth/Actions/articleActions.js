import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';
import * as types from './types';

export const getCategoryRequest = () => {
    return {
        type: types.GET_CATEGORIES_REQUEST,
    };
};

export const getCategorySuccess = (success) => {
    return {
        type: types.GET_CATEGORIES_SUCCESS,
        payload: success,
    };
};

export const getCategoryFailure = (error) => {
    return {
        type: types.GET_CATEGORIES_FAILURE,
        payload: error,
    };
};
export const PostArticlesRequest = () => {
    return {
        type: types.POST_ARTICLES_REQUEST,
    };
};

export const PostArticlesSuccess = (success) => {
    return {
        type: types.POST_ARTICLES_SUCCESS,
        payload: success,
    };
};

export const PostArticlesFailure = (error) => {
    return {
        type: types.POST_ARTICLES_FAILURE,
        payload: error,
    };
};

export const likeArticlesRequest = () => {
    return {
        type: types.LIKE_ARTICLES_REQUEST,
    };
};

export const likeArticlesSuccess = (index, likedArticle) => {
    return {
        type: types.LIKE_ARTICLES_SUCCESS,
        payload: { index, likedArticle },
    };
};

export const likeArticlesFailure = (error) => {
    return {
        type: types.LIKE_ARTICLES_FAILURE,
        payload: error,
    };
};

export const getSingleArticleRequest = () => {
    return {
        type: types.GET_SINGLE_ARTICLE_REQUEST,
    };
};

export const getSingleArticleSuccess = (article, comments) => {
    return {
        type: types.GET_SINGLE_ARTICLE_SUCCESS,
        payload: { article, comments },
    };
};

export const PostArticleCommentRequest = () => {
    return {
        type: types.POST_ARTICLE_COMMENT_REQUEST,
    };
};

export const PostArticleCommentSuccess = (article, comments, articleIndex) => {
    return {
        type: types.POST_ARTICLE_COMMENT_SUCCESS,
        payload: { article, comments, articleIndex },
    };
};

export const PostArticleCommentFailure = (error) => {
    return {
        type: types.POST_ARTICLE_COMMENT_FAILURE,
        payload: error,
    };
};
export const getSingleArticleFailure = (error) => {
    return {
        type: types.GET_SINGLE_ARTICLE_FAILURE,
        payload: error,
    };
};
export function getCategory() {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/categories`);
        dispatch(getCategoryRequest());
        promise.then(
            function (payload) {
                const categories = payload.data;
                dispatch(getCategorySuccess(categories?.data));
            },
            function (error) {
                const errorMsg = error;
                dispatch(getCategoryFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function PostArticles(credentials) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/articles`, credentials);
        dispatch(PostArticlesRequest());
        promise.then(
            function (payload) {
                const article = payload.data;
                dispatch(PostArticlesSuccess(article.data));
            },
            function (error) {
                const errorMsg = error;
                if ((error = 417)) {
                    toast.error('Please Add a category', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                dispatch(PostArticlesFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function LikeArticles(id, index) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/articles/${id}/like`);
        dispatch(likeArticlesRequest());
        promise.then(
            function (payload) {
                const likedArticle = payload.data.data;
                dispatch(likeArticlesSuccess(index, likedArticle));
            },
            function (error) {
                const errorMsg = error;
                dispatch(likeArticlesFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function GetSingleArticle(id) {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/articles/${id}`);
        dispatch(getSingleArticleRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const article = data.data;
                const comments = data.comments;
                dispatch(getSingleArticleSuccess(article, comments));
            },
            function (error) {
                const errorMsg = error;
                if ((error = 400)) {
                    toast.error('Network error or Token is expired', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                dispatch(getSingleArticleFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function PostArticleComment(data, id, index) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/articles/${id}/comment`, data);
        dispatch(PostArticleCommentRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const article = data.data;
                const comments = data.comment;
                toast.success(`Successful`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostArticleCommentSuccess(article, comments, index));
            },
            function (error) {
                const errorMsg = error;
                toast.error(`An Error occured ${errorMsg}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostArticleCommentFailure(errorMsg));
            }
        );
        return promise;
    };
}
