import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import './cart-dropdown.scss'
import CartItem from '../cart-items/cart-items'
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                { cartItems.map((cartItem)=> <CartItem key={cartItem.id} cartItem={cartItem}/> ) }
            </div>
            <button className='btn btn-primary' onClick={goToCheckoutHandler}>Go to CheckOut</button>
        </div>
    );
}

export default CartDropdown;