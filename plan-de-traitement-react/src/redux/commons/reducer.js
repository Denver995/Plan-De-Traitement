import * as types from './types';

const INITIAL_STATE = {
  alert: {title: "", message:"",showAlert:false,onAccept:undefined,onReject:undefined}
};

function CommonReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        alert: action.alert
      }
    default:
      return state;
  }
};

export default CommonReducer;