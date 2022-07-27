import * as types from "./types";

const INITIAL_STATE = {
  alert: {
    title: "",
    message: "",
    showAlert: false,
    onAccept: undefined,
    onReject: undefined,
  },
  examen: { examenSelected: {}, show: false },
  showPeriodForm: false,
  modelType: false,
  dataSource: {},
  loading: false,
  error: null,
  active: false,
};

function CommonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case types.EDIT_EXAM:
      return {
        ...state,
        examen: {
          ...state.examen,
          examData: action.examData,
        },
      };
    case types.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.STOP_LOADING:
      return {
        ...state,
        loading: false,
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
    case types.SET_MODEL_TYPE:
      return {
        ...state,
        modelType: action.modelType,
      };
    case types.SET_FIELD_DATA:
      return {
        ...state,
        dataSource: action.payload,
      };
    case types.SET_COMPONENT:
      return {
        ...state,
        componentTodisplay: action.componentTodisplay,
      };
    case types.ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.SHOW_PERIOD_FORM:
      return {
        ...state,
        showPeriodForm: action.payload,
      };
    case types.IS_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}

export default CommonReducer;
