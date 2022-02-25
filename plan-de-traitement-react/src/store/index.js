import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

const storeWithApplyMiddleWare = applyMiddleware(thunk)(createStore);

export const store = storeWithApplyMiddleWare(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
