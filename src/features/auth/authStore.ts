import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { getToken, getUserInfo } from './shared';

const initialState = {
  authComponent: {
    body: [],
    initialValues: {},
    loginApi: '',
    title: 'QuarkUI',
    userInfoApi: '',
    userRoutesApi: ''
  },
  token: getToken(),
  userInfo: getUserInfo()
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setAuthComponent: (state, { payload }: PayloadAction<Api.Auth.AuthComponent>) => {
      state.authComponent = {
        ...state.authComponent,
        ...payload
      };
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<Api.Auth.UserInfo>) => {
      state.userInfo = {
        ...state.userInfo,
        ...payload
      };
    }
  },
  selectors: {
    selectAuthComponent: auth => auth.authComponent,
    selectToken: auth => auth.token,
    selectUserInfo: auth => auth.userInfo
  }
});

export const { resetAuth, setAuthComponent, setToken, setUserInfo } = authSlice.actions;

export const { selectAuthComponent, selectToken, selectUserInfo } = authSlice.selectors;

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** Is static super role */
export const isStaticSuper = createSelector([selectUserInfo], userInfo => {
  const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

  return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
});
