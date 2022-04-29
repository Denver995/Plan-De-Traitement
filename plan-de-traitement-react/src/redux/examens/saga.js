import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { createExamen as createExamenService } from '../../services/examens';

function* createExamen({ payload }) {
  try {
    const data = yield createExamenService(payload);
    console.log('dataS: ', data);
  } catch (error) {
    console.error('Some Error CreateExamSaga: ', error);
  }
}

export default function* examensSaga() {
  yield takeLatest(types.CREATE_EXAMEN_REQUEST, createExamen);
}
