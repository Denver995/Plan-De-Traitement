import { combineReducers } from "redux";
import StepReducer from "../steps/reducer";
import CommonReducer from "../commons/reducer";
import ExamenReducer from '../examens/reducer';

const rootReducer = combineReducers({
  StepReducer,
  CommonReducer,
  ExamenReducer
});


export default rootReducer;