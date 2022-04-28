import { combineReducers } from "redux";
import StepReducer from "../steps/reducer";
import CommonReducer from "../commons/reducer";

const rootReducer = combineReducers({
  StepReducer,
  CommonReducer,
});


export default rootReducer;