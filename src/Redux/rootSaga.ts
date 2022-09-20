import {all} from 'redux-saga/effects';

import GeneralSaga from './generalSaga';

function* rootSaga() {
  yield all([GeneralSaga()]);
}

export default rootSaga;
