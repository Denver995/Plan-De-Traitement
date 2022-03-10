export const createStep = (
    step, 
    hasSubStep = false, 
    data = {}, 
    isActive = true,
    previousStep = null, 
    nextStep = null
) => {
    const stepContent = {
        step: step,
        hasSubStep: hasSubStep,
        isActive: isActive,
        data: data,
        nextStep: nextStep,
        previousStep: previousStep
    }
    return stepContent;
};

export const getActiveStep = (steps) => {
    const activeStep = steps.filter(item => item.isActive === true);
    return activeStep.length > 0 ? activeStep[0].step : 'initialStep';
    // return activeStep.length > 0 ? activeStep[0] : {step: 'initialStep'};
};

export const getStepByKey = (steps, key) => {
    const step = steps.filter(item => item.step === key);
    return step.length > 0 ? step[0] : null;
};