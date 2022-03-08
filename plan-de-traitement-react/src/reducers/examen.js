import { EDIT_EXAM } from "../actions/action-types";

export const  examenReducer = (state = {}, action) => {
    if (action.type === EDIT_EXAM) {
      return action.examId;
    }
  
    return state;
  };