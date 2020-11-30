import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import { getMe } from '../../redux/userSlice';
import {
  AboutMePage,
  LoginPage,
  HomePage,
  NewPostPage,
  PostPage,
  PostsPage,
  EditPostPage,
  RegisterPage,
} from '../../pages/';

const Root = styled.div`
  padding-top: 84px;
`;

const Footer = styled.div`
  background: rgb(49 49 49);
  padding: 6px 0;
  bottom: 0;
  width: 100%;
  color: whitesmoke;
  text-align: center;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch]);

  return (
    <Root>
      <BrowserRouter>
        <Navbar />
        <Routes basename="/react-blog">
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/posts'} element={<PostsPage />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/post/edit/:id'} element={<EditPostPage />} />
          <Route path={'/new-post'} element={<NewPostPage />} />
          <Route path={'/about-me'} element={<AboutMePage />} />
        </Routes>
        <Footer>Made with ❤️ by Nicolas</Footer>
      </BrowserRouter>
    </Root>
  );
}

export default App;
