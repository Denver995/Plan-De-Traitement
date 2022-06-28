import * as types from "./types";

export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});
export const setShowExamForm = (show) => ({
  type: types.SHOW_EXAM_FORM,
  show,
});

export const createExamen = (payload) => ({
  type: types.CREATE_EXAMEN_REQUEST,
  payload,
});

export const addExam = (payload) => ({
  type: types.ADD_EXAM,
  payload,
});

export const addExamGrouped = (payload) => ({
  type: types.ADD_EXAM_GROUPED,
  payload,
});

export const createExamGroup = (payload) => ({
  type: types.CREATE_EXAMEN_GROUP,
  payload,
});

export const getSelectedExamGroup = (index) => ({
  type: types.GET_EXAM_GROUP,
  index,
});

export const addExamOnAllGroups = (payload) => ({
  type: types.ADD_EXAM_ON_ALL_GROUP,
  payload,
});

export const setActiveGroup = (payload) => ({
  type: types.SET_ACTIVE_GROUP,
  payload,
});

export const numOfGroupsChange = (number) => ({
  type: types.NUMBER_OF_GROUPS_CHANGE,
  number,
});

export const setActualExamIndex = (index) => {
  return {
    type: types.SET_ACTUAL_NON_GROUPE_INDEX,
    index,
  };
};

export const CreateEspacement = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS,
    nombreOccurence,
  };
};

export const CreateEspacementNonGroupe = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS_NON_GROUPE,
    nombreOccurence,
  };
};

export const CreateEspacementSubExam = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS_SUB_EXAM,
    nombreOccurence,
  };
};

export const createGroups = (nombreOccurence) => ({
  type: types.CREATE_GROUPS,
  nombreOccurence,
});

export const deleteExamGroup = (payload) => ({
  type: types.DELETE_EXAM_GROUP,
  payload,
});

export const deleteExamSimple = (payload) => ({
  type: types.DELETE_EXAM_SIMPLE,
  payload,
});

export const deleteGroup = (groupKey) => ({
  type: types.DELETE_GROUP,
  groupKey,
});

export const fixExamPosition = ({ payload }) => ({
  type: types.FIX_EXAMEN_POSITION,
  payload,
});

export const fixGroupPosition = (groupKey) => ({
  type: types.FIX_GROUP_POSITION,
  groupKey,
});

export const setEspacement = (espacement) => ({
  type: types.SET_ESPACEMENT,
  espacement,
});

export const setIsClose = () => ({
  type: types.SET_IS_CLOSE,
});

export const setEspacementNonGroupe = (espacement) => ({
  type: types.SET_ESPACEMENT_NON_GROUPE,
  espacement,
});

export const setEspacementSubExam = (espacement) => ({
  type: types.SET_ESPACEMENT_SUB_EXAM,
  espacement,
});

export const toggleFixExamPosition = (payload) => ({
  type: types.TOGGLE_FIXE_EXAM_POSITION,
  payload,
});

export const toggleFixGroupPosition = (selectedGroup) => ({
  type: types.TOGGLE_FIXE_GROUP_POSITION,
  selectedGroup,
});
