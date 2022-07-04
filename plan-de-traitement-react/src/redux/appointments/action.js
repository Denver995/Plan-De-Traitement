import * as types from "./types";

export const createAppointment = (payload) => ({
    type: types.CREATE_APPOINTMENT,
    payload
})