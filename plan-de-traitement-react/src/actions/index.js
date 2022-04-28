import {
  ADD_STEP,
  DELETE_STEP,
  SET_ACTIVE_STEP,
  NEXT_STEP,
  SET_MODEL_TYPE,
  SET_ENABLE_BTN,
  SET_DISABLE_BTN,
  SET_FIELD_DATA,
  ALERT_DIALOG,
  START_LOADING,
  STOP_LOADING,
  ACTIVATE_STEP,
  DESACTIVATE_STEP,
  UPDATE_STEP,
  EDIT_EXAM,
  SHOW_ALERT,
  SHOW_EXAM_FORM
} from "./action-types";

export const setModelType = (modelType) => ({
  type: SET_MODEL_TYPE,
  modelType,
});

export const addStep = (step) => ({
  type: ADD_STEP,
  step,
});

export const deleteStep = (step) => ({
  type: DELETE_STEP,
  step,
});

export const activateStep = (step) => ({
  type: ACTIVATE_STEP,
  step,
});

export const desactivateStep = (step) => ({
  type: DESACTIVATE_STEP,
  step,
});

export const updateStep = (step) => ({
  type: UPDATE_STEP,
  step,
});

export const editExam = (examData) => ({
  type: EDIT_EXAM,
  examData,
});

export const setActiveStep = (activeStep) => ({
  type: SET_ACTIVE_STEP,
  activeStep,
});
export const nextStep = (steps) => ({
  type: NEXT_STEP,
  steps,
});

export const setEnableBtn = () => ({
  type: SET_ENABLE_BTN,
});

export const setDisableBtn = () => ({
  type: SET_DISABLE_BTN,
});

export const addFieldData = (key, value) => ({
  type: SET_FIELD_DATA,
  payload: { [key]: value },
});

export const alertDialog = contentDialog => ({
  type: ALERT_DIALOG,
  contentDialog
});

export const startLoading = ()  => ({
    type: START_LOADING,
});

export const stopLoading = ()  => ({
    type: STOP_LOADING,
});

export const setAlert = alert => ({
  type: SHOW_ALERT,
  alert
});

export const setShowExamForm = show => ({
  type: SHOW_EXAM_FORM,
  show
});