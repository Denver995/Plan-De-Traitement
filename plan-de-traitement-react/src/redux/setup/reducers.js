import { combineReducers } from "redux";
import StepReducer from "../steps/reducer";
import CommonReducer from "../commons/reducer";
import ExamenReducer from '../examens/reducer';
import ModelsReducer from "../models/reducer";

const rootReducer = combineReducers({
  StepReducer,
  CommonReducer,
  ExamenReducer,
  ModelsReducer,
});


export default rootReducer;