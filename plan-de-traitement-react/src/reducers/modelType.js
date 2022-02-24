import { SET_MODEL_TYPE } from "../actions/action-types";

export const modelTypeReducer = (state = false, action) => {
    if(action.type === SET_MODEL_TYPE){
        return action.modelType;
    }
    return state;
}