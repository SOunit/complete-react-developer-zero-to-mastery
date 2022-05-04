// AnyAction because some action has no payload
import { AnyAction } from "redux";

// option payload is not good for type safety
// Action type with optional payload do not give type safety
// so, there should be 2 types instead
// that's better typescript approach, like Java
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
