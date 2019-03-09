import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../../actions/profile";
import { FETCH_ERROR } from "../../actions/fetchActions";
import uploadPhoto from "../../api/upload";


export function* handleUpload(action){

  const { payload } = action;

  try {

    yield all([
      put({type: UPLOAD_IMAGE_LOADING}),
    ]);

    const response = yield call(uploadPhoto, payload.userId, payload.photo);

    console.log("RISPOSTA FETCH: ", response);

    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: response
    })

  } catch(err){
    yield all([
      put({
        type: UPLOAD_IMAGE_FAILURE,
        error: err.message? err.message : err
      }),
      put({
        type: FETCH_ERROR,
        error: err
      })
    ])
  }
}


export default function* root() {
  yield all([
    takeEvery(UPLOAD_IMAGE, handleUpload)
  ]);

}