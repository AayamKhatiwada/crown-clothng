import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as Crown } from "../../assets/crow.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import CartIcon from "../../components/cart-icon/cart-icon";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.style'
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart-selector";
import { signoutStart } from "../../store/user/user-action";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signoutStart());
    // console.log(currentUser)

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
                        currentUser ? (
                            <>
                                <span>{currentUser.displayName}</span>
                                <NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>
                            </>
                        ) : (
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