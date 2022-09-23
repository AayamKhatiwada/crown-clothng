import { createAction } from "../../routes/utils/reducer/reducer"
import { USER_ACTION_TYPE } from "./user-types";

export const changeUser = (user) =>
    createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);

export const checkUserSession = () => {
    return createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);
}

export const googleSigninStart = () => createAction(USER_ACTION_TYPE.GOOGLE_SIGNIN_START);

export const emailSigninStart = (email, password) => createAction(USER_ACTION_TYPE.EMAIL_SIGNIN_START, { email, password });

export const signinSuccess = (user) => createAction(USER_ACTION_TYPE.SIGNIN_SUCCESS, user);

export const signinFailed = (error) => createAction(USER_ACTION_TYPE.SIGNIN_FAILED, error);

export const signupStart = (email, password, displayName) => createAction(USER_ACTION_TYPE.SIGNUP_START, { email, password, displayName});

export const signupSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPE.SIGNIN_SUCCESS, { user, additionalDetails })

export const signupFailed = (error) => createAction(USER_ACTION_TYPE.SIGNUP_FAILED, error);
