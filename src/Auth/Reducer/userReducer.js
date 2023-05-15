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
    UpdateUserDetails: {
        requesting: false,
        error: null,
        success: false,
    },
    getSingleUserDetails: {
        requesting: false,
        error: null,
        success: false,
    },
    SearchUser: {
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
        profileDetails: {},
        userPosts: [],
    },
    LogoutUser: {},
};
let updatedPost;
let index;
let post;
let gif;
let article;
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

        case types.GET_USER_FEEDS_TOTAL:
            return Object.assign({}, state, {
                total: action.payload,
            });
        case types.GET_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getUserDetails: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        //            UPDATE USER DETAILS
        case types.UPDATE_USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                UpdateUserDetails: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.UPDATE_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                UpdateUserDetails: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });

        case types.UPDATE_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                UpdateUserDetails: {
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

        case types.GET_MORE_USER_DATA_SUCCESS:
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: state.userDetails.userPosts.concat(
                        action.payload.userPosts
                    ),
                },
            });

        case types.LIKE_USER_ARTICLE_REQUEST:
            article = action.payload;
            index = state.userDetails.userPosts.findIndex(
                (item) => item.postid === article
            );
            updatedPost = [...state?.userDetails?.userPosts];
            post = updatedPost[index];
            post.liked = !post.liked;
            post.number_of_likes = post.liked
                ? Number(post.number_of_likes) + 1
                : Number(post.number_of_likes) - 1;
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: updatedPost,
                },
            });

        case types.LIKE_USER_GIF_REQUEST:
            gif = action.payload;
            index = state.userDetails.userPosts.findIndex(
                (item) => item.postid === gif
            );
            updatedPost = [...state?.userDetails?.userPosts];
            post = updatedPost[index];
            post.liked = !post.liked;
            post.number_of_likes = post.liked
                ? Number(post.number_of_likes) + 1
                : Number(post.number_of_likes) - 1;
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: updatedPost,
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

        case types.USER_GIF_COMMENT_SUCCESS:
            gif = action.payload.data;
            index = state.userDetails.userPosts.findIndex(
                (item) => item.postid === gif.postid
            );
            updatedPost = [...state.userDetails.userPosts];
            updatedPost[index] = gif;
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: updatedPost,
                },
            });

        case types.USER_ARTICLE_COMMENT_SUCCESS:
            article = action.payload.data;
            index = state.userDetails.userPosts.findIndex(
                (item) => item.postid === article.postid
            );
            updatedPost = [...state.userDetails.userPosts];
            updatedPost[index] = article;
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: updatedPost,
                },
            });

        case types.UPDATE_USER_ARTICLE_SUCCESS:
            article = action.payload;
            index = state.userDetails.userPosts.findIndex(
                (item) => item.postid === article.postid
            );
            updatedPost = [...state.userDetails.userPosts];
            updatedPost[index] = article;
            return Object.assign({}, state, {
                userDetails: {
                    ...state?.userDetails,
                    userPosts: updatedPost,
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
        //            SEARCH USER
        case types.SEARCH_USERS_REQUEST:
            return Object.assign({}, state, {
                SearchUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.SEARCH_USERS_SUCCESS:
            return Object.assign({}, state, {
                SearchUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                users: action.payload,
            });
        case types.SEARCH_USERS_FAILURE:
            return Object.assign({}, state, {
                SearchUser: {
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
