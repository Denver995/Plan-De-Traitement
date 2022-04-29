import { all } from 'redux-saga/effects';
import ExamensSaga from '../examens/saga';

/**
 * @description Combine Sagas
 */
export default function* rootSaga() {
  yield all([ExamensSaga()])
}