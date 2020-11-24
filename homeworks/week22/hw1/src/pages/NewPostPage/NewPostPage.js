import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../../WebAPI';
import { LoadingContext } from '../../contexts';
import styled from 'styled-components';
import SubmitButton from '../../components/SubmitButton';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 143px);
`;

const TitleWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin: 0px;
`;

const Form = styled.form`
  width: 460px;
  height: 390px;
  margin: 20px auto 0;
  padding: 10px 30px 30px 30px;
  background: whitesmoke;
  transition: all linear 0.2s;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  &:hover {
    transition: all linear 0.2s;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const InputHeader = styled.div`
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #808080;
  outline: none;
  font-size: 16px;
`;

const BodyInput = styled.textarea`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #808080;
  outline: none;
  height: 150px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
`;

const Loading = styled.div`
  margin: 20px 0 10px 0;
  color: #909090;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addPost(title, body).then((response) => {
      if (response.ok === 0) {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate('/react-blog/');
    });
  };

  const controlInput = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const initializeErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit}>
        <TitleWrapper>
          <Title>新文章</Title>
        </TitleWrapper>
        <InputWrapper>
          <InputHeader>標題：</InputHeader>
          <TitleInput
            value={title}
            onChange={controlInput(setTitle)}
            onFocus={initializeErrorMessage}
          />
        </InputWrapper>
        <InputWrapper>
          <InputHeader>內容：</InputHeader>
          <BodyInput
            value={body}
            col="20"
            onChange={controlInput(setBody)}
            onFocus={initializeErrorMessage}
          />
        </InputWrapper>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <SubmitButton>送出文章</SubmitButton>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Root>
  );
}
