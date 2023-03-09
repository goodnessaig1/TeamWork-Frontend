import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import * as types from './types';

export const PostGifRequest = () => {
    return {
        type: types.POST_GIF_REQUEST,
    };
};

export const PostGifSuccess = (success) => {
    return {
        type: types.POST_GIF_SUCCESS,
        payload: success,
    };
};

export const PostGifFailure = (error) => {
    return {
        type: types.POST_GIF_FAILURE,
        payload: error,
    };
};

export const PostGif = (formData) => {
    return async (dispatch) => {
        const promise = apiRequest('POST', `v1/gifs`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
        });
        dispatch(PostGifRequest());
        promise
            .then((payload) => {
                const { data } = payload;
                dispatch(PostGifSuccess(data.data));
            })
            .catch((error) => {
                toast.error(`An Error occured ${error}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostGifFailure(error));
            });
        return promise;
    };
};
