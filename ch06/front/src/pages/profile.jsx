import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followersError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingsError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  useEffect(() => {
    // -> 프로필 페이지에서 로그아웃시 강제로 메인화면으로
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  });

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followersError || followingsError) {
    console.error(followersError || followingsError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header='팔로잉'
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingsError}
        />
        <FollowList
          header='팔로워'
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followersError}
        />
      </AppLayout>
    </>
  );
};

// SSR

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';

      axios.defaults.headers.Cookie = cookie;

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Profile;
