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
    previousStep: previousStep,
  };
  return stepContent;
};

export const getActiveStep = (steps) => {
  const activeStep = steps.filter((item) => item.isActive === true);
  return activeStep.length > 0 ? activeStep[0].step : "initialStep";
  // return activeStep.length > 0 ? activeStep[0] : {step: 'initialStep'};
};

export const getStepByKey = (steps, key) => {
  const step = steps.filter((item) => item.step === key);
  return step.length > 0 ? step[0] : null;
};

export const formatModeleData = (modeleData) => {
  if (modeleData.groupe_rdv) return { nom: modeleData.nomModele };
  else
    return {
      nb_occurence: modeleData.nombreOccurence,
      groupe_rdv: modeleData.groupe_rdv,
      id_entite: 4,
      periode: modeleData.periode ? modeleData.periode : 1,
    };
};

/**
 * Convert hexadecimal color to RGB integers
 * @param {String} Color to hexadecimal format
 * @returns {Object} RGB color with int values
 */
export function hexColorToInt(hexColor) {
  const redColor = parseInt(hexColor.slice(1, 3), 16);
  const greenColor = parseInt(hexColor.slice(3, 5), 16);
  const blueColor = parseInt(hexColor.slice(5, 7), 16);
  return { r: redColor, g: greenColor, b: blueColor };
}
/**
 * Get HSP color brightness from hexadecimal color
 * Using HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
 * Higher is the HSP value, lighter is the color
 * (above HSP 127.5, color is considered as light)
 * @param {String}  Color to hexadecimal format
 * @returns {Number} Color brightness
 */
export function getHSPBrightness(hexColor) {
  const color = hexColorToInt(hexColor);
  return Math.sqrt(
    0.299 * (color.r * color.r) +
      0.587 * (color.g * color.g) +
      0.114 * (color.b * color.b)
  );
}
