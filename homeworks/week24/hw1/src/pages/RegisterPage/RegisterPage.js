import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserInput, TogglePasswordInput } from '../../components/Input';
import styled from 'styled-components';
import Form from '../../components/Form';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';

import {
  setUserErrorMessage,
  selectIsUserLoading,
  selectUserErrorMessage,
  register,
} from '../../redux/userSlice';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 143px);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Loading = styled.div`
  margin: 40px auto;
  color: #909090;
`;

const SubmitButton = styled(Button)`
  margin: 10px auto;
`;

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isUserLoading = useSelector(selectIsUserLoading);
  const userErrorMessage = useSelector(selectUserErrorMessage);
  const setError = () => dispatch(setUserErrorMessage(null));
  const setValue = (setState) => (e) => setState(e.target.value);
  const togglePassword = () => setShowPassword(showPassword ? false : true);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ nickname, username, password })).then((userId) => {
      if (userId) navigate('/react-blog');
    });
  };

  useEffect(() => () => dispatch(setUserErrorMessage(null)), [dispatch]);

  return (
    <Root>
      <Form onSubmit={handleSubmit} $width={360}>
        <Title>註冊新帳號</Title>

        <UserInput
          type={'text'}
          title={'暱稱：'}
          value={nickname}
          handleInputFocus={setError}
          handleInputChange={setValue(setNickname)}
        />

        <UserInput
          type={'text'}
          title={'帳號：'}
          value={username}
          handleInputFocus={setError}
          handleInputChange={setValue(setUsername)}
        />

        <UserInput
          type={showPassword ? 'text' : 'password'}
          title={'密碼：'}
          value={password}
          handleInputFocus={setError}
          handleInputChange={setValue(setPassword)}
        />

        <TogglePasswordInput togglePassword={togglePassword} />

        {isUserLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <ErrorMessage errorMessage={userErrorMessage} $height={35}>
              {userErrorMessage}
            </ErrorMessage>
            <SubmitButton>註冊</SubmitButton>
          </>
        )}
      </Form>
    </Root>
  );
}
