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

export const startLoading = () => ({
  type: types.START_LOADING
})

export const setModelType = (modelType) => ({
  type: types.SET_MODEL_TYPE,
  modelType,
});

export const addFieldData = (key, value) => ({
  type: types.SET_FIELD_DATA,
  payload: { [key]: value },
});