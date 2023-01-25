import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import * as types from './types';
import { getFeedDetails } from './feedActions';

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
                if (categories.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (categories.status === 'Success') {
                    dispatch(getCategorySuccess(categories?.data));
                }
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
                if (article.status === 'Failed') {
                    article('Failed', article);
                } else if (article.status === 'success') {
                    dispatch(PostArticlesSuccess(article));
                    dispatch(getFeedDetails(0));
                }
            },
            function (error) {
                const errorMsg = error;
                dispatch(PostArticlesFailure(errorMsg));
            }
        );
        return promise;
    };
}
