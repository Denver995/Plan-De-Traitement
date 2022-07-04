import * as types from "./types";

const INITIAL_STATE = {
    appointmentData: {}
}

function AppointReducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case types.CREATE_APPOINTMENT:
            return {
                ...state,
                appointmentData: action.payload
            }
        default:
            return state;
    }
}
export default AppointReducer;