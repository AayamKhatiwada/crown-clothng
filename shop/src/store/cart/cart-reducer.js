import { CART_ITEM_TYPE } from "./cart-type";

export const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (state = INITAL_STATE, action = {}) => {
    const { type, payload } = action

    switch (type) {
        case CART_ITEM_TYPE.SET_CART_ITEMS:
            return {
                ...state, cartItems: payload,
            };
        
        case CART_ITEM_TYPE.SET_IS_CART_OPEN:
            return {
                ...state, isCartOpen: payload
            };

        default:
            return state;
    }
}