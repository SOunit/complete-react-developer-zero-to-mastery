import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const iconClickHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={iconClickHandler}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
