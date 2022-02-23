import { SET_FIELD_DATA } from "../actions/action-types";

export const dataSourceReducer = (state = {}, action) => {
  if (action.type === SET_FIELD_DATA) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
};