import * as types from './types';

export const setAlert = alert => ({
  type: types.SHOW_ALERT,
  alert
})

export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});
export const setShowExamForm = show => ({
  type: types.SHOW_EXAM_FORM,
  show
});

export const startLoading = (isLoading) => ({
  type: types.START_LOADING,
  isLoading
})

export const setModelType = (modelType) => ({
  type: types.SET_MODEL_TYPE,
  modelType,
});

export const addFieldData = (key, value) => ({
  type: types.SET_FIELD_DATA,
  payload: { [key]: value },
});

export const setComponent = (componentTodisplay) => ({
  type: types.SET_COMPONENT,
  componentTodisplay
});