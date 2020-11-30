import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormBox from '../../components/FormBox';
import InputBox from '../../components/InputBox';
import NormalButton from '../../components/NormalButton';
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

const ShowPasswordRadio = styled.div`
  margin-top: 20px;
`;

const Loading = styled.div`
  margin: 40px auto;
  color: #909090;
`;

const SubmitButton = styled(NormalButton)`
  margin: 10px auto;
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
      <FormBox onSubmit={handleSubmit} $height={290} $width={350}>
        <Title>請登入部落格</Title>
        <InputBox
          type={'text'}
          title={'帳號：'}
          value={username}
          handleInputFocus={setError}
          handleInputChange={setValue(setUsername)}
        />
        <InputBox
          type={showPassword ? 'text' : 'password'}
          title={'密碼：'}
          value={password}
          handleInputFocus={setError}
          handleInputChange={setValue(setPassword)}
        />
        <ShowPasswordRadio>
          <input type="checkbox" onClick={togglePassword} id="password" />
          <label htmlFor="password">顯示密碼 </label>
        </ShowPasswordRadio>

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
      </FormBox>
    </Root>
  );
}
