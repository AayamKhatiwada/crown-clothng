import { USER_ACTION_TYPE } from "./user-types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type){
        case USER_ACTION_TYPE.SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTION_TYPE.SIGNOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPE.SIGNUP_FAILED:
        case USER_ACTION_TYPE.SIGNOUT_FAILED:
        case USER_ACTION_TYPE.SIGNIN_FAILED:
            return {
                ...state, error: payload
            };
            
        default:
            return state;         
    }
}