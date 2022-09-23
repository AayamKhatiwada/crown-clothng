import { CART_ITEM_TYPE } from './cart-type'
import { createAction } from '../../routes/utils/reducer/reducer'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return (
                cartItem.id === productToAdd.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    :
                    cartItem
            );
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => {
        return (
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                :
                cartItem
        );
    });

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const setIsCartOpen = (Boolean) => createAction(CART_ITEM_TYPE.SET_IS_CART_OPEN, Boolean)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem(cartItems, productToAdd));
    return createAction(CART_ITEM_TYPE.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
    return createAction(CART_ITEM_TYPE.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = (clearCartItem(cartItems, cartItemToClear));
    return createAction(CART_ITEM_TYPE.SET_CART_ITEMS, newCartItems);
}