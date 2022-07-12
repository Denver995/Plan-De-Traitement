import { takeLatest } from "redux-saga/effects";
import { createModel as createModelService } from "../../services/models";
import * as types from "./types";

function* createModel({ payload }) {
  try {
    const data = yield createModelService(payload);
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
