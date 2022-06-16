import { put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import { createModel as createModelService } from "../../services/models";

function* createModel({ payload }) {
  try {
    const data = yield createModelService(payload);
    console.log(data);
    if (data.succes) {
      // update state
    } else {
      // update state with errors
    }
  } catch (error) {
    console.error("Create Model Saga: ", error);
  }
}

export default function* ModelsSaga() {
  yield takeLatest(types.CREATE_MODEL_REQUEST, createModel);
}
