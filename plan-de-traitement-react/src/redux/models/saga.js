import { takeLatest } from "redux-saga/effects";
import ModelService from "../../services/models";
import * as types from "./types";

function* createModel({ payload }) {
  try {
    const data = yield ModelService.createModel(payload);

  } catch (error) {
    console.error("Create Model Saga: ", error);
  }
}

export default function* ModelsSaga() {
  yield takeLatest(types.CREATE_MODEL_REQUEST, createModel);
}
