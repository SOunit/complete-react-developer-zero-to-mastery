import { createContext, useState } from "react";

// 1. storage(context)
// 2. provider

// default value, not initial value
// as the actual value you want to access
export const UserContext = createContext({
  // createContext need default value
  currentUser: null,
  setCurrentUser: () => null,
});

//
export const UserProvider = ({ children }) => {
  // initial value for state
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
