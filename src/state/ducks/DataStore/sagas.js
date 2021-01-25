import { takeEvery, all, put, call, take } from "redux-saga/effects";

import {
  GET_DATALIST_SAGA,
  SET_DATALIST_SAGA,
  GET_INSERT_USER_SAGA,
  SET_INSERT_USER_SAGA,
  SET_DELETE_USER_SAGA,
  GET_DELETE_USER_SAGA,
  GET_EDIT_USER_SAGA,
  SET_EDIT_USER_SAGA
} from "./types";
import { domainUrl, POST, PATCH, DELETE } from '../../../config';
import * as Api from '../../../lib/Api';


function* fetchDataList() {
  try {
    const response = yield call(Api.callGet, `${domainUrl}task-users`, {});
    if (response != null) {
      yield put({
        type: SET_DATALIST_SAGA,
        payload: response,
      });
    }
  } catch (e) {
    yield put({
      type: SET_DATALIST_SAGA,
      payload: {},
    });
  }
}


function* fetchInserUserCall(action) {
  if (action) {
    try {
      const response = yield call(Api.callPost, `${domainUrl}task-user/insert`, action.payload, POST);
      if (response != null) {
        yield put({
          type: SET_INSERT_USER_SAGA,
          payload: response,
        });
      }
    } catch (e) {
      yield put({
        type: SET_INSERT_USER_SAGA,
        payload: {},
      });
    }
  }

}


function* fetchDeleteUserCall(action) {
  if (action) {
    try {
      const response = yield call(Api.callPost, `${domainUrl}task-user/${action.payload}`, {}, DELETE);
      if (response != null) {
        yield put({
          type: SET_DELETE_USER_SAGA,
          payload: response,
        });
      }
    } catch (e) {
      yield put({
        type: SET_DELETE_USER_SAGA,
        payload: {},
      });
    }
  }
}

function* fetchEditUserCall(action) {
  if (action) {
    try {
      const response = yield call(Api.callPost, `${domainUrl}task-user/${action.payload._id}`, action.payload, PATCH);
      if (response != null) {
        yield put({
          type: SET_EDIT_USER_SAGA,
          payload: response,
        });
      }
    } catch (e) {
      yield put({
        type: SET_EDIT_USER_SAGA,
        payload: {},
      });
    }
  }

}

function* watchDataListFetch() {
  yield takeEvery(GET_DATALIST_SAGA, fetchDataList);
}


function* watchInserUserCall() {
  yield takeEvery(GET_INSERT_USER_SAGA, fetchInserUserCall);
}

function* watchDeleteUserCall() {
  yield takeEvery(GET_DELETE_USER_SAGA, fetchDeleteUserCall);
}

function* watchEditUserCall() {
  yield takeEvery(GET_EDIT_USER_SAGA, fetchEditUserCall);
}
export function* combinedSaga() {
  yield all([
    watchDataListFetch(),
    watchInserUserCall(),
    watchDeleteUserCall(),
    watchEditUserCall(),
  ]);
}
