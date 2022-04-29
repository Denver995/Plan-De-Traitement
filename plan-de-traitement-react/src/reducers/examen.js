import { EDIT_EXAM, SHOW_EXAM_FORM } from "../actions/action-types";

export const  examenReducer = (state = {}, action) => {
  if (action.type === EDIT_EXAM) {
    return action.examData;
  }
  return state;
};

export const examFormReducer = (state = false, action) => {
  if (action.type === SHOW_EXAM_FORM) {
    return action.show;
  }
  return state;
}