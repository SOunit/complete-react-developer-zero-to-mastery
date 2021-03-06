import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const iconClickHandler = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <div className="cart-icon-container" onClick={iconClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
