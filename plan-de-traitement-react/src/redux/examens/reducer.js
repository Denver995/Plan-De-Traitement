import * as types from "./types";

const INITIAL_STATE = {
  creating: false,
  message: "",
  espaceInterGroupe: {},
  examenSelected: {},
  activeGroup: 0,
  show: false,
  espacement: {},
  numOfGroups: 1,
  exams: [],
  groupWithData: {},
  openGroup: "",
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
      };
    case types.CREATE_EXAMEN_SUCCESS:
      return {
        ...state,
        creating: false,
      };
    case types.CREATE_EXAMEN_FAILURE:
      return {
        ...state,
        creating: false,
        message: action.payload.message,
      };

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
      let openGroup = state.activeGroup.slice(5);
      let active_group = state.groupWithData[state.activeGroup];
      active_group.push(action.payload.exam);
      let groupWithData = state.groupWithData;
      groupWithData[state.activeGroup] = active_group;
      console.log("groupWithData update ", groupWithData);
      return {
        ...state,
        groupWithData: groupWithData,
        openGroup: parseInt(openGroup),
      };
    case types.GET_EXAM_GROUP:
      let examGroup = state.groupWithData[action.index];
      return {
        ...state,
        examenSelected: examGroup,
      };
    case types.ADD_EXAM_ON_ALL_GROUP:
      let groupKeys = Object.keys(state.groupWithData);
      let groupIndex = Object.keys(state.groupWithData).map(
        (key, index) => index
      );
      let groupData = state.groupWithData;
      groupKeys.forEach((key) => {
        groupData[key].push(action.payload.exam);
      });
      return {
        ...state,
        groupWithData: groupData,
        openGroup: groupIndex,
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
      for (let i = 0; i < action.nombreOccurence; i++) {
        groups["group " + i] = [];
      }
      return {
        ...state,
        examsGrouped: Array(Number(action.nombreOccurence)).fill({}),
        groupWithData: groups,
      };

    case types.CREATE_ESPACEMENTS:
      let listespacements = {};
      for (let i = 0; i < action.nombreOccurence; i++) {
        listespacements["espace " + i] = [];
      }
      return {
        ...state,
        espacement: listespacements,
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
      };

    case types.DELETE_EXAM_SIMPLE:
      let tempExams = [...state.exams];
      // tempExams.pop();
      tempExams.splice(action.payload, 1);
      return {
        ...state,
        exams: [...tempExams],
      };
    case types.DELETE_GROUP:
      let tempGroup = state.groupWithData;
      delete tempGroup[action.groupKey];
      let examGroupTemp = state.examsGrouped;
      examGroupTemp.pop();
      return {
        ...state,
        groupWithData: tempGroup,
        examsGrouped: examGroupTemp,
        numOfGroups: state.numOfGroups - 1,
      };
    case types.SET_ESPACEMENT:
      console.log("inside setEspacemnt");
      console.log(state.espacement);
      let n = state.numOfGroups - 1;
      let espaces = state.espacement;
      let espacesKeys = Object.keys(espaces);
      console.log("espacesKeys ", espacesKeys);
      if (action.espacement.applyOnAll) {
        console.log("inside setEspacemnt all");
        espacesKeys.forEach((key) => {
          espaces[key].push(action.espacement);
        });
      } else {
        console.log("inside setEspacemnt not all ");
        espacesKeys.forEach((key) => {
          console.log("espace " + action.espacement.initialIndex);
          if (key === "espace " + action.espacement.initialIndex) {
            let allEspace = state.espacement;
            console.log("-----", espaces);
            allEspace["espace " + action.espacement.initialIndex] = [
              action.espacement,
            ];
            espaces = allEspace;
            console.log("-----", espaces);
          }
        });
      }
      return {
        ...state,
        espacement: espaces,
      };

    case types.SET_IS_CLOSE: {
      return {
        ...state,
        openGroup: "",
      };
    }
    default:
      return state;
  }
}

export default ExamenReducer;
