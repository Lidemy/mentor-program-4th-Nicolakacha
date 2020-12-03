import { createSlice } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, getMeAPI } from '../WebAPI';
import { setAuthToken, getAuthToken } from '../utils';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userErrorMessage: null,
    isUserLoading: false,
  },

  reducers: {
    setIsUserLoading(state, action) {
      state.isUserLoading = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserErrorMessage(state, action) {
      state.userErrorMessage = action.payload;
    },
  },
});

export const selectUserId = (store) => store.user.userId;
export const selectIsUserLoading = (store) => store.user.isUserLoading;
export const selectUserErrorMessage = (store) => store.user.userErrorMessage;

export const {
  setIsUserLoading,
  setUserId,
  setUserErrorMessage,
} = userSlice.actions;

const checkToken = (res, dispatch) => {
  if (res.ok === 1) {
    return setAuthToken(res.token);
  }
  console.log(res)
  dispatch(setUserErrorMessage(res.message));
};

export const login = (user) => async (dispatch) => {
  dispatch(setIsUserLoading(true));
  await loginAPI(user).then((res) => checkToken(res, dispatch));
  return dispatch(getMe());
};

export const register = (user) => async (dispatch) => {
  dispatch(setIsUserLoading(true));
  await registerAPI(user).then((res) => checkToken(res, dispatch));
  return dispatch(getMe());
};

export const getMe = () => (dispatch) => {
  dispatch(setIsUserLoading(true));
  if (getAuthToken()) {
    return getMeAPI().then((res) => {
      dispatch(setIsUserLoading(false));
      if (res.ok !== 1) {
        setAuthToken(null);
        return;
      }
      dispatch(setUserId(res.data.id));
      return res.data.id;
    });
  }
  dispatch(setIsUserLoading(false));
};

export const logout = () => (dispatch) => {
  setAuthToken('');
  dispatch(setUserId(null));
  alert('登出成功');
};

export default userSlice.reducer;
