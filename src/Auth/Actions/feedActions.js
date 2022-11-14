import { apiRequest } from '../../Utils/axios';

import {
    GET_ALL_FEEDS_SUCCESS,
    GET_ALL_FEEDS_FAILURE,
} from './types';

export const getAllFeeds = request => {
    return {
        type: GET_ALL_FEEDS_SUCCESS,
        payload: request
    }
}

export const getAllFeedsFailure = error => {
    return {
        type: GET_ALL_FEEDS_FAILURE,
        payload: error
    }
}



export function getFeedDetails() {
    return dispatch => {
        const promise = apiRequest('GET',`v1/feeds`);
        promise.then(
            function (payload) {
                const  userData  = payload.data;
                dispatch(getAllFeeds(userData?.data));
            },
            function (error) {
                const errorMsg = error
                dispatch(getAllFeedsFailure(errorMsg))
            }
        );
        return promise;
    };
}