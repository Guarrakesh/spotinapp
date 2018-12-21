import { call, takeEvery, put } from 'redux-saga/effects';

/**
 * Callback Side Effects
 */
function* handleSideActions({ meta: { linkedResources = [] } }) {
  const keys = Object.keys(linkedResources);
  for (let i = 0; i < keys.length; i++) {
    yield put({ meta: { resource: keys[i] }, ...linkedResources[keys[i]] })
  }

}

export default function*() {
  yield takeEvery(
      action => action.meta && action.meta.linkedResources,
      handleSideActions
  );
}
