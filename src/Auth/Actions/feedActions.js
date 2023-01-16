import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import {
    GET_ALL_FEEDS_SUCCESS,
    GET_ALL_FEEDS_FAILURE,
    GET_ALL_FEEDS_REQUEST,
} from './types';

export const getAllFeeds = (request) => {
    return {
        type: GET_ALL_FEEDS_SUCCESS,
        payload: request,
    };
};
export const getAllFeedsRequest = (request) => {
    return {
        type: GET_ALL_FEEDS_REQUEST,
        payload: request,
    };
};

export const getAllFeedsFailure = (error) => {
    return {
        type: GET_ALL_FEEDS_FAILURE,
        payload: error,
    };
};

export function getFeedDetails(offset, setIsLoading) {
    return (dispatch) => {
        setIsLoading(true);
        const promise = apiRequest('GET', `v1/feeds?limit=4&offset=${offset}`);
        dispatch(getAllFeedsRequest());
        promise.then(
            function (payload) {
                const feedsData = payload.data;
                if (feedsData.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setIsLoading(false);
                } else if (feedsData.status === 'Success') {
                    setIsLoading(false);
                    dispatch(getAllFeeds(feedsData?.data));
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
