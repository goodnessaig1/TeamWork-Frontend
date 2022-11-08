import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PICTURE_SUCCESS,
} from "../Actions/types";



// eslint-disable-next-line
export default function(state={},action){
    switch(action.type){

        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload }

        case REGISTER_USER_SUCCESS:
            return {...state, user: action.payload }
        case REGISTER_USER_FAILURE:
            return {...state, failed: action.payload }

        case LOGIN_USER_FAILURE:
            return {...state, failed: action.payload }

        case GET_USER_DETAILS_SUCCESS:
            return {...state, userData: action.payload }
        
        case GET_USER_DETAILS_FAILURE:
            return {...state, failed: action.payload }

        case GET_USER_DETAILS_REQUEST:
            return {...state, failed: action.payload }
        
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, success: action.payload }
        
        case CHANGE_PASSWORD_FAILURE:
            return {...state, error: action.payload }
        
            case CHANGE_PICTURE_SUCCESS:
            return {...state, uploadSuccess: action.payload }
        
        default:
             return state; 
             
    }
}   