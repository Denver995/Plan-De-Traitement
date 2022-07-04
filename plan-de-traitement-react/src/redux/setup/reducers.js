import { combineReducers } from "redux";
import StepReducer from "../steps/reducer";
import CommonReducer from "../commons/reducer";
import ExamenReducer from '../examens/reducer';
import ModelsReducer from "../models/reducer";
import AppointReducer from "../appointments/reducer";

const rootReducer = combineReducers({
  StepReducer,
  CommonReducer,
  ExamenReducer,
  ModelsReducer,
  AppointReducer
});


export default rootReducer;