---
description:
globs:
alwaysApply: false
---
# API 请求规范

## 1. 请求函数命名和结构
```typescript
// service/api/user.ts
import { request } from '@/service/request';

// 获取用户列表
export const fetchUserList = (params: UserListParams) => {
  return request<UserListResponse>({
    url: '/user/list',
    method: 'GET',
    params,
  });
};

// 获取用户详情
export const fetchUserById = (id: string) => {
  return request<UserInfo>({
    url: `/user/${id}`,
    method: 'GET',
  });
};

// 创建用户
export const createUser = (data: CreateUserData) => {
  return request<ApiResponse>({
    url: '/user',
    method: 'POST',
    data,
  });
};

// 更新用户
export const updateUser = (id: string, data: UpdateUserData) => {
  return request<ApiResponse>({
    url: `/user/${id}`,
    method: 'PUT',
    data,
  });
};

// 删除用户
export const deleteUser = (id: string) => {
  return request<ApiResponse>({
    url: `/user/${id}`,
    method: 'DELETE',
  });
};
```

### 2. 类型定义规范
```typescript
// types/api.d.ts
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  createTime: string;
  updateTime: string;
}

interface UserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  role?: string;
}

interface UserListResponse {
  list: UserInfo[];
  total: number;
}
```

