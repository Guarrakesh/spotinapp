import { put, takeEvery } from 'redux-saga/effects';
import { showNotification } from '../../actions/notificationActions';

/**
 * Notification Side Effects
 */
function* handleNotification({ error, meta: { notification, optimistic } }) {
  const { body, level, title, messageArgs = {} } = notification;
  if (error) {
    return yield put(
        showNotification(
            typeof error === 'string' ? error : error.message || body,
            level || 'warning',
            {
              messageArgs,
              title,
              undoable: false,
            }
        )
    );
  }
  yield put(
      showNotification(body, level || 'info', {
        title,
        messageArgs,
        undoable: optimistic,
      })
  );
}

export default function*() {
  yield takeEvery(
      action => action.meta && action.meta.notification,
      handleNotification
  );
}
