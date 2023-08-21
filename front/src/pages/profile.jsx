import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import React, { useEffect } from 'react';
import Router from 'next/router';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    // -> 프로필 페이지에서 로그아웃시 강제로 메인화면으로
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉' data={me.Followwings} />
        <FollowList header='팔로워' data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
