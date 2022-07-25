import * as types from "./types";

const INITIAL_STATE = {
  model: [],
  currentModel: {},
  creating: false,
  error: "",
  updating: false,
  isRecorded: false,
};

function ModelsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CREATE_MODEL_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case types.SET_MODEL_DATA:
      return {
        ...state,
        modelData: action.payload,
      };
    case types.UPDATE_MODEL_REQUEST:
      return {
        ...state,
        modelData: {
          ...state.modelData,
          nom: action.payload,
        },
        updating: true,
      };
    case types.SAVE_MODEL_REQUEST:
      return {
        ...state,
        isRecorded: true,
      };
    default:
      return state;
  }
}

export default ModelsReducer;
