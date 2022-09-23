import { CATEGORES_ACTION_TYPES } from "./category-type";

export const CATEGORY_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = CATEGORY_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    // console.log({type, payload})

    switch (type) {
        case CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: payload, isLoading: false };
        case CATEGORES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload, isLoading: false };

        default:
            return state;
    }
}