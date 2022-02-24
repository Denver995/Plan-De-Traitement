import {combineReducers} from 'redux';
import { dataSourceReducer } from "./dataSoruce";
import { modelTypeReducer } from './modelType';
import { stepsReducer } from './steps';
import { btnStateReducer } from './btnState';

const appReducer = combineReducers({  
  dataSource: dataSourceReducer,
  modelType: modelTypeReducer,
  steps: stepsReducer,
  btnState: btnStateReducer

});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
