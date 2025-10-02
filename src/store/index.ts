import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { authSlice } from '../features/auth/authStore';
import { routeSlice } from '../features/router/routeStore';
import { tabSlice } from '../features/tab/tabStore';
import { themeSlice } from '../features/theme';
import { appSlice } from '../layouts/appStore';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(appSlice, authSlice, themeSlice, routeSlice, tabSlice);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
