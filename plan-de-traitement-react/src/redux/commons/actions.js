import * as types from './types';

export const alert = (alert) => ({
  type: types.SHOW_ALERT,
  alert,
});


export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});