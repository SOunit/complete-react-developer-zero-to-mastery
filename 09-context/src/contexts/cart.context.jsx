import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];

  // find if cartITems contains productToAdd
  const itemIndex = newCartItems.findIndex(
    (item) => item.id === productToAdd.id
  );

  // if found increment quantity
  if (itemIndex > 0 || itemIndex === 0) {
    newCartItems[itemIndex].quantity++;
  } else {
    newCartItems.push({ ...productToAdd, quantity: 1 });
  }

  // return new array
  return newCartItems;
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
