import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../redux/userSlice';
import { deletePost, getLimitedPosts } from '../../redux/postsSlice';

const PostContainer = styled.div`
  padding: 20px;
  margin: 10px 0;
  justify-content: space-between;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  word-break: break-all;
`;

const PostDate = styled.div`
  color: #707070;
`;

const PostBody = styled.div`
  margin-top: 20px;
  word-break: break-all;
`;

const PostInfo = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const PostButton = styled(Button)`
  margin: 10px 20px 10px 0px;
`;

export default function Post({ post }) {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditPost = (id) => () => navigate(`/react-blog/post/edit/${id}`);

  const handleDeletePost = (postId) => () =>
    dispatch(deletePost(postId)).then((res) => {
      if (res.ok === 0) return;
      dispatch(getLimitedPosts(1, 5));
      navigate('/react-blog');
    });

  return (
    <PostContainer>
      <PostTitle>
        {userId === post.userId
          ? '[我的文章] '
          : `[${post.user.nickname}的文章] `}
        {post.title}
      </PostTitle>
      <PostInfo>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        {userId === post.userId ? (
          <>
            <PostButton onClick={handleEditPost(post.id)}>編輯</PostButton>
            <PostButton onClick={handleDeletePost(post.id)}> 刪除</PostButton>
          </>
        ) : null}
      </PostInfo>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
