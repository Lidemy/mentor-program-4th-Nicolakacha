import { createSlice } from '@reduxjs/toolkit';
import {
  getPostAPI,
  getPostsAPI,
  getLimitedPostsAPI,
  addPostAPI,
  editPostAPI,
  deletePostAPI,
} from '../WebAPI';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    totalPostNumber: null,
    posts: [],
    post: null,
    newPostResponse: null,
    errorMessage: null,
  },

  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setTotalPostsNumber(state, action) {
      state.totalPostNumber = action.payload.length;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setNewPostResponse(state, action) {
      state.newPostResponse = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const selectPost = (store) => store.posts.post;
export const selectPosts = (store) => store.posts.posts;
export const selectIsLoading = (store) => store.posts.isLoading;
export const selectNewPostResponse = (store) => store.posts.newPostResponse;
export const selectErrorMessage = (store) => store.posts.errorMessage;
export const selectTotalPostsNumber = (store) => store.posts.totalPostNumber;

export const {
  setPost,
  setPosts,
  setIsLoading,
  setErrorMessage,
  setTotalPostsNumber,
  setNewPostResponse,
} = postsSlice.actions;

export const getPosts = () => (dispatch) =>
  getPostsAPI().then((res) => dispatch(setTotalPostsNumber(res)));

export const getLimitedPosts = (page, limit) => async (dispatch) => {
  dispatch(setIsLoading(true));
  await getPostsAPI().then((res) => dispatch(setTotalPostsNumber(res)));
  getLimitedPostsAPI(page, limit).then((res) => {
    dispatch(setPosts(res));
    dispatch(setIsLoading(false));
  });
};

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getPostAPI(id).then((res) => {
    dispatch(setPost(res[0]));
    dispatch(setIsLoading(false));
    return res[0];
  });
};

export const addPost = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  return addPostAPI(data).then((res) => {
    dispatch(setNewPostResponse(res));
    dispatch(setIsLoading(false));
    return res;
  });
};

export const editPost = (data) => () => editPostAPI(data);

export const deletePost = (id) => () => deletePostAPI(id).then((res) => res);

export default postsSlice.reducer;
