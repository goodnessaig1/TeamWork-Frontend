import { 
    LOGIN_USER,
    GET_USER_DATA,
    GET_USER_DETAILS_FAILURE,
} from "../Actions/types";



// eslint-disable-next-line
export default function(state={},action){
    switch(action.type){

        case LOGIN_USER:
            return {...state, user: action.payload }

        case GET_USER_DATA:
            return {...state, userData: action.payload }
        
        case GET_USER_DETAILS_FAILURE:
            return {...state, failed: action.payload }
        
        default:
             return state; 
             
    }
}   