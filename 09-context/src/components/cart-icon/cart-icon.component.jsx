import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context";

const CartIcon = () => {
  const { setIsOpen } = useContext(CartDropDownContext);

  const iconClickHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="cart-icon-container" onClick={iconClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
