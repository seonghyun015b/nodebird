import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import Link from 'next/link';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`}>
            짹짹
            <br />
            {me.Posts.length}
          </Link>
        </div>,
        <div key='following'>
          <Link href='/profile'>
            팔로잉
            <br />
          </Link>
          {me.Followings.length}
        </div>,
        <div key='follower'>
          <Link href='/profile'>
            팔로워
            <br />
          </Link>
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <Avatar>{me.nickname[0]}</Avatar>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
