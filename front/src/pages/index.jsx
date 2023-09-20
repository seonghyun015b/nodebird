import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import wrapper from '../store/configureStore';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts]);

  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

// SSR

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      console.log('context', store);

      const cookie = req ? req.headers.cookie : '';

      axios.defaults.headers.Cookie = cookie;

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
