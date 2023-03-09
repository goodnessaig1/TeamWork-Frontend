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
