import { useEffect, useState, useContext } from 'react';
import { getPosts } from '../../WebAPI';
import { LoadingContext } from '../../contexts';
import Loading from '../../components/Loading';
import Post from '../../components/Post';
import styled from 'styled-components';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 123px);
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

function LatestPosts({ posts }) {
  return posts.slice(0, 5).map((post) => <Post key={post.id} post={post} />);
}

export default function HomePage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then((posts) => setPosts(posts))
      .then(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

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
