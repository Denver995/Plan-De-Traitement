import * as types from "./types";

const INITIAL_STATE = {
  creating: false,
  message: '',
  examenSelected: {},
  activeGroup: 0,
  show: false,
  numOfGroups: 1,
  exams: [],
  groupWithData: {},
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
      state.exams.push(action.payload.exam);
      return {
        ...state,
        exams: state.exams,
      };
    case types.CREATE_EXAMEN_GROUP:
      const id = state.examsGrouped.length + 1;
      return {
        ...state,
        examsGrouped: [...state.examsGrouped, { id, ...action.payload }],
      };
    case types.ADD_EXAM_GROUPED:
      let active_group = state.groupWithData[state.activeGroup];
      active_group.push(action.payload.exam);
      let groupWithData = state.groupWithData;
      groupWithData[state.activeGroup] = active_group;
      console.log('groupWithData update ', groupWithData);
      return {
        ...state,
        groupWithData: groupWithData,
      };
    case types.GET_EXAM_GROUP:
      let examGroup = state.groupWithData[action.index];
      return {
        ...state,
        examenSelected: examGroup,
      };
    case types.ADD_EXAM_ON_ALL_GROUP:
      let groupKeys = Object.keys(state.groupWithData);
      let groupData = state.groupWithData;
      groupKeys.forEach(key => {
        groupData[key].push(action.payload.exam);
      });
      return {
        ...state,
        groupWithData: groupData,
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
      let groups = {};
      for(let i=0; i < action.nombreOccurence; i++){groups['group '+i] = []}
      return {
        ...state,
        examsGrouped: Array(Number(action.nombreOccurence)).fill({}),
        groupWithData: groups
      };

    case types.DELETE_EXAM_GROUP:
      let allGroup = state.groupWithData;
      let selectedGroup = allGroup[action.payload.groupKey];
      // examsGroupTemp.pop();
      selectedGroup.splice(action.payload.examId, 1);
      allGroup[action.payload.groupKey] = selectedGroup;
      return {
        ...state,
        groupWithData: allGroup,
      }
    case types.DELETE_EXAM_SIMPLE:
      let tempExams = [...state.exams];
      // tempExams.pop();
      tempExams.splice(action.payload, 1);
      return {
        ...state,
        exams: [...tempExams]
      }
    case types.DELETE_GROUP:
      let tempGroup = state.groupWithData;
      delete tempGroup[action.groupKey];
      let examGroupTemp = state.examsGrouped;
      examGroupTemp.pop();
      return {
        ...state,
        groupWithData: tempGroup,
        examsGrouped: examGroupTemp,
        numOfGroups: state.numOfGroups - 1
      }
    case types.SET_ESPACEMENT:
      return {
        ...state,
        espacement: action.espacement
      }
    default:
      return state;
  }
}

export default ExamenReducer;
