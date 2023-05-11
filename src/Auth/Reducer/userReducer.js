import * as types from '../Actions/types';

const initialState = {
    RegisterUser: {
        requesting: false,
        error: null,
        success: false,
    },
    LoginUser: {
        requesting: false,
        error: null,
        success: false,
    },
    getUserDetails: {
        requesting: false,
        error: null,
        success: false,
    },
    getSingleUserDetails: {
        requesting: false,
        error: null,
        success: false,
    },
    ChangeUserPassword: {
        requesting: false,
        error: null,
        success: false,
    },
    ChangeUserNumber: {
        requesting: false,
        error: null,
        success: false,
    },
    UploadProfilePhoto: {
        requesting: false,
        error: null,
        success: false,
    },
    UploadCoverPhoto: {
        requesting: false,
        error: null,
        success: false,
    },
    UploadCoverPhoto: {
        requesting: false,
        error: null,
        success: false,
    },
    userDetails: {
        profileDetail: {},
        userPosts: [],
    },
    LogoutUser: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        //      REGISTER USER
        case types.REGISTER_USER_REQUEST:
            return Object.assign({}, state, {
                RegisterUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case types.REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                RegisterUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                user: action.payload,
            });

        case types.REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                RegisterUser: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            LOGIN USER
        case types.LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                LoginUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                LoginUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                user: action.payload,
            });
        case types.LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                LoginUser: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            GET USER DETAILS
        case types.GET_USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getUserDetails: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                getUserDetails: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                userData: action.payload,
            });
        case types.GET_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getUserDetails: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //         GET SINGLE USER DETAILS
        case types.GET_SINGLE_USER_REQUEST:
            return Object.assign({}, state, {
                getSingleUserDetails: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_SINGLE_USER_SUCCESS:
            return Object.assign({}, state, {
                getSingleUserDetails: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                userDetails: {
                    profileDetails: action.payload.user,
                    userPosts: action.payload.userPosts,
                },
            });
        case types.GET_SINGLE_USER_FAILURE:
            return Object.assign({}, state, {
                getSingleUserDetails: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            GET USER PASSWORD
        case types.CHANGE_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                ChangeUserPassword: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CHANGE_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                ChangeUserPassword: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });
        case types.CHANGE_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                ChangeUserPassword: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        //            GET USER NUMBER
        case types.CHANGE_NUMBER_REQUEST:
            return Object.assign({}, state, {
                ChangeUserNumber: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CHANGE_NUMBER_SUCCESS:
            return Object.assign({}, state, {
                ChangeUserNumber: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });
        case types.CHANGE_NUMBER_FAILURE:
            return Object.assign({}, state, {
                ChangeUserNumber: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            GET USER PROFILE PICTURE
        case types.CHANGE_PROFILE_PICTURE_REQUEST:
            return Object.assign({}, state, {
                UploadProfilePhoto: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CHANGE_PROFILE_PICTURE_SUCCESS:
            return Object.assign({}, state, {
                UploadProfilePhoto: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                uploadSuccess: action.payload,
            });
        case types.CHANGE_PROFILE_PICTURE_FAILURE:
            return Object.assign({}, state, {
                UploadProfilePhoto: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            GET USER COVER PHOTO
        case types.CHANGE_COVER_PHOTO_REQUEST:
            return Object.assign({}, state, {
                UploadCoverPhoto: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CHANGE_COVER_PHOTO_SUCCESS:
            return Object.assign({}, state, {
                UploadCoverPhoto: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                uploadSuccess: action.payload,
            });
        case types.CHANGE_COVER_PHOTO_FAILURE:
            return Object.assign({}, state, {
                UploadCoverPhoto: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        default:
            return state;
    }
}
