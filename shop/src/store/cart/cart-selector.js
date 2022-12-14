import { createSelector } from 'reselect'

export const selectCartReducer = (state) => {
    // console.log(state.cart);
    return state.cart;
}

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0);
    }
)
