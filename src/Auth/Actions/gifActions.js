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

export const likeGifRequest = () => {
    return {
        type: types.LIKE_GIF_REQUEST,
    };
};

export const likeGifSuccess = (success) => {
    return {
        type: types.LIKE_GIF_SUCCESS,
        payload: success,
    };
};

export const likeGifFailure = (error) => {
    return {
        type: types.LIKE_GIF_FAILURE,
        payload: error,
    };
};

export const getSingleGifRequest = () => {
    return {
        type: types.GET_SINGLE_GIF_REQUEST,
    };
};

export const getSingleGifSuccess = (success) => {
    return {
        type: types.GET_SINGLE_GIF_SUCCESS,
        payload: success,
    };
};

export const getSingleGifFailure = (error) => {
    return {
        type: types.GET_SINGLE_GIF_FAILURE,
        payload: error,
    };
};

export const PostGifCommentRequest = () => {
    return {
        type: types.POST_GIF_COMMENT_REQUEST,
    };
};

export const PostGifCommentSuccess = (success) => {
    return {
        type: types.POST_GIF_COMMENT_SUCCESS,
        payload: success,
    };
};

export const PostGifCommentFailure = (error) => {
    return {
        type: types.POST_GIF_COMMENT_FAILURE,
        payload: error,
    };
};

export const DeleteGifRequest = () => {
    return {
        type: types.DELETE_GIF_REQUEST,
    };
};

export const DeleteGifSuccess = (message, gifId) => {
    return {
        type: types.DELETE_GIF_SUCCESS,
        payload: { message, gifId },
    };
};

export const DeleteGifFailure = (error) => {
    return {
        type: types.DELETE_GIF_FAILURE,
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

export function LikeGif(id) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/gifs/${id}/gif_likes`);
        dispatch(likeGifRequest());
        promise.then(
            function (payload) {
                const likedGif = payload.data.data;
                dispatch(likeGifSuccess(likedGif));
            },
            function (error) {
                const errorMsg = error;
                dispatch(likeGifFailure(errorMsg));
            }
        );
        return promise;
    };
}
export function GetSingleGif(id) {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/gifs/${id}`);
        dispatch(getSingleGifRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const gifData = data;
                dispatch(getSingleGifSuccess(gifData));
            },
            function (error) {
                const errorMsg = error;
                if ((error = 400)) {
                    toast.error('Network error or Token is expired', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                dispatch(getSingleGifFailure(errorMsg));
            }
        );
        return promise;
    };
}
export function PostGifComment(data, gifId) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/gifs/${gifId}/comment`, data);
        dispatch(PostGifCommentRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const gifData = data;
                toast.success(`Successful`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostGifCommentSuccess(gifData));
            },
            function (error) {
                const errorMsg = error;
                toast.error(`An Error occured ${errorMsg}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostGifCommentFailure(errorMsg));
            }
        );
        return promise;
    };
}

export function DeleteGif(id) {
    return (dispatch) => {
        const promise = apiRequest('DELETE', `v1/gifs/${id}`);
        dispatch(DeleteGifRequest());
        promise.then(
            function (payload) {
                const message = payload.data.data;
                const gifId = id;
                dispatch(DeleteGifSuccess(message, gifId));
            },
            function (error) {
                const errorMsg = error;
                if ((errorMsg = 404)) {
                    toast.error('Not found', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                dispatch(DeleteGifFailure(errorMsg));
            }
        );
        return promise;
    };
}
