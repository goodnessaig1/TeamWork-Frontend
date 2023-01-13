import { apiRequest } from '../../Utils/axios';
import { toast } from 'react-toastify';

import { GET_ALL_FEEDS_SUCCESS, GET_ALL_FEEDS_FAILURE } from './types';

export const getAllFeeds = request => {
    return {
        type: GET_ALL_FEEDS_SUCCESS,
        payload: request,
    };
};

export const getAllFeedsFailure = error => {
    return {
        type: GET_ALL_FEEDS_FAILURE,
        payload: error,
    };
};

export function getFeedDetails(offset, setIsLoading) {
    return dispatch => {
        setIsLoading(true);
        const promise = apiRequest('GET', `v1/feeds?limit=4&offset=${offset}`);
        promise.then(
            function (payload) {
                const feedsData = payload.data;
                if (feedsData.status === 'Failed') {
                    toast.error('An error occured!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (feedsData.status === 'Success') {
                    dispatch(getAllFeeds(feedsData?.data));
                    setIsLoading(false);
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
