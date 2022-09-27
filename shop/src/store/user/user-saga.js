import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_ACTION_TYPE } from './user-types'
import { signinSuccess, signinFailed, signupSuccess, signupFailed, signoutFailed, signoutSuccess } from './user-action'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signinAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../routes/utils/firebase'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signinFailed(error));
    }
}

export function* signInWithEmail(action) {
    try {
        const { payload: { email, password } } = action;

        const { user } = yield call(signinAuthUserWithEmailAndPassword, email, password);

        yield call(getSnapshotFromUserAuth, user);

    } catch (error) {
        yield put(signinFailed(error))
        yield alert(error.code)
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signinFailed(error))
        yield alert(error.code)

    }
}

export function* isUserAuthenticate() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);

    } catch (error) {
        yield put(signinFailed(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signupSuccess(user, { displayName }))
    } catch (error) {
        yield put(signupFailed(error));
        yield alert(error.code)
    }
}

export function* signOut(){
    try {
        yield call(signOutUser)
        yield put(signoutSuccess());
    } catch (error) {
        yield put(signoutFailed(error));
    }
}

export function* signinAfterSignup({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSigninWithEmail() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGNIN_START, signInWithEmail)
}

export function* onGoogleSigninStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticate);
}

export function* onSignupStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGNUP_START, signUp);
}

export function* onSignupSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGNUP_SUCCESS, signinAfterSignup)
}

export function* onSignoutStart(){
    yield takeLatest(USER_ACTION_TYPE.SIGNOUT_START, signOut);
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSigninStart), call(onSigninWithEmail), call(onSignupSuccess), call(onSignupStart), call(onSignoutStart)]);
}