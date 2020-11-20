import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../WebAPI';
import { LoadingContext } from '../../contexts';
import Post from '../../components/Post';
import styled from 'styled-components';
import Loading from '../../components/Loading';

const Root = styled.div`
  margin: 0 10vw;
  min-height: calc(100vh - 123px);
`;

export default function PostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id).then((post) => setPost(post[0]));
    setIsLoading(false);
  }, [id, setIsLoading]);

  return (<Root>
    {(!isLoading && post) ? <Post post={post} /> : <Loading />}
    </Root>);
}
