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
export const getColorsRequest = () => {
    return {
        type: types.GET_COLORS_REQUEST,
    };
};

export const getColorsSuccess = (success) => {
    return {
        type: types.GET_COLORS_SUCCESS,
        payload: success,
    };
};

export const getColorsFailure = (error) => {
    return {
        type: types.GET_COLORS_FAILURE,
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

export const likeArticlesRequest = (request) => {
    return {
        type: types.LIKE_ARTICLES_REQUEST,
        payload: request,
    };
};

export const likeArticlesSuccess = (success) => {
    return {
        type: types.LIKE_ARTICLES_SUCCESS,
        payload: success,
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

export const getSingleArticleSuccess = (success) => {
    return {
        type: types.GET_SINGLE_ARTICLE_SUCCESS,
        payload: success,
    };
};

export const PostArticleCommentRequest = () => {
    return {
        type: types.POST_ARTICLE_COMMENT_REQUEST,
    };
};

export const PostArticleCommentSuccess = (success) => {
    return {
        type: types.POST_ARTICLE_COMMENT_SUCCESS,
        payload: success,
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

export const UpdateArticleRequest = () => {
    return {
        type: types.UPDATE_ARTICLE_REQUEST,
    };
};

export const UpdateArticleSuccess = (success) => {
    return {
        type: types.UPDATE_ARTICLE_SUCCESS,
        payload: success,
    };
};

export const UpdateArticleFailure = (error) => {
    return {
        type: types.UPDATE_ARTICLE_FAILURE,
        payload: error,
    };
};

export const DeleteArticleRequest = () => {
    return {
        type: types.DELETE_ARTICLE_REQUEST,
    };
};

export const DeleteArticleSuccess = (success) => {
    return {
        type: types.DELETE_ARTICLE_SUCCESS,
        payload: success,
    };
};

export const DeleteArticleFailure = (error) => {
    return {
        type: types.DELETE_ARTICLE_FAILURE,
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
export function getColors() {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/colors`);
        dispatch(getColorsRequest());
        promise.then(
            function (payload) {
                const colors = payload.data;
                dispatch(getColorsSuccess(colors?.data));
            },
            function (error) {
                const errorMsg = error;
                dispatch(getColorsFailure(errorMsg));
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

export function LikeArticles(id) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/articles/${id}/like`);
        dispatch(likeArticlesRequest(id));
        promise.then(
            function (payload) {
                const likedArticle = payload.data.data;
                dispatch(likeArticlesSuccess(likedArticle));
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
                const articleData = data;
                dispatch(getSingleArticleSuccess(articleData));
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

export function PostArticleComment(data, id) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/articles/${id}/comment`, data);
        dispatch(PostArticleCommentRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const articleData = data;
                toast.success(`Successful`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostArticleCommentSuccess(articleData));
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

export function UpdateArticle(data, id) {
    return (dispatch) => {
        const promise = apiRequest('PATCH', `v1/articles/${id}`, data);
        dispatch(UpdateArticleRequest());
        promise.then(
            function (payload) {
                const { data } = payload?.data;
                const UpdatedArticle = data?.data;
                dispatch(UpdateArticleSuccess(UpdatedArticle));
            },
            function (error) {
                const errorMsg = error;
                toast.error('An error occured, try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(UpdateArticleFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function DeleteArticle(id) {
    return (dispatch) => {
        const promise = apiRequest('DELETE', `v1/articles/${id}`);
        dispatch(DeleteArticleRequest());
        promise.then(
            function (payload) {
                dispatch(DeleteArticleSuccess(id));
            },
            function (error) {
                const errorMsg = error;
                if ((errorMsg = 404)) {
                    toast.error('Not found', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                dispatch(DeleteArticleFailure(errorMsg));
            }
        );
        return promise;
    };
}
