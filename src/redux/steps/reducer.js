import * as types from './types';

const INITIAL_STATE = {
  steps: []
};

function StepReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_STEP:
      const index = state.steps.findIndex(item => item.step === action.step.step);
      if (index !== -1) return state;
      const tempSteps = [...state.steps, action.step]
      return {
        ...state,
        steps: tempSteps
      };

    case types.DELETE_STEP:
      const stepToDelete = state.steps.filter(item => item.step === action.step.step);
      if (stepToDelete.length < 1) return state;
      let previousStep = stepToDelete[0].previousStep;
      const newState = state.steps.filter(item => (item.step !== stepToDelete[0].step && item.step !== previousStep.step));
      previousStep.isActive = true;
      newState.push(previousStep);
      return {
        ...state,
        steps: newState,
      };

    case types.ACTIVATE_STEP:
      let steps = state.steps.filter(item => item.step !== action.step);
      let stepToActivate = state.steps.filter(item => item.step === action.step);
      stepToActivate[0].isActive = true;
      steps = [...steps, stepToActivate];
      return {
        ...state,
        steps
      };

    case types.DESACTIVATE_STEP:
      let deSsteps = state.steps.filter(item => item.step !== action.step);
      let stepToDeSActivate = state.steps.filter(item => item.step === action.step);
      stepToDeSActivate[0].isActive = false;
      deSsteps = [...deSsteps, stepToDeSActivate[0]];
      return {
        ...state,
        steps: deSsteps
      }

    case types.UPDATE_STEP:
      let upSteps = state.steps.filter(item => item.step !== action.step.step);
      upSteps = [...state.steps, action.step]
      return {
        ...state,
        steps: upSteps
      };

    default:
      return state;
  }
}

export default StepReducer;