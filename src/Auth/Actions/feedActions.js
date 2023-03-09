import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import * as types from './types';

export const getAllFeedsRequest = () => {
    return {
        type: types.GET_ALL_FEEDS_REQUEST,
    };
};

export const getAllFeedsSuccess = (request) => {
    return {
        type: types.GET_ALL_FEEDS_SUCCESS,
        payload: request,
    };
};

export const getAllFeedsFailure = (error) => {
    return {
        type: types.GET_ALL_FEEDS_FAILURE,
        payload: error,
    };
};

export const getMoreFeedsRequest = () => {
    return {
        type: types.GET_MORE_FEEDS_REQUEST,
    };
};

export const getMoreFeedsSuccess = (request) => {
    return {
        type: types.GET_MORE_FEEDS_SUCCESS,
        payload: request,
    };
};
export const getMoreFeedsFailure = (error) => {
    return {
        type: types.GET_MORE_FEEDS_FAILURE,
        payload: error,
    };
};
export const getFeedsTotal = (request) => {
    return {
        type: types.GET_FEEDS_TOTAL,
        payload: request,
    };
};
export function getFeeds(offSet) {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/feeds?limit=10&offset=${offSet}`);
        dispatch(getAllFeedsRequest());
        promise.then(
            function (payload) {
                const feedsData = payload.data;
                if (feedsData.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (feedsData.status === 'Success') {
                    dispatch(getAllFeedsSuccess(feedsData?.data));
                    dispatch(getFeedsTotal(feedsData.total));
                }
            },
            function (error) {
                const errorMsg = error;
                dispatch(getAllFeedsFailure(errorMsg));
            }
        );
        return promise;
    };
}
export function getMoreFeeds(offSet) {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/feeds?limit=10&offset=${offSet}`);
        dispatch(getMoreFeedsRequest());
        promise.then(
            function (payload) {
                const feedsData = payload.data;
                if (feedsData.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (feedsData.status === 'Success') {
                    dispatch(getMoreFeedsSuccess(feedsData?.data));
                    dispatch(getFeedsTotal(feedsData.total));
                }
            },
            function (error) {
                const errorMsg = error;
                dispatch(getMoreFeedsFailure(errorMsg));
            }
        );
        return promise;
    };
}
