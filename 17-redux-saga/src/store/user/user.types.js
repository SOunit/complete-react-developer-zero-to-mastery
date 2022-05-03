export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "user/SET_CURRENT_USER",
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",

  // redux async pattern
  // 1. start
  // 2. success
  // 3. failed
  GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "user/SIGN_IN_FAILED",

  // redux async pattern
  SIGN_UP_START: "user/SIGN_UP_START",
  SIGN_UP_SUCCESS: "user/SIGN_UP_SUCCESS",
  SIGN_UP_FAILED: "user/SIGN_UP_FAILED",
};
