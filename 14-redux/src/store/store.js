import { applyMiddleware, compose, createStore } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// original log middleware for sync log
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    // in redux-thunk case, nothing to do so just call next
    return next();
  }

  // for log prev state
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  // for new state
  console.log("next state", store.getState());
};

// const middleWares = [logger];
const middleWares = [loggerMiddleware];
const composedEnhancer = compose(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancer);
