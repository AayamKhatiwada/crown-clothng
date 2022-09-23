import { createAction } from "../../routes/utils/reducer/reducer"
import { CATEGORES_ACTION_TYPES } from "./category-type"

export const setCategoriesStart = () => createAction(CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const setCategoriesSuccess = (categoriesArray) => createAction(CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const setCategoriesFailed = (error) => createAction(CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);


