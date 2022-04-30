import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart, cartTotal } =
    useContext(CartContext);

  const addItemHandler = (cartItem) => {
    addItemToCart(cartItem);
  };

  const removeItemHandler = (cartItem) => {
    removeItemFromCart(cartItem);
  };

  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, name, price, imageUrl, quantity } = cartItem;
        return (
          <div key={id}>
            <img src={imageUrl} alt={`${name}`} />
            <div>{name}</div>
            <div>
              <span onClick={() => removeItemHandler(cartItem)}>L</span>
              {quantity}
              <span onClick={() => addItemHandler(cartItem)}>R</span>
            </div>
            <div>${price}</div>
          </div>
        );
      })}
      <div>{`Total: $${cartTotal}`}</div>
    </div>
  );
};

export default Checkout;
