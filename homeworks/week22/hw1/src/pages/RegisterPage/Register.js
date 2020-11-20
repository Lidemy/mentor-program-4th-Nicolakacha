import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils';
import { register, getMe } from '../../WebAPI';
import { AuthContext } from '../../contexts';
import { LoadingContext } from '../../contexts';
import styled from 'styled-components';
import SubmitButton from '../../components/SubmitButton';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 143px);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const RegisterWrapper = styled.form`
  width: 360px;
  height: 360px;
  margin: 20px auto 0;
  padding: 20px;
  background: whitesmoke;
  transition: all linear 0.2s;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  &:hover {
    transition: all linear 0.2s;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px 10px;
  border-bottom: 1px solid #909090;
  background: transparent;
  letter-spacing: 5px;
  color: #808080;
  font-size: 16px;
`;

const ShowPasswordRadio = styled.div`
  margin-top: 10px;
`;

const Loading = styled.div`
  margin: 20px 0 10px 0;
  color: #909090;
`;

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    register(nickname, username, password)
      .then((data) => {
        if (data.ok === 0) {
          setIsLoading(false);
          return setErrorMessage(data.message);
        }
        setAuthToken(data.token);
        getMe()
          .then((response) => {
            if (response.ok !== 1) {
              setAuthToken(null);
              return setErrorMessage(response.toString());
            }
            setUser(response.data);
            navigate('/react-blog/');
            setIsLoading(false);
          })
          .catch((err) => {
            navigate('/react-blog/');
            setIsLoading(false);
            return setErrorMessage(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err);
      });
  };

  return (
    <Root>
      <RegisterWrapper onSubmit={handleSubmit}>
        <Title>註冊新帳號</Title>
        <InputWrapper>
          暱稱：{' '}
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
        </InputWrapper>
        <InputWrapper>
          帳號：{' '}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
        </InputWrapper>
        <InputWrapper>
          密碼：{' '}
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
          <ShowPasswordRadio>
            <input
              type="checkbox"
              onClick={() => setShowPassword(showPassword ? false : true)}
              id="password"
            />
            <label htmlFor="password">顯示密碼 </label>
          </ShowPasswordRadio>
        </InputWrapper>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <SubmitButton>註冊</SubmitButton>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </RegisterWrapper>
    </Root>
  );
}
