---
description:
globs:
alwaysApply: false
---
# 状态管理规范

## 1. Redux Toolkit 使用规范
```typescript
// features/auth/authStore.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 异步 action
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (userId: string) => {
    const response = await fetchUserById(userId);
    return response.data;
  }
);

// slice 定义
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
```

## 2. 状态管理最佳实践
- 使用 `createSlice` 定义状态和 reducers
- 异步操作使用 `createAsyncThunk`
- 避免在组件中直接修改状态
- 使用 `useSelector` 获取状态，`useDispatch` 派发 action
