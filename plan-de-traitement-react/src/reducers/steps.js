import {
  ACTIVATE_STEP,
  DESACTIVATE_STEP,
  ADD_STEP,
  DELETE_STEP,
  UPDATE_STEP
} from "../actions/action-types";
  
  export const stepsReducer = (state = [], action) => {

    if (action.type === ADD_STEP) {
      const index = state.findIndex(item => item.step === action.step.step);
      if(index !== -1) return state;
      state.push(action.step);
      return state;
    }
    
    if (action.type === DELETE_STEP) {
      const stepToDelete = state.filter(item => item.step === action.step.step);
      if (stepToDelete.length < 1) return state;
      let previousStep = stepToDelete[0].previousStep;
      const newState = state.filter(item => (item.step !== stepToDelete[0].step && item.step !== previousStep.step));
      previousStep.isActive = true;
      newState.push(previousStep);
      return newState;
    }

    if (action.type === ACTIVATE_STEP) {
      const steps = state.filter(item => item.step !== action.step);
      let stepToActivate = state.filter(item => item.step === action.step);
      stepToActivate[0].isActive = true;
      steps.push(stepToActivate);
      return steps;
    }

    if (action.type === DESACTIVATE_STEP) {
      const steps = state.filter(item => item.step !== action.step);
      let stepToDeSActivate = state.filter(item => item.step === action.step);
      stepToDeSActivate[0].isActive = false;
      steps.push(stepToDeSActivate[0]);
      return steps;
    }

    if (action.type === UPDATE_STEP) {
      const steps = state.filter(item => item.step !== action.step.step);
      steps.push(action.step);
      return steps;
    }
    return state;
  };
  