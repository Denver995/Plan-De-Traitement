import * as types from './types';

export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});
export const setShowExamForm = show => ({
  type: types.SHOW_EXAM_FORM,
  show
})

export const createExamen = (payload) => ({
  type: types.CREATE_EXAMEN_REQUEST,
  payload
})

export const addExam = (payload) => ({
  type: types.ADD_EXAM,
  payload,
});

export const addExamGrouped = (payload) => ({
  type: types.ADD_EXAM_GROUPED,
  payload,
})

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