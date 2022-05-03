import logger from "redux-logger";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blackList: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

// if exist use window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// if not use compose
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const middleWares = [loggerMiddleware];
const composedEnhancer = composeEnhancer(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(persistedReducer, undefined, composedEnhancer);

export const persistor = persistStore(store);
