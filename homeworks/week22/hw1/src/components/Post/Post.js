import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostContainer = styled.div`
  padding: 20px;
  margin: 10px 0;
  justify-content: space-between;
`;

const PostTitle = styled.h2`
  font-size: 24px;
`;

const PostDate = styled.div`
  padding-bottom: 20px;
  color: #707070;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const PostBody = styled.div`
  margin-top: 20px;
`;

export default function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}