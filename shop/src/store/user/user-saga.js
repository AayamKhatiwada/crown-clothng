import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_ACTION_TYPE } from './user-types'
import { signinSuccess, signinFailed } from './user-action'
import { createUserDocumentFromAuth, getCurrentUser, signinAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../routes/utils/firebase'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)

        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signinFailed(error));
    }
}

export function* signInWithEmail(action){
    try {
        const { payload: { email, password } } = action;

        const { user } = yield call(signinAuthUserWithEmailAndPassword, email, password);

        yield call(getSnapshotFromUserAuth, user);
        
    } catch (error) {
        yield put(signinFailed(error))
    }
}

export function* signInWithGoogle(){
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signinFailed(error))
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

export function* onSigninWithEmail(){
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGNIN_START, signInWithEmail)
}

export function* onGoogleSigninStart(){
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticate);
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSigninStart), call(onSigninWithEmail)]);
}