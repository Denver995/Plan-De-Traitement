import { takeLatest } from 'redux-saga/effects';
import * as types from './types';

function* createExamen({ payload }) {

}

export default function* examensSaga() {
  yield takeLatest(types.CREATE_EXAMEN_REQUEST, createExamen);
}
