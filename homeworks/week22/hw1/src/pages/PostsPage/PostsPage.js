import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getLimitedPosts } from '../../WebAPI';
import { LoadingContext } from '../../contexts';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

const Root = styled.div`
  margin: 0 10vw;
  height: calc(100vh - 123px);
`;

const PostsContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  algin-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 20px;
`;

const PostDate = styled.div`
  color: #707070;
`;

function PostItem({ post }) {
  return (
    <PostsContainer>
      <PostTitle to={`/react-blog/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostsContainer>
  );
}

export default function PostsPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [totalPostsNumber, setTotalPostsNumber] = useState();
  const [pagination, setPagination] = useState([]);
  const limit = 5;

  useEffect(() => {
    setIsLoading(() => true);
    getPosts().then((posts) => {
      const pages = Math.ceil(posts.length / limit);
      setTotalPostsNumber(posts.length);
      setPagination(Array.from({ length: pages }).map((_, i) => i + 1));
      getLimitedPosts(1, limit)
        .then((posts) => {
          setPosts(posts);
        })
        .then(() => {
          setIsLoading(() => false);
        });
    });
  }, [setIsLoading]);

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          {posts[0] &&
            posts.map((post) => <PostItem key={post.id} post={post} />)}
          <Pagination
            totalPostsNumber={totalPostsNumber}
            pagination={pagination}
            limit={limit}
            getData={getLimitedPosts}
            setValue={setPosts}
          />
        </>
      )}
    </Root>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
