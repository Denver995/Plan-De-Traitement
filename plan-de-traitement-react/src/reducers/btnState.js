import { SET_DISABLE_BTN, SET_ENABLE_BTN } from "../actions/action-types";

export const btnStateReducer = (state = false, action) => {
  if (action.type === SET_ENABLE_BTN) {
    return true;
  }
  if (action.type === SET_DISABLE_BTN) {
    return false;
  }
  return state;
};
