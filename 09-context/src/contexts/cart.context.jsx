import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartITems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  // if found increment quantity
  if (existingCartItem) {
    // check all items
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? // if match, update quantity
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : // no match, no update
          cartItem
    );
  }

  // return new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const getItemCount = () => {
    const itemCount = cartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    return itemCount;
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
