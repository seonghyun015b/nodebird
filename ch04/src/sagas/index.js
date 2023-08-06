import { all, fork, take, put, call } from 'redux-saga/effects';
import axios from 'axios';

// 로그인

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_REQUEST',
    });
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn);
}

// 로그아웃

function logoutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    const result = yield call(logoutAPI);
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

function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logOut);
}

// addPost

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
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

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
