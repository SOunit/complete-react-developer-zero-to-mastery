import { createContext, useEffect, useReducer } from "react";

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
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return { ...state, cartCount: payload };
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, cartTotal: payload };
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, {
      isCartOpen: false,
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
    });

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };
  const setCartItems = (cartItems) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems });
  };
  const setCartCount = (cartCount) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: cartCount });
  };
  const setCartTotal = (cartTotal) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: cartTotal });
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    setCartTotal(newTotal);
  }, [cartItems]);

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
