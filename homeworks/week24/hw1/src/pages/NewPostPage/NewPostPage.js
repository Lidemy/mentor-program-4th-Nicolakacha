import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormBox from '../../components/FormBox';
import NormalButton from '../../components/NormalButton';
import { selectUserId } from '../../redux/userSlice';
import {
  addPost,
  setErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from '../../redux/postsSlice';

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

const SubmitButton = styled(NormalButton)`
  margin: 10px auto;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const userId = useSelector(selectUserId);
  const setError = () => dispatch(setErrorMessage(null));
  const controlInput = (setValue) => (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ title, body })).then((newPostResponse) => {
      if (!newPostResponse.id) {
        return dispatch(setErrorMessage(newPostResponse.message));
      }
      navigate('/react-blog/post/' + newPostResponse.id);
    });
  };

  useEffect(() => {
    if (!userId) navigate('/react-blog');
  }, [userId, navigate]);

  return (
    <Root>
      <FormBox
        onSubmit={handleSubmit}
        $height={390}
        $width={460}
        $paddingType={'post'}
      >
        <TitleWrapper>
          <Title>新文章</Title>
        </TitleWrapper>

        <InputWrapper>
          <InputHeader>標題：</InputHeader>
          <TitleInput
            value={title}
            onChange={controlInput(setTitle)}
            onFocus={setError}
          />
        </InputWrapper>

        <InputWrapper>
          <InputHeader>內容：</InputHeader>
          <BodyInput
            value={body}
            col="20"
            onChange={controlInput(setBody)}
            onFocus={setError}
          />
        </InputWrapper>

        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <SubmitButton>送出文章</SubmitButton>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </>
        )}
      </FormBox>
    </Root>
  );
}
