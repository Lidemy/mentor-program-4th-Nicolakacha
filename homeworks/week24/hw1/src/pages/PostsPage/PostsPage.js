import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { MEDIA_QUERY_MD } from '../../constants/breakpoint';
import {
  getLimitedPosts,
  selectTotalPostsNumber,
  selectIsLoading,
  selectPosts,
  setPosts,
} from '../../redux/postsSlice';

const Root = styled.div`
  min-height: 90vh;
  margin-top: 20px;
  margin: 45px 10vw;
  ${MEDIA_QUERY_MD} {
    margin: 0 10vw;
  }
`;

const PostsContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  algin-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  ${MEDIA_QUERY_MD} {
    flex-direction: row;
  }
`;

const PostTitle = styled(Link)`
  font-size: 20px;
  ${MEDIA_QUERY_MD} {
    padding-bottom: 10px;
  }
`;

const PostDate = styled.div`
  color: #707070;
`;

function PostItem({ post }) {
  return (
    <PostsContainer>
      <PostTitle to={`/react-blog/post/${post.id}`}>
        {post.user.nickname.length > 10
          ? `[${post.user.nickname.slice(0, 9)}...的文章] `
          : `[${post.user.nickname}的文章] `}
        {post.title.length > 20
          ? `${post.title.slice(0, 20)}...`
          : `${post.title}`}
      </PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostsContainer>
  );
}

export default function PostsPage() {
  const [pagination, setPagination] = useState([]);
  const pages = useRef();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);
  const totalPostsNumber = useSelector(selectTotalPostsNumber);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getLimitedPosts(1, 5));
    pages.current = Math.ceil(totalPostsNumber / 5);
    setPagination(Array.from({ length: pages.current }).map((_, i) => i + 1));
  }, [dispatch, totalPostsNumber]);

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {posts[0] &&
            posts.map((post) => {
              return <PostItem key={post.id} post={post} />;
            })}

          <Pagination
            totalPostsNumber={totalPostsNumber}
            pagination={pagination}
            limit={5}
            getData={getLimitedPosts}
            setValue={setPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Root>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
