/* eslint-disable default-case */
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

/**
 * Format exam number
 * @param {Number} examNumber
 * @returns {String} new value
 */
export function formatExamNumber(examNumber) {
  let newValue = examNumber.toString();
  if (newValue.length > 2) {
    return (newValue = newValue.substring(0, 5 - 3) + '...');
  } else {
    return newValue;
  }
}

export const isPossibleGranularly = (data1, data2) => {
  let minInterval = data1.minInterval
  let maxInterval = data2.maxInterval
  let minIntervalUnit = data1.minIntervalUnit
  let maxIntervalUnit = data2.maxIntervalUnit
  switch (minIntervalUnit) {
    case "Jour":
      minInterval = 1440 * minInterval; break;
    case "Heure":
      minInterval = 60 * minInterval; break;
    case "Semaine":
      minInterval = 1440 * minInterval * 7; break;
  }
  switch (maxIntervalUnit) {
    case "Jour":
      maxInterval = 1440 * maxInterval; break;
    case "Heure":
      maxInterval = 60 * maxInterval; break;
    case "Semaine":
      maxInterval = 1440 * maxInterval * 7; break;
  }
  return minInterval < maxInterval
}

export const getGroupeKeyPosition = (allGroupes, groupeKey) => {
  let allGroupesKeys = Object.keys(allGroupes);
  let position = null;
  for (var i = 0; i < allGroupesKeys.length; i++) {
    if (allGroupesKeys[i] === groupeKey) {
      position = i;
      break;
    }
  }
  return position;
}

export const getFisrtLetter = (word) => {
  switch (word) {
    case "Jour":
      word = word.charAt(0).toUpperCase() + word.charAt(3).toLowerCase(); break;
    case "Heure":
      word = word.charAt(0).toLowerCase(); break;
    case "Semaine":
      word = word.charAt(0).toUpperCase() + word.charAt(1).toLowerCase() + word.charAt(2).toLowerCase(); break;
  }
  return word
}

export const generateSpace = (
  espacementNonGroupe,
  espacement,
  espacementSubExam,
  groupeToShowContentId,
  entityType,
  examId,
  index) => {
  return (groupeToShowContentId === -1 &&
    entityType === "Examen") ?
    espacementNonGroupe['espaceNonGroupe ' + index] &&
    espacementNonGroupe['espaceNonGroupe ' + index].length > 0 &&
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minInterval +
    getFisrtLetter(espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit) + "-" +
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxInterval +
    getFisrtLetter(espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxIntervalUnit)
    :
    (groupeToShowContentId === -1 &&
      entityType === "Groupe") ?
      espacement['espace ' + index] &&
      espacement['espace ' + index].length > 0 &&
      espacement['espace ' + index][espacement['espace ' + index].length - 1].minInterval +
      getFisrtLetter(espacement['espace ' + index][espacement['espace ' + index].length - 1].minIntervalUnit) + "-" +
      espacement['espace ' + index][espacement['espace ' + index].length - 1].maxInterval +
      getFisrtLetter(espacement['espace ' + index][espacement['espace ' + index].length - 1].maxIntervalUnit)
      :
      (groupeToShowContentId !== -1 &&
        entityType) ?
        espacementSubExam['group ' + groupeToShowContentId] &&
        espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index] &&
        espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index].length > 0 &&
        espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index][espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index].length - 1].minInterval +
        getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index][espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index].length - 1].minIntervalUnit) + "-" +
        espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index][espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index].length - 1].maxInterval +
        getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index][espacementSubExam['group ' + groupeToShowContentId]["subEspace " + index].length - 1].maxIntervalUnit)
        : null

}