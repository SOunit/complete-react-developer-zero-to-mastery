import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// 1. storage(context)
// 2. provider

// default value, not initial value
// as the actual value you want to access
export const UserContext = createContext({
  // createContext need default value
  currentUser: null,
  setCurrentUser: () => null,
});

// 2. provider
export const UserProvider = ({ children }) => {
  // initial value for state
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      } else {
        setCurrentUser(user);
      }
    });

    // for avoid memory leak
    // delete this observer when component will be unmount
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
