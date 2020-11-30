import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import Post from '../../components/Post';

import {
  getLimitedPosts,
  selectPosts,
  selectIsLoading,
} from '../../redux/postsSlice';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 123px);
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const LatestPosts = ({ posts }) =>
  posts.slice(0, 5).map((post) => <Post key={post.id} post={post} />);

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);
  useEffect(() => dispatch(getLimitedPosts(1, 5)), [dispatch]);

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>最新文章</Title>
          <LatestPosts posts={posts} />
        </>
      )}
    </Root>
  );
}
