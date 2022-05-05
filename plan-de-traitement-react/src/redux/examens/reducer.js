import * as types from './types';

// examLine = {
//   0: {},
//   1: {}
// }
const INITIAL_STATE = {
  examenSelected: {},
  show: false,
  exams: [],
  examsGrouped: [
    {
      exam1: {id: 1},
      exam2: {id: 2},
      exam3: {id: 3},
    },
    {
      exam1: {id: 1},
      exam2: {id: 2},
      exam3: {id: 3},
    }
  ],
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
      return state;
    case types.ADD_EXAM:
      return {
        ...state,
        exams: [...state.exams, action.payload]
      };
    case types.CREATE_EXAMEN_GROUP:
      const id = state.examsGrouped.length + 1;
      return {
        ...state,
        examsGrouped: [...state.examsGrouped, {id, ...action.payload}]
      }
    case types.ADD_EXAM_GROUPED:
      console.log('actionE: ', action.payload)
      let group = state.examsGrouped[action.payload.index];
      console.log('group: ', group);
      group['exam' + Object.keys(group).length + 1] = action.payload.exam;
      let examsGrouped = state.examsGrouped;
      examsGrouped[action.payload.index] = group;
      return {
        ...state,
        examsGrouped
      }
    default:
      return state;
  }
}

export default ExamenReducer;