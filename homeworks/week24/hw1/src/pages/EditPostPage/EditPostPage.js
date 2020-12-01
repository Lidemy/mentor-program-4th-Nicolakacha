import styled from 'styled-components';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectUserId } from '../../redux/userSlice';
import {
  editPost,
  getPost,
  setErrorMessage,
  selectErrorMessage,
} from '../../redux/postsSlice';

const Root = styled.div`
  margin-top: 30px;
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

const SubmitButton = styled(Button)`
  margin: 10px auto;
`;

export default function EditPostPage() {
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(selectErrorMessage);
  const setError = () => dispatch(setErrorMessage(null));
  const controlInput = (setValue) => (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body || title.trim() === '' || body.trim() === '') {
      return dispatch(setErrorMessage('不能空白哦'));
    }
    dispatch(editPost({ id, title, body }));
    navigate('/react-blog/post/' + id);
  };

  useEffect(() => {
    dispatch(getPost(id)).then((res) => {
      if (res.userId !== userId) return navigate('/react-blog/');
      setTitle(res.title);
      setBody(res.body);
    });
  }, [dispatch, navigate, id, userId]);

  return (
    <Root>
      <Form onSubmit={handleSubmit} $width={460} $paddingType={'post'}>
        <TitleWrapper>
          <Title>編輯文章 #{id}</Title>
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
            onChange={controlInput(setBody)}
            onFocus={setError}
          />
        </InputWrapper>

        <SubmitButton>送出文章</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Root>
  );
}
