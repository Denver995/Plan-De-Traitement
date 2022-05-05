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