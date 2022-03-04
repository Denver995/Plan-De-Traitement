import { SHOW_ALERT } from "../actions/action-types";

export const alertReducer = (state = {title: "", message:"",showAlert:false,onAccept:undefined,onReject:undefined},action ) => {
    if(action.type === SHOW_ALERT){
        return action.alert;
    }
    return state
}