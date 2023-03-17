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

export const likeGifSuccess = (indexNumber, likedGif) => {
    return {
        type: types.LIKE_GIF_SUCCESS,
        payload: { indexNumber, likedGif },
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

export const getSingleGifSuccess = (gifs, comments) => {
    return {
        type: types.GET_SINGLE_GIF_SUCCESS,
        payload: { gifs, comments },
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

export const PostGifCommentSuccess = (gifs, comments, gifIndex) => {
    return {
        type: types.POST_GIF_COMMENT_SUCCESS,
        payload: { gifs, comments, gifIndex },
    };
};

export const PostGifCommentFailure = (error) => {
    return {
        type: types.POST_GIF_COMMENT_FAILURE,
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

export function LikeGif(id, index) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/gifs/${id}/gif_likes`);
        dispatch(likeGifRequest());
        promise.then(
            function (payload) {
                const likedGif = payload.data.data;
                dispatch(likeGifSuccess(index, likedGif));
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
                const gifs = data.data;
                const comments = data.comments;
                dispatch(getSingleGifSuccess(gifs, comments));
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
export function PostGifComment(data, gifId, index) {
    return (dispatch) => {
        const promise = apiRequest('POST', `v1/gifs/${gifId}/comment`, data);
        dispatch(PostGifCommentRequest());
        promise.then(
            function (payload) {
                const { data } = payload.data;
                const gifs = data.data;
                const comments = data.comment;
                toast.success(`Successful`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(PostGifCommentSuccess(gifs, comments, index));
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
