import { all } from 'redux-saga/effects';
import ExamensSaga from '../examens/saga';
import ModelsSaga from '../models/saga';

/**
 * @description Combine Sagas
 */
export default function* rootSaga() {
  yield all([ExamensSaga(), ModelsSaga()])
}