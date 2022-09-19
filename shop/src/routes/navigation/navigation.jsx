import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Crown } from "../../assets/crow.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import CartIcon from "../../components/cart-icon/cart-icon";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { signOutUser } from "../utils/firebase";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.style'

const NavigationBar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Crown />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (<NavLink as="span" onClick={signOutUser}>LogOut</NavLink>) : (
                            <NavLink to='/auth'>
                                Sign In
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default NavigationBar;