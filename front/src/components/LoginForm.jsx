import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const divStyle = useMemo(() => ({ marginTop: 10 }), []);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div style={divStyle}>
          <label htmlFor='user-email'>이메일</label>
          <br />
          <Input
            name='user-email'
            type='email'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            value={password}
            type='password'
            onChange={onChangePassword}
            required
          />
        </div>

        <ButtonWrapper>
          <Button type='primary' htmlType='submit' loading={logInLoading}>
            로그인
          </Button>
          <Link href='/signup'>
            <Button>회원가입</Button>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;