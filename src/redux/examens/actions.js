import * as types from "./types";

export const editExam = (examData) => ({
  type: types.EDIT_EXAM,
  examData,
});

export const editExamGrouped = (examData) => ({
  type: types.EDIT_EXAM_GROUP,
  examData,
});

export const setGroupeToEditeExam = (data) => {
  return {
    type: types.GET_GROUP_TO_EDITE_EXAM,
    data
  }
}

export const examToUpdate = (payload) => ({
  type: types.EXAM_TO_EDIT,
  payload,
})

export const shareExamData = (payload) => ({
  type: types.SHARE_EXAM_DATA,
  payload,
})

export const sharePraticienData = (payload) => ({
  type: types.SHARE_PRATICIEN_DATA,
  payload,
});

export const shareSpecialitieData = (payload) => ({
  type: types.SHARE_SPECIALITIE_DATA,
  payload,
});

export const shareLieu = (payload) => ({
  type: types.SHARE_LIEU,
  payload,
});

export const shareMotif= (payload) => ({
  type: types.SHARE_MOTIF,
  payload,
}); 

export const examPayload = (payload) => ({
  type: types.SHARE_EXAM_PAYLOAD,
  payload,
});

export const setShowExamForm = (show) => ({
  type: types.SHOW_EXAM_FORM,
  show,
});

export const createExamen = (payload) => ({
  type: types.CREATE_EXAMEN_REQUEST,
  payload,
});

export const shareAllExams = (payload) => ({
  type: types.SHARE_ALL_EXAMS,
  payload,
})

export const addExam = (payload) => ({
  type: types.ADD_EXAM,
  payload,
});

export const  newExam = (payload) => ({
  type: types.NEW_EXAM,
  payload,
})

export const shareGroupPayload = (payload) => ({
  type: types.SHARE_GROUP_PAYLOAD,
  payload,
})

export const addExamGrouped = (payload) => ({
  type: types.ADD_EXAM_GROUPED,
  payload,
});

export const createExamGroup = (payload) => ({
  type: types.CREATE_EXAMEN_GROUP,
  payload,
});

export const shareGroupExamPayload = (payload) => ({
  type: types.SHARE_GROUP_EXAM_PAYLOAD,
  payload,
});

export const shareListExamGroup = (payload) => ({
  type: types.SHARE_LIST_EXAMS_GROUP,
  payload,
});

export const getSelectedExamGroup = (index) => ({
  type: types.GET_EXAM_GROUP,
  index,
});

export const addExamOnAllGroups = (payload) => ({
  type: types.ADD_EXAM_ON_ALL_GROUP,
  payload,
});

export const setActiveGroup = (payload) => ({
  type: types.SET_ACTIVE_GROUP,
  payload,
});

export const numOfGroupsChange = (number) => ({
  type: types.NUMBER_OF_GROUPS_CHANGE,
  number,
});

export const setActualExamIndex = (index) => {
  return {
    type: types.SET_ACTUAL_NON_GROUPE_INDEX,
    index,
  };
};

export const CreateEspacement = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS,
    nombreOccurence,
  };
};

export const CreateEspacementNonGroupe = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS_NON_GROUPE,
    nombreOccurence,
  };
};

export const CreateEspacementSubExam = (nombreOccurence) => {
  return {
    type: types.CREATE_ESPACEMENTS_SUB_EXAM,
    nombreOccurence,
  };
};

export const updateModeleData = (payload) => ({
  type: types.UPDATE_MODELE_DATA,
  payload,
});

export const createGroups = (nombreOccurence) => ({
  type: types.CREATE_GROUPS,
  nombreOccurence,
});

export const deleteExamGroup = (payload) => ({
  type: types.DELETE_EXAM_GROUP,
  payload,
});

export const deleteExamSimple = (payload) => ({
  type: types.DELETE_EXAM_SIMPLE,
  payload,
});

export const deleteGroup = (groupKey) => ({
  type: types.DELETE_GROUP,
  groupKey,
});

export const fixExamPosition = ({ payload }) => ({
  type: types.FIX_EXAMEN_POSITION,
  payload,
});

export const fixGroupPosition = (groupKey) => ({
  type: types.FIX_GROUP_POSITION,
  groupKey,
});

export const setEspacement = (espacement) => ({
  type: types.SET_ESPACEMENT,
  espacement,
});

export const setIsClose = () => ({
  type: types.SET_IS_CLOSE,
});

export const setEspacementNonGroupe = (espacement) => ({
  type: types.SET_ESPACEMENT_NON_GROUPE,
  espacement,
});

export const setEspacementSubExam = (espacement) => ({
  type: types.SET_ESPACEMENT_SUB_EXAM,
  espacement,
});

export const toggleFixExamPosition = (payload) => ({
  type: types.TOGGLE_FIXE_EXAM_POSITION,
  payload,
});

export const toggleFixGroupPosition = ({ selectedGroup }) => ({
  type: types.TOGGLE_FIXE_GROUP_POSITION,
  selectedGroup,
});

export const dragAndDrog = (data) => {
  return {
    type: types.DRAG_AND_DROP,
    data,
  };
};
export const SetShowGroupeContentForUpdate = (id) => {
  return {
    type: types.SHOW_GROUPE_CONTENT,
    id
  }
}
export const linkToExam = (payload) => {
  return {
    type: types.LINK_TO_EXAM,
    payload,
  };
};

export const linkToGroup = (data) => {
  return {
    type: types.LINK_TO_GROUPE,
    data
  }
}

export const storeExams = (payload) => {
  return {
    type: types.STORE_EXAMS,
    payload,
  };
};

export const mostBeEditable = (response) => {
  return {
    type: types.SET_EXAM_FORM_EDITABLE,
    response,
  };
};