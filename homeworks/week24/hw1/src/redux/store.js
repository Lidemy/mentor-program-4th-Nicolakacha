import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postsSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
});

export default store;
