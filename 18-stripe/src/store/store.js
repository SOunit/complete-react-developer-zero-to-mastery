import logger from "redux-logger";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
