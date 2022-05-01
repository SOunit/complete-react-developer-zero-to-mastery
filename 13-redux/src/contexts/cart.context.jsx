import { createContext, useReducer } from "react";

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

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// for autocompletion
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  console.log(type);
  console.log(payload);
  console.log(state);

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    cartTotal,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
