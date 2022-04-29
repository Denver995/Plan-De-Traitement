import * as types from './types';

const INITIAL_STATE = {
  examenSelected: {},
  show: false
};

function ExamenReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.EDIT_EXAM:
      return {
        ...state,
        examen: {
          ...state.examen,
          examData: action.examData
        }
      }
    case types.SHOW_EXAM_FORM:
      return {
        ...state,
        examen: {
          ...state.examen,
          show: action.show,
        }
      }
    case types.SHOW_EXAM_EDIT_FORM:
      return state;
    case types.CREATE_EXAMEN_REQUEST:
      console.log('action: ', action);
      return state;
    default:
      return state;
  }
}

export default ExamenReducer;