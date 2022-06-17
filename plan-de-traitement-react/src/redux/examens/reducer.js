import * as types from "./types";

// examLine = {
//   0: {},
//   1: {}
// }
const INITIAL_STATE = {
  creating: false,
  message: '',
  examenSelected: {},
  activeGroup: 0,
  show: false,
  numOfGroups: 1,
  exams: [],
  examsGrouped: [
    {
      exam1: { id: 1 },
      // exam2: {id: 2},
      // exam3: {id: 3},
    },
    {
      // exam1: {id: 1},
      // exam2: {id: 2},
      // exam3: {id: 3},
    },
    {
      // exam1: {id: 1},
      // exam2: {id: 2},
      // exam3: {id: 3},
    },
  ],
};

function ExamenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CREATE_EXAMEN_REQUEST:
      return {
        ...state,
        creating: true,
      }
    case types.CREATE_EXAMEN_SUCCESS:
      return {
        ...state,
        creating: false,
      }
    case types.CREATE_EXAMEN_FAILURE:
      return {
        ...state,
        creating: false,
        message: action.payload.message
      }


    case types.EDIT_EXAM:
      return {
        ...state,
        examen: {
          ...state.examen,
          examData: action.examData,
        },
      };
    case types.SHOW_EXAM_FORM:
      return {
        ...state,
        examen: {
          ...state.examen,
          show: action.show,
        },
      };
    case types.SHOW_EXAM_EDIT_FORM:
      return state;
    case types.ADD_EXAM:
      return {
        ...state,
        exams: [...state.exams, action.payload],
      };
    case types.CREATE_EXAMEN_GROUP:
      const id = state.examsGrouped.length + 1;
      return {
        ...state,
        examsGrouped: [...state.examsGrouped, { id, ...action.payload }],
      };
    case types.ADD_EXAM_GROUPED:
      console.log("actionE: ", action.payload);
      console.log('activeGroupAdd: ', state.activeGroup);
      let group = state.examsGrouped[state.activeGroup];
      console.log("group: ", group);
      group["exam" + Object.keys(group).length + 1] = action.payload.exam;
      let examsGrouped = state.examsGrouped;
      examsGrouped[action.payload.index] = group;
      return {
        ...state,
        examsGrouped,
      };
    case types.GET_EXAM_GROUP:
      let examGroup = {};
      examGroup = state.examsGrouped[action.index];
      console.log("examenGroup: ", examGroup);
      return {
        ...state,
        examenSelected: examGroup,
      };
    case types.ADD_EXAM_ON_ALL_GROUP:
      console.log("actionALL: ", action);
      let tempGroup = state.examsGrouped;
      tempGroup.map((group, i) => {
        tempGroup[i] = {
          ...tempGroup[i],
          ["exam" + Object.keys(group).length + 1]: action.payload,
        };
        return tempGroup;
      });
      return {
        ...state,
        examsGrouped: tempGroup,
      };
    case types.SET_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: action.payload,
      };
    case types.NUMBER_OF_GROUPS_CHANGE:
      return {
        ...state,
        numOfGroups: action.number,
      };
    case types.CREATE_GROUPS:
      return {
        ...state,
        examsGrouped: Array(Number(state.numOfGroups)).fill({}),
      };

    case types.DELETE_EXAM_GROUP:
      console.log('action.paylaod', action);
      let examsGroupTemp = [...state.examsGrouped];
      console.log('examsGroupTemp: ', examsGroupTemp);
      // examsGroupTemp.pop();
      examsGroupTemp.splice(action.payload, 1);
      return {
        ...state,
        examsGrouped: [...examsGroupTemp],
      }
    case types.DELETE_EXAM_SIMPLE:
      let tempExams = [...state.exams];
      // tempExams.pop();
      tempExams.splice(action.payload, 1);
      return {
        ...state,
        exams: [...tempExams]
      }
    default:
      return state;
  }
}

export default ExamenReducer;
