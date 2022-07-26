import * as types from './types';
/**
 *
 * @param {object} step
 * @returns an object
 */
export const addStep = (step) => ({
  type: types.ADD_STEP,
  step,
});

export const deleteStep = (step) => ({
  type: types.DELETE_STEP,
  step,
});

export const activateStep = (step) => ({
  type: types.ACTIVATE_STEP,
  step,
});

export const desactivateStep = (step) => ({
  type: types.DESACTIVATE_STEP,
  step,
});

export const updateStep = (step) => ({
  type: types.UPDATE_STEP,
  step,
});

export const setActiveStep = (activeStep) => ({
  type: types.SET_ACTIVE_STEP,
  activeStep,
});
export const nextStep = (steps) => ({
  type: types.NEXT_STEP,
  steps,
});