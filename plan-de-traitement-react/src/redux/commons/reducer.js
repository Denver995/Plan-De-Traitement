import * as types from './types';

const INITIAL_STATE = {
  alert: {title: "", message:"",showAlert:false,onAccept:undefined,onReject:undefined},
  examen: {examenSelected: {} }
};

function CommonReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        alert: action.alert
      }
    case types.EDIT_EXAM:
    case types.SHOW_EXAM_EDIT_FORM:
      return state;
    default:
      return state;
  }
};

export default CommonReducer;