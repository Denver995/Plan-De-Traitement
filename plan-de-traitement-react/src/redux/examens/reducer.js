import * as types from "./types";

const INITIAL_STATE = {
  creating: false,
  message: "",
  espaceInterGroupe: {},
  groupeToShowContentId: -1,
  examenSelected: {},
  activeGroup: 0,
  show: false,
  espacement: {},
  espacementNonGroupe: {},
  espacementSubExam: {},
  actualNonGroupeIndex: 0,
  numOfGroups: 1,
  exams: [],
  dataModeleUpdate: {},
  groupWithData: {},
  groupPayload: null,
  groupExamPayload: {},
  examsListGroup: [],
  groupWithFixedPosition: [],
  listOfNewExam: null,
  getAllExams: [],
  examIsEdit: null,
  praticienData: null,
  specialitieData: null,
  lieuData: null,
  MotifData: null,
  examInfo: [],
  examp: {},
  openGroup: "",
  examsGrouped: [],
  mustBeEditable: false,
  infoGroupeToEditeExamGrouped: {}
};

function ExamenReducer(state = INITIAL_STATE, action) {
  let allGroupTemp;
  let allExamTemp;
  let groupDetail;
  let examDetail;
  switch (action.type) {
    case types.CREATE_EXAMEN_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case types.CREATE_EXAMEN_SUCCESS:
      return {
        ...state,
        creating: false,
      };
    case types.CREATE_EXAMEN_FAILURE:
      return {
        ...state,
        creating: false,
        message: action.payload.message,
      };

    case types.EDIT_EXAM:
      return {
        ...state,
        examen: {
          ...state.examen,
          examData: action.examData,
        },
      };
    case types.GET_GROUP_TO_EDITE_EXAM:
      return {
        ...state,
        infoGroupeToEditeExamGrouped: { ...action.data }
      };
    case types.EDIT_EXAM_GROUP:
      return {
        ...state
      };
    case types.SHOW_EXAM_FORM:
      return {
        ...state,
        examen: {
          ...state.examen,
          show: action.show,
        },
      };
    case types.SHOW_EXAM_EDIT_FORM:
      return state;

    case types.ADD_EXAM:
      allExamTemp = state.exams;
      allExamTemp.push({ ...action.payload.exam, positionFixed: false });
      let listespacementsNonGroupe = {};
      let espaceNonGroupeKeys = Object.keys(state.espacementNonGroupe);
      if (espaceNonGroupeKeys.length > 0) {
        for (let i = 0; i < allExamTemp.length - 1; i++) {
          listespacementsNonGroupe["espaceNonGroupe " + i] = state
            .espacementNonGroupe["espaceNonGroupe " + i]
            ? [...state.espacementNonGroupe["espaceNonGroupe " + i]]
            : [];
        }
      } else {
        for (let i = 0; i < allExamTemp.length - 1; i++) {
          listespacementsNonGroupe["espaceNonGroupe " + i] = [];
        }
      }
      return {
        ...state,
        exams: allExamTemp,
        espacementNonGroupe: listespacementsNonGroupe,
      };
    case types.CREATE_EXAMEN_GROUP:
      const id = state.examsGrouped.length + 1;
      return {
        ...state,
        examsGrouped: [...state.examsGrouped, { id, ...action.payload }],
      };
    case types.ADD_EXAM_GROUPED:
      let openGroup = state.activeGroup.slice(5);
      let active_group = state.groupWithData[state.activeGroup];
      active_group.exams.push({ ...action.payload.exam, positionFixed: false });
      let groupWithData = state.groupWithData;
      groupWithData[state.activeGroup] = active_group;
      return {
        ...state,
        groupWithData: groupWithData,
        openGroup: parseInt(openGroup),
      };
    case types.GET_EXAM_GROUP:
      let examGroup = state.groupWithData[action.index].exams;
      return {
        ...state,
        examenSelected: examGroup,
      };
    case types.ADD_EXAM_ON_ALL_GROUP:
      let groupKeys = Object.keys(state.groupWithData);
      let groupIndex = Object.keys(state.groupWithData).map(
        (key, index) => index
      );
      let groupData = state.groupWithData;
      groupKeys.forEach((key) => {
        groupData[key].exams.push(action.payload.exam);
      });
      return {
        ...state,
        groupWithData: groupData,
        openGroup: groupIndex,
      };
    case types.SET_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: action.payload,
      };
    case types.NUMBER_OF_GROUPS_CHANGE:
      return {
        ...state,
        numOfGroups: action.number,
      };
    case types.UPDATE_MODELE_DATA:
      return {
        ...state,
        dataModeleUpdate: action.payload,
      };
    case types.CREATE_GROUPS:
      let groups = {};
      for (let i = 0; i < action.nombreOccurence; i++) {
        groups["group " + i] = { exams: [], positionFixed: false };
        groups["group " + i].payload = state.groupPayload[i];
      }
      return {
        ...state,
        examsGrouped: Array(Number(action.nombreOccurence)).fill({}),
        groupWithData: groups,
      };

    case types.SHARE_ALL_EXAMS:
      return {
        ...state,
        getAllExams: action.payload,
      }

    case types.SHARE_PRATICIEN_DATA:
      return {
        ...state,
        praticienData: action.payload,
      }

    case types.SHARE_EXAM_PAYLOAD:
      return {
        ...state,
        examInfo: state.examInfo.concat(action.payload),
      }

    case types.SHARE_SPECIALITIE_DATA:
      return {
        ...state,
        specialitieData: action.payload,
      }

    case types.SHARE_LIEU:
      return {
        ...state,
        lieuData: action.payload,
      }

    case types.SHARE_MOTIF:
      return {
        ...state,
        motifData: action.payload,
      }

    case types.NEW_EXAM:
      let newExamPayload = [];
      newExamPayload.push(action.payload);
      return {
        ...state,
        listOfNewExam: newExamPayload,
      }

    case types.EXAM_TO_EDIT:
      return {
        ...state,
        examIsEdit: action.payload,
      }

    case types.SHARE_EXAM_DATA:
    return{
      ...state,
      examp: action.payload,
    }


    case types.SHARE_GROUP_PAYLOAD:
      return {
        ...state,
        groupPayload: action.payload,
      };

    case types.SHARE_LIST_EXAMS_GROUP:
      return {
        ...state,
        examsListGroup: action.payload,
      };
    case types.SHARE_GROUP_EXAM_PAYLOAD:
      return {
        ...state,
        groupExamPayload: action.payload,
      };

    case types.CREATE_ESPACEMENTS:
      let listespacements = {};
      let nbrOfGroupe = Object.keys(state.groupWithData);
      for (let i = 0; i < nbrOfGroupe.length - 1; i++) {
        listespacements["espace " + i] = [];
      }
      return {
        ...state,
        espacement: listespacements,
      };
    case types.SET_ACTUAL_NON_GROUPE_INDEX:
      return {
        ...state,
        actualNonGroupeIndex: action.index,
      };
    case types.CREATE_ESPACEMENTS_NON_GROUPE:
      return {
        ...state,
      };

    case types.CREATE_ESPACEMENTS_SUB_EXAM:
      let groupesWithData = state.groupWithData;
      let espacementSubExam = state.espacementSubExam;
      let groupeWithDataKeys = Object.keys(groupesWithData);
      groupeWithDataKeys.forEach((key) => {
        let actualGroupe = groupesWithData[key];
        let nomberExamOfActualGroupe = actualGroupe["exams"].length;
        for (let i = 0; i < nomberExamOfActualGroupe - 1; i++) {
          espacementSubExam[key]["subEspace " + i] = espacementSubExam[key][
            "subEspace " + i
          ]
            ? [...state.espacementSubExam[key]["subEspace " + i]]
            : [];
        }
      });
      let groupes = {};
      let nomberOfGroups = state.groupWithData;
      let n = Object.keys(nomberOfGroups);
      for (let i = 0; i < n.length; i++) {
        groupes["group " + i] = state.espacementSubExam["group " + i]
          ? { ...state.espacementSubExam["group " + i] }
          : {};
      }

      return {
        ...state,
        espacementSubExam: groupes,
      };

    case types.DELETE_EXAM_GROUP:
      let allGroup = state.groupWithData;
      let selectedGroup = allGroup[action.payload.groupKey];
      // examsGroupTemp.pop();
      selectedGroup.exams.splice(action.payload.examId, 1);
      allGroup[action.payload.groupKey] = selectedGroup;
      return {
        ...state,
        groupWithData: { ...allGroup },
      };
    case types.DELETE_EXAM_SIMPLE:
      let tempExams = [...state.exams];
      tempExams.splice(action.payload.examId, 1);
      let listeEspNonGroupe = state.espacementNonGroupe;
      if (action.payload.examId > 0) {
        let id = action.payload.examId - 1;
        listeEspNonGroupe["espaceNonGroupe " + id] = [];
      }

      return {
        ...state,
        exams: [...tempExams],
        espacementNonGroupe: listeEspNonGroupe,
      };
    case types.DELETE_GROUP:
      let tempGroup = state.groupWithData;
      if (tempGroup[action.groupKey].fixedChild) {
        let tempGroupChildKey = tempGroup[action.groupKey].fixedChild
        delete tempGroup[tempGroupChildKey]
      }
      delete tempGroup[action.groupKey];
      let examGroupTemp = state.examsGrouped;
      examGroupTemp.pop();
      let tempGroupKeys = Object.keys(tempGroup)
      let newTempGroup = {}
      let newTempGroupLength = tempGroupKeys.length
      for (let i = 0; i < newTempGroupLength; i++) {
        newTempGroup['group ' + i] = tempGroup[tempGroupKeys[i]]
      }
      return {
        ...state,
        groupWithData: newTempGroup,
        examsGrouped: examGroupTemp,
        numOfGroups: state.numOfGroups - 1,
      };
    case types.SET_ESPACEMENT:
      let espaces = state.espacement;
      let espacesKeys = Object.keys(espaces);
      if (action.espacement.applyOnAll) {
        espacesKeys.forEach((key) => {
          espaces[key].push(action.espacement);
        });
      } else {
        espacesKeys.forEach((key) => {
          if (key === "espace " + action.espacement.initialIndex) {
            let allEspace = state.espacement;
            allEspace["espace " + action.espacement.initialIndex] = [
              action.espacement,
            ];
            espaces = allEspace;
          }
        });
      }
      return {
        ...state,
        espacement: espaces,
      };

    case types.SET_IS_CLOSE: {
      return {
        ...state,
        openGroup: "",
      };
    }
    case types.SHOW_GROUPE_CONTENT: {
      return {
        ...state,
        groupeToShowContentId: action.id,
      };
    }
    case types.SET_ESPACEMENT_NON_GROUPE:
      let espace = state.espacementNonGroupe;
      let espacesNonGroupeKeys = Object.keys(espace);
      if (action.espacement.applyOnAll) {
        espacesNonGroupeKeys.forEach((key) => {
          let initialIndex = state.actualNonGroupeIndex;
          espace[key].push({ ...action.espacement, initialIndex });
        });
      } else {
        espacesNonGroupeKeys.forEach((key) => {
          if (key === "espaceNonGroupe " + state.actualNonGroupeIndex) {
            let allEspace = state.espacementNonGroupe;
            let initialIndex = state.actualNonGroupeIndex;
            allEspace["espaceNonGroupe " + state.actualNonGroupeIndex] = [
              { ...action.espacement, initialIndex },
            ];
            espace = allEspace;
          }
        });
      }
      return {
        ...state,
        espacesNonGroupe: espace,
      };
    case types.SET_ESPACEMENT_SUB_EXAM:
      let allGroupes = state.espacementSubExam;
      let allGrproupesKeys = Object.keys(allGroupes);
      if (!action.espacement.applyOnAll) {
        allGrproupesKeys.forEach((key) => {
          if (key === "group " + action.espacement.parentSubExamId) {
            let actualGroupe = allGroupes[key];
            actualGroupe["subEspace " + action.espacement.initialIndex] = [
              action.espacement,
            ];
            allGroupes["group " + action.espacement.parentSubExamId] =
              actualGroupe;
          }
        });
      } else {
        allGrproupesKeys.forEach((key) => {
          let actualGroupe = allGroupes[key];
          if (key === "group " + action.espacement.parentSubExamId) {
            let actualGroupeKeys = Object.keys(actualGroupe);
            actualGroupeKeys.forEach((key_) => {
              actualGroupe[key_] = [action.espacement];
            });
            allGroupes[key] = actualGroupe;
          }
        });
      }
      return {
        ...state,
        openGroup: action.espacement.parentSubExamId,
        espacementSubExam: allGroupes,
      };
    case types.TOGGLE_FIXE_EXAM_POSITION:
      allExamTemp = state.exams;
      allGroupTemp = state.groupWithData;
      if (action.payload.isExamGrouped) {
        let selectedGroup = allGroupTemp[action.payload.groupKey];
        examDetail = selectedGroup.exams[action.payload.selectedExam];
        examDetail.positionFixed = !examDetail.positionFixed;
        selectedGroup.exams[action.payload.selectedExam] = examDetail;
        allGroupTemp[action.payload.groupKey] = selectedGroup;
      } else {
        examDetail = allExamTemp[action.payload.selectedExam];
        examDetail.positionFixed = !examDetail.positionFixed;
        allExamTemp[action.selectedExam] = examDetail;
      }
      return {
        ...state,
        exams: [...allExamTemp],
        groupWithData: { ...allGroupTemp },
      };
    case types.TOGGLE_FIXE_GROUP_POSITION:
      allGroupTemp = state.groupWithData;
      groupDetail = allGroupTemp[action.selectedGroup];
      if (allGroupTemp[groupDetail.fixedChild]) {
        let groupChildDetail = allGroupTemp[groupDetail.fixedChild];
        groupChildDetail.positionFixed = !groupChildDetail.positionFixed;
        allGroupTemp[groupDetail.fixedChild] = groupChildDetail;
      }

      groupDetail.positionFixed = !groupDetail.positionFixed;
      allGroupTemp[action.selectedGroup] = groupDetail;
      return {
        ...state,
        groupWithData: { ...allGroupTemp },
      };

    case types.DRAG_AND_DROP:
      let source = action.data.source;
      let destination = action.data.destination;
      let espacementSubExam_ = state.espacementSubExam;

      let sourceGroupe__ = espacementSubExam_["group " + source];
      let destinationGroupe__ = espacementSubExam_["group " + destination];

      let espacementSourceKeys = Object.keys(sourceGroupe__);

      for (let i = 0; i < espacementSourceKeys.length; i++) {
        let actualSpaceLength = sourceGroupe__["subEspace " + i].length;
        for (let j = 0; j < actualSpaceLength; j++) {
          sourceGroupe__["subEspace " + i][j] = {
            ...sourceGroupe__["subEspace " + i][j],
            parentSubExamId: destination,
          };
        }
      }

      let espacementDestKeys = Object.keys(destinationGroupe__);
      for (let i = 0; i < espacementDestKeys.length; i++) {
        let actualSpaceLength = destinationGroupe__["subEspace " + i].length;
        for (let j = 0; j < actualSpaceLength; j++) {
          destinationGroupe__["subEspace " + i][j] = {
            ...destinationGroupe__["subEspace " + i][j],
            parentSubExamId: source,
          };
        }
      }

      espacementSubExam_["group " + source] = destinationGroupe__;
      espacementSubExam_["group " + destination] = sourceGroupe__;

      let groupesWithData_ = state.groupWithData;
      let sourceGroupe = groupesWithData_["group " + source];
      let destinationGroupe = groupesWithData_["group " + destination];
      let temp = destinationGroupe;
      destinationGroupe = sourceGroupe;
      sourceGroupe = temp;
      groupesWithData_["group " + source] = sourceGroupe;
      groupesWithData_["group " + destination] = destinationGroupe;

      let espacement = state.espacement;
      let sourceGroupe_ = espacement["espace " + source];
      let destinationGroupe_ = espacement["espace " + destination];
      let temp_ = destinationGroupe_;
      destinationGroupe_ = sourceGroupe_;
      sourceGroupe_ = temp_;
      espacement["espace " + source] = sourceGroupe_;
      espacement["espace " + destination] = destinationGroupe_;

      return {
        ...state,
        groupWithData: groupesWithData_,
        espacement: espacement,
        espacementSubExam: espacementSubExam_,
      };
    case types.LINK_TO_EXAM:
      const copyData = state.exams;
      const parentId = action.payload.parent;
      const childId = action.payload.child;
      const childElement = copyData.splice(childId, 1);

      childElement[0].id_parent = parentId;
      copyData[parentId].id_child = childId;

      copyData.splice(parentId + 1, 0, childElement[0]);

      return {
        ...state,
        exams: [...copyData],
      };

    case types.LINK_TO_GROUPE:
      let groupKeyParent = action.data.idGroupe;
      let groupKeyChild = action.data.child;
      let allGroupes_ = state.groupWithData;
      let parentGroupe = allGroupes_[groupKeyParent];
      parentGroupe.fixedChild = groupKeyChild;
      allGroupes_[groupKeyParent] = parentGroupe

      return {
        ...state,
        groupWithData: allGroupes_
      };
    case types.STORE_EXAMS:
      return {
        ...state,
        exams: [...action.payload],
      };
    case types.SET_EXAM_FORM_EDITABLE:
      return {
        ...state,
        mustBeEditable: action.response
      };
    default:
      return state;
  }
}

export default ExamenReducer;
