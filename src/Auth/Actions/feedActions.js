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

export function getFeedDetails(offset) {
    return (dispatch) => {
        const promise = apiRequest('GET', `v1/feeds?limit=5&offset=${offset}`);
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
