import * as types from '../Actions/types';

const initialState = {
    getUsers: {
        requesting: false,
        error: null,
        success: false,
    },
    AddCategory: {
        requesting: false,
        error: null,
        success: false,
    },
    AddColor: {
        requesting: false,
        error: null,
        success: false,
    },
    UpdateColor: {
        requesting: false,
        error: null,
        success: false,
    },
    DeleteUser: {
        requesting: false,
        error: null,
        success: false,
    },
    CreateAdmin: {
        requesting: false,
        error: null,
        success: false,
    },
    DisableAdmin: {
        requesting: false,
        error: null,
        success: false,
    },
    users: [],
};
let updatedUsers;
let userId;
let index;
export default function (state = initialState, action) {
    switch (action.type) {
        //            GET ALL USERS
        case types.GET_USERS_REQUEST:
            return Object.assign({}, state, {
                getUsers: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                getUsers: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                users: action.payload,
            });
        case types.GET_USERS_FAILURE:
            return Object.assign({}, state, {
                getUsers: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case types.ADD_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                AddCategory: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.ADD_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                AddCategory: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                categories: action.payload,
            });

        case types.ADD_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                AddCategory: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.ADD_COLOR_REQUEST:
            return Object.assign({}, state, {
                AddColor: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.ADD_COLOR_SUCCESS:
            return Object.assign({}, state, {
                AddColor: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                colors: action.payload,
            });

        case types.ADD_COLOR_FAILURE:
            return Object.assign({}, state, {
                AddColor: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        case types.UPDATE_COLOR_REQUEST:
            return Object.assign({}, state, {
                UpdateColor: {
                    requesting: true,
                    error: null,
                    success: true,
                },
            });

        case types.UPDATE_COLOR_SUCCESS:
            return Object.assign({}, state, {
                UpdateColor: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                colors: action.payload,
            });

        case types.UPDATE_COLOR_FAILURE:
            return Object.assign({}, state, {
                UpdateColor: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        // ==========DELETE USER
        case types.DELETE_USER_REQUEST:
            userId = action.payload;
            index = state.users.findIndex((user) => user.id === userId);
            if (index !== -1) {
                updatedUsers = [...state.users];
                updatedUsers.splice(index, 1);
                return Object.assign({}, state, {
                    ...state,
                    users: updatedUsers,
                });
            }
            return state;

        case types.DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                DeleteUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });

        case types.DELETE_USER_FAILURE:
            return Object.assign({}, state, {
                DeleteUser: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        // ==========MAKE USER AN ADMIN
        case types.CREATE_ADMIN_REQUEST:
            userId = action.payload;
            index = state.users.findIndex((user) => user.id === userId);
            updatedUsers = [...state.users];
            updatedUsers[index].is_admin = true;
            return Object.assign({}, state, {
                ...state,
                users: updatedUsers,
            });

        case types.CREATE_ADMIN_SUCCESS:
            return Object.assign({}, state, {
                CreateAdmin: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });

        case types.CREATE_ADMIN_FAILURE:
            return Object.assign({}, state, {
                CreateAdmin: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        // ========== DISABLE ADMIN
        case types.DISABLE_ADMIN_REQUEST:
            userId = action.payload;
            index = state.users.findIndex((user) => user.id === userId);
            updatedUsers = [...state.users];
            updatedUsers[index].is_admin = false;
            return Object.assign({}, state, {
                ...state,
                users: updatedUsers,
            });

        case types.DISABLE_ADMIN_SUCCESS:
            return Object.assign({}, state, {
                DisableAdmin: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                success: action.payload,
            });

        case types.DISABLE_ADMIN_FAILURE:
            return Object.assign({}, state, {
                DisableAdmin: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });

        default:
            return state;
    }
}
