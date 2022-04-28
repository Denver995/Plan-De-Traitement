import * as types from './types';

export const setAlert = alert => ({
  type: types.SHOW_ALERT,
  alert
})

export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});

export const startLoading = () => ({
  type: types.START_LOADING
})