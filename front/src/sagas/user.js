import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import axios from 'axios';

import {
  // 로그인
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  // 로그아웃
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  // 회원가입
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  // 팔로우
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  // 언팔로우
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  // 내 정보 불러오기
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  // 팔로워
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_FAILURE,
  // 팔로잉
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_SUCCESS,
  // 팔로워 차단
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  // 닉네임 변경
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  // 유저정보 불러오기
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

// 내 정보 불러오기
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

// 다른사람 정보 불러오기

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

// 로그인

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// 로그아웃

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

// 회원가입

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// 팔로우

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}

// 언팔로우

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}

// 팔로워 정보

function followerAPI(data) {
  return axios.get('/user/followers', data);
}

function* followers(action) {
  try {
    const result = yield call(followerAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadfollower() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, followers);
}

// 팔로잉 정보

function followingsAPI(data) {
  return axios.get('/user/followings', data);
}

function* followings(action) {
  try {
    const result = yield call(followingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadfollowing() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, followings);
}

// 팔로워 제거

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

// 닉네임 변경
function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadfollower),
    fork(watchLoadfollowing),
    fork(watchRemoveFollower),
  ]);
}
