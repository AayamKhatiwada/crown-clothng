import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart-selector";
import "./checkout.scss"

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="heaer-block">
                    <span>Product</span>
                </div>
                <div className="heaer-block">
                    Description
                </div>
                <div className="heaer-block">
                    Quantity
                </div>
                <div className="heaer-block">
                    Price
                </div>
                <div className="heaer-block">
                    Remove
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                );
            })}
            <span className="total">Total : ${total}</span>
        </div>
    );
}

export default Checkout;