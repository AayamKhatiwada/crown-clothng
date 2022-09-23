import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../routes/utils/firebase'
import { setCategoriesFailed, setCategoriesSuccess } from './category-action';
import { CATEGORES_ACTION_TYPES } from './category-type';

export function* fetchCategoriesAsync(){
    try {

        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(setCategoriesSuccess(categoriesArray));

    } catch (error) {

        yield put(setCategoriesFailed(error));
    }
}

export function* onFetchCategories(){
    yield takeLatest(CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)])
}