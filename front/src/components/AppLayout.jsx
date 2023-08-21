import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Input, Menu, Row } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Menu mode='horizontal'>
          <Menu.Item>
            <Link href='/'>노드버드</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/profile'>프로필</Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput enterButton />
          </Menu.Item>
          <Menu.Item>
            <Link href='/signup'>회원가입</Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href='https://www.naver.com'
              target='_black'
              rel='noreferrer noopener'
            >
              네이버
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
