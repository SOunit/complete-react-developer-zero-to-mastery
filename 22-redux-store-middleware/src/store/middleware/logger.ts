import { Middleware } from "redux";
import { RootState } from "../store";

// original log middleware for sync log
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) {
      // in redux-thunk case, nothing to do so just call next
      return next(action);
    }

    // for log prev state
    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("currentState", store.getState());

    next(action);

    // for new state
    console.log("next state", store.getState());
  };
