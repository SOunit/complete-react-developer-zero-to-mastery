import { createContext, useState } from "react";

export const CartDropDownContext = createContext({ isOpen: false });

export const CartDropDownProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = { isOpen, setIsOpen };

  return (
    <CartDropDownContext.Provider value={value}>
      {children}
    </CartDropDownContext.Provider>
  );
};
