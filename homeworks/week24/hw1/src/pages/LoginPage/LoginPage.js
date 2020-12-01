import styled from 'styled-components';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserInput, TogglePasswordInput } from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import {
  setUserErrorMessage,
  selectIsUserLoading,
  selectUserErrorMessage,
  login,
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
  margin: 30px auto 10px;
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const userErrorMessage = useSelector(selectUserErrorMessage);
  const isUserLoading = useSelector(selectIsUserLoading);
  const setError = () => dispatch(setUserErrorMessage(null));
  const setValue = (setState) => (e) => setState(e.target.value);
  const togglePassword = () => setShowPassword(showPassword ? false : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password })).then((userId) => {
      if (userId) navigate('/react-blog');
    });
  };

  useEffect(() => () => dispatch(setUserErrorMessage(null)), [dispatch]);

  return (
    <Root>
      <Form onSubmit={handleSubmit} $width={350}>
        <Title>請登入部落格</Title>
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
            <ErrorMessage errorMessage={userErrorMessage} $height={15}>
              {userErrorMessage}
            </ErrorMessage>
            <SubmitButton>登入</SubmitButton>
          </>
        )}
      </Form>
    </Root>
  );
}
