import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

import { ReactComponent as Crown } from "../../assets/crow.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import CartIcon from "../../components/cart-icon/cart-icon";
import { signOutUser } from "../utils/firebase";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.style'
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart-selector";

const NavigationBar = () => {
    const currentUser  = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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