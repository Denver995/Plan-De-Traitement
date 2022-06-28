import * as types from "./types";

const INITIAL_STATE = {
  creating: false,
  message: "",
  espaceInterGroupe: {},
  examenSelected: {},
  activeGroup: 0,
  show: false,
  espacement: {},
  espacementNonGroupe: {},
  espacementSubExam: {},
  actualNonGroupeIndex: 0,
  numOfGroups: 1,
  exams: [],
  groupWithData: {},
  groupWithFixedPosition: [],
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
  let allGroupTemp;
  let allExamTemp;
  let groupDetail;
  let examDetail;
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
      let listespacementsNonGroupe = {};
      allExamTemp = state.exams;
      allExamTemp.push({...action.payload.exam, positionFixed: false});
      let espaceNonGroupeKeys = Object.keys(state.espacementNonGroupe);
      if (espaceNonGroupeKeys.length > 0) {
        for (let i = 0; i < allExamTemp.length - 1; i++) {
          listespacementsNonGroupe["espaceNonGroupe " + i] = state
            .espacementNonGroupe["espaceNonGroupe " + i]
            ? [...state.espacementNonGroupe["espaceNonGroupe " + i]]
            : [];
        }
      } else {
        for (let i = 0; i < allExamTemp.length - 1; i++) {
          listespacementsNonGroupe["espaceNonGroupe " + i] = [];
        }
      }
      return {
        ...state,
        exams: allExamTemp,
        espacementNonGroupe: listespacementsNonGroupe,
      };
    case types.CREATE_EXAMEN_GROUP:
      const id = state.examsGrouped.length + 1;
      return {
        ...state,
        examsGrouped: [...state.examsGrouped, { id, ...action.payload }],
      };
    case types.ADD_EXAM_GROUPED:
      let active_group = state.groupWithData[state.activeGroup];
      active_group.exams.push({...action.payload.exam, positionFixed: false});
      let groupWithData = state.groupWithData;
      groupWithData[state.activeGroup] = active_group;
      return {
        ...state,
        groupWithData: groupWithData,
      };
    case types.GET_EXAM_GROUP:
      let examGroup = state.groupWithData[action.index].exams;
      return {
        ...state,
        examenSelected: examGroup,
      };
    case types.ADD_EXAM_ON_ALL_GROUP:
      let groupKeys = Object.keys(state.groupWithData);
      let groupData = state.groupWithData;
      groupKeys.forEach((key) => {
        groupData[key].exams.push(action.payload.exam);
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
      for (let i = 0; i < action.nombreOccurence; i++) {
        groups["group " + i] = { exams: [], positionFixed: false };
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
    case types.SET_ACTUAL_NON_GROUPE_INDEX:
      return {
        ...state,
        actualNonGroupeIndex: action.index,
      };
    case types.CREATE_ESPACEMENTS_NON_GROUPE:
      console.log(state.espacementNonGroupe);
      return {
        ...state,
      };

    case types.CREATE_ESPACEMENTS_SUB_EXAM:
      let groupes = {};
      for (let i = 0; i < state.numOfGroups; i++) {
        groupes["group " + i] = state.espacementSubExam["group " + i]
          ? { ...state.espacementSubExam["group " + i] }
          : {};
      }

      return {
        ...state,
        espacementSubExam: groupes,
      };

    case types.DELETE_EXAM_GROUP:
      let allGroup = state.groupWithData;
      let selectedGroup = allGroup[action.payload.groupKey];
      // examsGroupTemp.pop();
      selectedGroup.exams.splice(action.payload.examId, 1);
      allGroup[action.payload.groupKey] = selectedGroup;
      return {
        ...state,
        groupWithData: allGroup,
      };
    case types.DELETE_EXAM_SIMPLE:
      let tempExams = [...state.exams];
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
      let espaces = state.espacement;
      let espacesKeys = Object.keys(espaces);
      if (action.espacement.applyOnAll) {
        espacesKeys.forEach((key) => {
          espaces[key].push(action.espacement);
        });
      } else {
        espacesKeys.forEach((key) => {
          if (key === "espace " + action.espacement.initialIndex) {
            let allEspace = state.espacement;
            allEspace["espace " + action.espacement.initialIndex] = [
              action.espacement,
            ];
            espaces = allEspace;
          }
        });
      }
      return {
        ...state,
        espacement: espaces,
      };
    case types.SET_ESPACEMENT_NON_GROUPE:
      let espace = state.espacementNonGroupe;
      let espacesNonGroupeKeys = Object.keys(espace);
      if (action.espacement.applyOnAll) {
        espacesNonGroupeKeys.forEach((key) => {
          let initialIndex = state.actualNonGroupeIndex;
          espace[key].push({ ...action.espacement, initialIndex });
        });
      } else {
        espacesNonGroupeKeys.forEach((key) => {
          if (key === "espaceNonGroupe " + state.actualNonGroupeIndex) {
            let allEspace = state.espacementNonGroupe;
            let initialIndex = state.actualNonGroupeIndex;
            allEspace["espaceNonGroupe " + state.actualNonGroupeIndex] = [
              { ...action.espacement, initialIndex },
            ];
            espace = allEspace;
          }
        });
      }
      return {
        ...state,
        espacesNonGroupe: espace,
      };
    case types.SET_ESPACEMENT_SUB_EXAM:
      let allGroupes = state.espacementSubExam;
      let allGrproupesKeys = Object.keys(allGroupes);
      if (!action.espacement.applyOnAll) {
        allGrproupesKeys.forEach((key) => {
          if (key === "group " + action.espacement.parentSubExamId) {
            let actualGroupe = allGroupes[key];
            actualGroupe["subEspace " + action.espacement.initialIndex] =
              actualGroupe["subEspace " + action.espacement.initialIndex]
                ? [
                    ...actualGroupe[
                      "subEspace " + action.espacement.initialIndex
                    ],
                    action.espacement,
                  ]
                : [action.espacement];
            allGroupes["group " + action.espacement.parentSubExamId] =
              actualGroupe;
          }
        });
      } else {
        allGrproupesKeys.forEach((key) => {
          let actualGroupe = allGroupes[key];
          if (key === "group " + action.espacement.parentSubExamId) {
            let actualGroupeKeys = Object.keys(actualGroupe);
            if (actualGroupeKeys.length > 0) {
              actualGroupeKeys.forEach((key_) => {
                actualGroupe[key_].push(action.espacement);
              });
            } else {
              for (
                var i = 0;
                i < state.groupWithData[key].exams.length - 1;
                i++
              ) {
                actualGroupe["subEspace " + i] = [action.espacement];
              }
            }
            allGroupes[key] = actualGroupe;
          }
        });
      }
      console.log(allGroupes);
      return {
        ...state,
        espacementSubExam: allGroupes,
      };
    case types.TOGGLE_FIXE_EXAM_POSITION:
      allExamTemp = state.exams;
      allGroupTemp = state.groupWithData;
      if(action.payload.isExamGrouped){
        let selectedGroup = allGroupTemp[action.payload.groupKey];
        examDetail = selectedGroup.exams[action.payload.selectedExam];
        console.log('examDetail group before ', examDetail);
        examDetail.positionFixed = !examDetail.positionFixed;
        console.log('examDetail group after ', examDetail);
        selectedGroup.exams[action.payload.selectedExam] = examDetail;
        allGroupTemp[action.payload.groupKey] = selectedGroup;
      }else{
        examDetail = allExamTemp[action.selectedExam];
        console.log('examDetail before ', examDetail);
        examDetail.positionFixed = !examDetail.positionFixed;
        allExamTemp[action.selectedExam] = examDetail;
        console.log('examDetail after ', examDetail);
      }
      return {
        ...state,
        exams: allExamTemp,
        groupData: allGroupTemp
      };
    case types.TOGGLE_FIXE_GROUP_POSITION:
      allGroupTemp = state.groupWithData;
      groupDetail = allGroupTemp[action.selectedGroup];
      console.log('groupDetail before ', groupDetail);
      groupDetail.positionFixed = !groupDetail.positionFixed;
      allGroupTemp[action.selectedGroup] = groupDetail;
      console.log('groupDetail after ', groupDetail);
      return {
        ...state,
        groupWithData: allGroupTemp
      };
    default:
      return state;
  }
}

export default ExamenReducer;
