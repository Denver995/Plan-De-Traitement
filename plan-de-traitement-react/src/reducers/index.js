import {combineReducers} from 'redux';
import { dataSourceReducer } from "./dataSoruce";
import { modelTypeReducer } from './modelType';
import { stepsReducer } from './steps';
import { btnStateReducer } from './btnState';
import { examenReducer, examFormReducer } from './examen';
import { alertReducer } from './alert';

const appReducer = combineReducers({  
  dataSource: dataSourceReducer,
  modelType: modelTypeReducer,
  steps: stepsReducer,
  examenSelected: examenReducer,
  showExamForm: examFormReducer,
  btnState: btnStateReducer,
  alert: alertReducer,

});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
