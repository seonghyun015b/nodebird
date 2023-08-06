import { all, fork, put, call, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';

// API

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function logoutAPI() {
  return axios.post('/api/logout');
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

// 로그인

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_REQUEST',
    });
    yield put({
      type: 'LOG_IN_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

// 로그아웃

function* logOut() {
  try {
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_REQUEST',
    });
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

// addPost

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_REQUEST',
    });
    yield put({
      type: 'ADD_POST_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery('LOG_IN_REQUEST', logIn);
}

function* watchLogout() {
  yield takeEvery('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield takeEvery('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
