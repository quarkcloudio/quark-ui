---
description:
globs:
alwaysApply: false
---
# SoybeanAdmin React TypeScript 规范

## 概述

本文档定义了 SoybeanAdmin React 项目的 TypeScript 使用规范，旨在确保类型安全、提高代码质量和团队协作效率。严格遵循这些规范将帮助我们构建类型安全、可维护的应用程序。

## 基本原则

### 🎯 核心原则

1. **类型安全优先**：所有组件和函数必须提供准确的类型定义
2. **避免类型逃逸**：禁止使用 `any` 类型，必要时使用 `unknown`
3. **明确胜过隐式**：显式声明类型比依赖推断更可靠
4. **一致性标准**：使用统一的类型定义和命名约定
5. **编译零错误**：确保编译无任何类型错误或警告

### ⚠️ 严格规则

```typescript
// ✅ 正确做法
// 1. 禁止使用 any，必要时使用 unknown
function processData(data: unknown): ProcessedData {
  if (typeof data === 'object' && data !== null) {
    return data as ProcessedData;
  }
  throw new Error('Invalid data format');
}

// 2. 所有导出类型统一从 src/types 出口引入
import type { UserInfo, ApiResponse } from '@/types';

// 3. 枚举优先使用 const enum
const enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

// 4. 函数参数与返回值必须明确声明类型
function calculateScore(user: UserInfo, factors: ScoreFactor[]): number {
  // 实现逻辑
  return 0;
}

// 5. 类型别名使用 type，对象结构使用 interface
type Theme = 'light' | 'dark' | 'auto';

interface UserInfo {
  id: string;
  name: string;
  role: UserRole;
}

// ❌ 错误做法
function processData(data: any): any { // 禁止使用 any
  return data;
}

enum UserRole { // 不推荐使用普通 enum
  Admin = 'admin',
  User = 'user'
}

function calculate(user, factors) { // 缺少类型声明
  return 0;
}
```

## 组件类型定义

### 🧩 React 组件规范

```typescript
// ✅ 正确示例
/**
 * 用户信息卡片组件属性
 * @description 定义用户卡片组件的所有属性类型
 */
interface UserCardProps {
  /** 用户信息对象 */
  user: UserInfo;
  /** 卡片尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否显示操作按钮 */
  showActions?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 点击编辑时的回调函数 */
  onEdit?: (user: UserInfo) => void;
  /** 点击删除时的回调函数 */
  onDelete?: (userId: string) => Promise<void>;
  /** 自定义渲染函数 */
  renderExtra?: (user: UserInfo) => React.ReactNode;
}

/**
 * 用户卡片组件状态
 */
interface UserCardState {
  isLoading: boolean;
  error: string | null;
  isExpanded: boolean;
}

/**
 * 用户信息卡片组件
 * @param props 组件属性
 * @returns JSX 元素
 */
const UserCard: React.FC<UserCardProps> = ({
  user,
  size = 'medium',
  showActions = true,
  className,
  onEdit,
  onDelete,
  renderExtra
}) => {
  const [state, setState] = useState<UserCardState>({
    isLoading: false,
    error: null,
    isExpanded: false
  });

  // 处理编辑操作
  const handleEdit = useCallback((): void => {
    onEdit?.(user);
  }, [user, onEdit]);

  // 处理删除操作
  const handleDelete = useCallback(async (): Promise<void> => {
    if (!onDelete) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await onDelete(user.id);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '删除失败'
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [user.id, onDelete]);

  return (
    <div className={clsx('user-card', `user-card--${size}`, className)}>
      {/* 组件实现 */}
    </div>
  );
};

export default UserCard;

// 导出组件类型供外部使用
export type { UserCardProps, UserCardState };
```



## 泛型使用规范

### 🔗 泛型最佳实践

```typescript
// ✅ 正确示例
/**
 * 通用表格组件属性
 * @template T 表格数据项的类型
 */
interface TableProps<T extends Record<string, any> = Record<string, any>> {
  /** 表格数据 */
  data: T[];
  /** 表格列配置 */
  columns: TableColumn<T>[];
  /** 是否加载中 */
  loading?: boolean;
  /** 行点击事件 */
  onRowClick?: (record: T, index: number) => void;
  /** 行选择事件 */
  onSelectionChange?: (selectedRows: T[]) => void;
}

/**
 * 表格列配置
 * @template T 数据项类型
 */
interface TableColumn<T> {
  /** 列标题 */
  title: string;
  /** 数据字段键 */
  dataIndex: keyof T;
  /** 列宽度 */
  width?: number;
  /** 自定义渲染函数 */
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  /** 排序配置 */
  sorter?: boolean | ((a: T, b: T) => number);
}

/**
 * API 响应数据结构
 * @template T 响应数据类型
 */
interface ApiResponse<T = any> {
  /** 状态码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 请求是否成功 */
  success: boolean;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 分页响应数据
 * @template T 列表项类型
 */
interface PaginatedResponse<T> {
  /** 数据列表 */
  list: T[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  totalPages: number;
}

/**
 * 表单字段配置
 * @template T 表单数据类型
 */
interface FormField<T extends Record<string, any>> {
  /** 字段名 */
  name: keyof T;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: 'input' | 'select' | 'textarea' | 'number' | 'date';
  /** 是否必填 */
  required?: boolean;
  /** 验证规则 */
  validator?: (value: T[keyof T]) => string | undefined;
  /** 字段选项（用于 select 类型） */
  options?: Array<{ label: string; value: T[keyof T] }>;
}

// 使用泛型的实际示例
const UserTable: React.FC<TableProps<UserInfo>> = ({ data, columns, loading, onRowClick }) => {
  // 实现逻辑
  return <div>User Table</div>;
};

// 为复杂泛型提供类型别名
type UserTableProps = TableProps<UserInfo>;
type UserApiResponse = ApiResponse<UserInfo>;
type UserListResponse = ApiResponse<PaginatedResponse<UserInfo>>;
```

### 🔒 泛型约束

```typescript
// ✅ 正确示例
/**
 * 确保泛型 T 包含 id 属性
 */
interface HasId {
  id: string;
}

/**
 * 通用删除函数
 * @template T 必须包含 id 属性的类型
 */
function deleteItem<T extends HasId>(item: T): Promise<void> {
  return fetch(`/api/items/${item.id}`, { method: 'DELETE' }).then();
}

/**
 * 键值对类型约束
 * @template K 键类型，必须是字符串
 * @template V 值类型
 */
interface KeyValuePair<K extends string, V> {
  key: K;
  value: V;
}

/**
 * 确保对象类型约束
 * @template T 必须是对象类型
 */
function cloneObject<T extends Record<string, any>>(obj: T): T {
  return { ...obj };
}

/**
 * React 组件 Props 约束
 * @template P 组件 Props 类型
 */
type ComponentWithProps<P extends Record<string, any>> = React.FC<P>;
```

## 类型合并与扩展

### 🔀 交叉类型和联合类型

```typescript
// ✅ 正确示例
/**
 * 基础用户信息
 */
interface BaseUser {
  id: string;
  name: string;
  email: string;
}

/**
 * 用户权限信息
 */
interface UserPermissions {
  role: UserRole;
  permissions: string[];
  canEdit: boolean;
  canDelete: boolean;
}

/**
 * 用户活动信息
 */
interface UserActivity {
  lastLogin: string;
  loginCount: number;
  isActive: boolean;
}

// 使用交叉类型合并多个接口
type FullUserInfo = BaseUser & UserPermissions & UserActivity;

// 使用工具类型修改现有类型
type PartialUser = Partial<BaseUser>; // 所有属性可选
type UserNameAndEmail = Pick<BaseUser, 'name' | 'email'>; // 只选择特定属性
type UserWithoutId = Omit<BaseUser, 'id'>; // 排除特定属性
type RequiredUser = Required<Partial<BaseUser>>; // 所有属性必填

/**
 * 扩展 HTML 元素属性
 */
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'danger';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否加载中 */
  loading?: boolean;
  /** 图标组件 */
  icon?: React.ReactNode;
}

/**
 * 条件类型示例
 */
type ApiResponseType<T> = T extends string
  ? { message: T }
  : T extends number
  ? { code: T }
  : { data: T };

/**
 * 映射类型示例
 */
type ReadonlyUser = {
  readonly [K in keyof BaseUser]: BaseUser[K];
};

type OptionalUser = {
  [K in keyof BaseUser]?: BaseUser[K];
};
```

## 枚举和常量

### 📝 枚举使用规范

```typescript
// ✅ 推荐：使用 const enum 和联合类型
/**
 * 用户角色枚举
 */
const enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
  SuperAdmin = 'super_admin'
}

/**
 * 请求状态枚举
 */
const enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

// 使用联合类型和 as const
const THEME_MODES = ['light', 'dark', 'auto'] as const;
type ThemeMode = typeof THEME_MODES[number]; // 'light' | 'dark' | 'auto'

const HTTP_STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_ERROR: 500
} as const;

type HttpStatusCode = typeof HTTP_STATUS_CODES[keyof typeof HTTP_STATUS_CODES];

/**
 * 复杂常量配置
 */
const APP_CONFIG = {
  api: {
    baseURL: 'https://api.example.com',
    timeout: 10000,
    retryCount: 3
  },
  ui: {
    defaultPageSize: 20,
    maxPageSize: 100,
    themes: THEME_MODES
  },
  features: {
    enableDarkMode: true,
    enableI18n: true,
    enablePWA: false
  }
} as const;

type AppConfig = typeof APP_CONFIG;

// 类型守卫函数
/**
 * 检查是否为有效的用户角色
 */
function isValidUserRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

/**
 * 检查是否为有效的主题模式
 */
function isValidThemeMode(mode: string): mode is ThemeMode {
  return THEME_MODES.includes(mode as ThemeMode);
}

// ❌ 不推荐：使用普通 enum
enum BadExample {
  Value1 = 'value1',
  Value2 = 'value2'
}
```

## 类型推断与断言

### 🔍 类型守卫和断言

```typescript
// ✅ 正确示例
/**
 * 类型谓词函数 - 检查是否为用户对象
 */
function isUser(obj: unknown): obj is UserInfo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  );
}

/**
 * 类型守卫 - 检查错误对象
 */
function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof Error &&
    'code' in error &&
    'status' in error &&
    typeof (error as any).code === 'number'
  );
}

/**
 * 使用 typeof 进行类型守卫
 */
function processValue(value: string | number): string {
  if (typeof value === 'string') {
    // TypeScript 知道这里 value 是 string 类型
    return value.toUpperCase();
  }

  // TypeScript 知道这里 value 是 number 类型
  return value.toString();
}

/**
 * 使用 instanceof 进行类型守卫
 */
function handleError(error: Error | string): void {
  if (error instanceof Error) {
    // error 是 Error 类型
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  } else {
    // error 是 string 类型
    console.error('Error message:', error);
  }
}

/**
 * 安全的类型断言
 */
function processApiResponse(response: unknown): UserInfo[] {
  // 先进行类型检查，再进行断言
  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    Array.isArray((response as any).data)
  ) {
    const data = (response as { data: unknown[] }).data;

    // 进一步验证数组元素
    if (data.every(isUser)) {
      return data; // TypeScript 推断为 UserInfo[]
    }
  }

  throw new Error('Invalid API response format');
}

/**
 * 条件类型推断
 */
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
type StringArrayType = ExtractArrayType<string[]>; // string
type NumberArrayType = ExtractArrayType<number[]>; // number

/**
 * 工具函数 - 安全获取对象属性
 */
function safeGet<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K
): T[K] | undefined {
  return obj && typeof obj === 'object' ? obj[key] : undefined;
}

// ❌ 避免的做法
function badExample(data: unknown): UserInfo {
  return data as UserInfo; // 危险的强制断言
}

function alsobad(user: UserInfo): string {
  return (user as any).someProperty; // 使用 any 绕过类型检查
}
```

## Hook 类型定义

### 🪝 自定义 Hook 规范

```typescript
// ✅ 正确示例
/**
 * 用户信息管理 Hook 的返回类型
 */
interface UseUserInfoReturn {
  /** 用户信息 */
  user: UserInfo | null;
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 刷新用户信息 */
  refresh: () => Promise<void>;
  /** 更新用户信息 */
  updateUser: (updates: Partial<UserInfo>) => Promise<void>;
}

/**
 * 用户信息管理 Hook
 * @param userId 用户ID
 * @returns 用户信息和相关操作方法
 */
function useUserInfo(userId: string): UseUserInfoReturn {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (): Promise<void> => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUserById(userId);
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取用户信息失败';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUser = useCallback(async (updates: Partial<UserInfo>): Promise<void> => {
    if (!user) return;

    try {
      const updatedUser = await updateUserById(user.id, updates);
      setUser(updatedUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '更新用户信息失败';
      setError(errorMessage);
      throw err;
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refresh: fetchUser,
    updateUser
  };
}

/**
 * 表格数据管理 Hook
 * @template T 表格数据项类型
 */
interface UseTableOptions<T> {
  /** 数据获取函数 */
  fetchData: (params: any) => Promise<PaginatedResponse<T>>;
  /** 默认查询参数 */
  defaultParams?: Record<string, any>;
  /** 是否自动加载 */
  autoLoad?: boolean;
}

interface UseTableReturn<T> {
  /** 表格数据 */
  data: T[];
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 分页信息 */
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  /** 查询参数 */
  params: Record<string, any>;
  /** 设置查询参数 */
  setParams: (newParams: Record<string, any>) => void;
  /** 刷新数据 */
  refresh: () => Promise<void>;
  /** 重置到第一页 */
  reset: () => void;
}

function useTable<T extends Record<string, any>>(
  options: UseTableOptions<T>
): UseTableReturn<T> {
  const { fetchData, defaultParams = {}, autoLoad = true } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });
  const [params, setParams] = useState(defaultParams);

  const loadData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData({
        ...params,
        page: pagination.current,
        pageSize: pagination.pageSize
      });

      setData(response.list);
      setPagination(prev => ({
        ...prev,
        total: response.total
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '加载数据失败';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchData, params, pagination.current, pagination.pageSize]);

  const handleSetParams = useCallback((newParams: Record<string, any>): void => {
    setParams(newParams);
    setPagination(prev => ({ ...prev, current: 1 }));
  }, []);

  const reset = useCallback((): void => {
    setParams(defaultParams);
    setPagination(prev => ({ ...prev, current: 1 }));
  }, [defaultParams]);

  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [loadData, autoLoad]);

  return {
    data,
    loading,
    error,
    pagination,
    params,
    setParams: handleSetParams,
    refresh: loadData,
    reset
  };
}
```

## JSDoc 注释规范

### 📚 TypeScript JSDoc

```typescript
// ✅ 正确示例
/**
 * 用户服务类
 * @description 提供用户相关的API操作和数据管理功能
 * @since 1.0.0
 * @author 张三 <zhangsan@example.com>
 */
class UserService {
  private apiClient: ApiClient;

  /**
   * 构造函数
   * @param apiClient API客户端实例
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * 获取用户列表
   * @template T 用户数据类型，默认为 UserInfo
   * @param params 查询参数
   * @param params.page 页码，从1开始
   * @param params.pageSize 每页数量，范围1-100
   * @param params.keyword 搜索关键词，支持用户名和邮箱
   * @returns Promise<PaginatedResponse<T>> 分页的用户列表
   * @throws {ApiError} 当请求失败时抛出API错误
   * @example
   * ```typescript
   * const userService = new UserService(apiClient);
   * const users = await userService.getUserList({
   *   page: 1,
   *   pageSize: 20,
   *   keyword: 'admin'
   * });
   * ```
   */
  async getUserList<T extends UserInfo = UserInfo>(
    params: UserListParams
  ): Promise<PaginatedResponse<T>> {
    const response = await this.apiClient.get<PaginatedResponse<T>>('/users', {
      params
    });
    return response.data;
  }

  /**
   * 创建新用户
   * @param userData 用户数据
   * @param userData.name 用户名，长度2-50字符
   * @param userData.email 邮箱地址，必须符合邮箱格式
   * @param userData.role 用户角色，默认为'user'
   * @returns Promise<UserInfo> 创建成功的用户信息
   * @throws {ValidationError} 当数据验证失败时抛出验证错误
   * @throws {ConflictError} 当邮箱已存在时抛出冲突错误
   * @deprecated 使用 createUserV2 替代，将在 v2.0 版本中移除
   */
  async createUser(userData: CreateUserData): Promise<UserInfo> {
    const response = await this.apiClient.post<UserInfo>('/users', userData);
    return response.data;
  }
}

/**
 * 格式化用户显示名称
 * @param user 用户信息对象
 * @param options 格式化选项
 * @param options.showEmail 是否显示邮箱，默认false
 * @param options.showRole 是否显示角色，默认false
 * @returns 格式化后的显示名称
 * @example
 * ```typescript
 * const user: UserInfo = { name: '张三', email: 'zhang@example.com', role: 'admin' };
 *
 * formatUserDisplayName(user) // '张三'
 * formatUserDisplayName(user, { showEmail: true }) // '张三 (zhang@example.com)'
 * formatUserDisplayName(user, { showRole: true }) // '张三 [admin]'
 * ```
 */
function formatUserDisplayName(
  user: UserInfo,
  options: {
    showEmail?: boolean;
    showRole?: boolean;
  } = {}
): string {
  let displayName = user.name;

  if (options.showEmail && user.email) {
    displayName += ` (${user.email})`;
  }

  if (options.showRole && user.role) {
    displayName += ` [${user.role}]`;
  }

  return displayName;
}

/**
 * 通用数据转换函数
 * @template TInput 输入数据类型
 * @template TOutput 输出数据类型
 * @param data 输入数据
 * @param transformer 转换函数
 * @returns 转换后的数据
 * @example
 * ```typescript
 * const users = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
 * const userOptions = transformData(users, user => ({
 *   label: user.name,
 *   value: user.id
 * }));
 * ```
 */
function transformData<TInput, TOutput>(
  data: TInput[],
  transformer: (item: TInput, index: number) => TOutput
): TOutput[] {
  return data.map(transformer);
}
```

## 类型导出和模块化

### 📦 类型模块组织

```typescript
// ✅ src/types/index.ts - 统一类型出口
/**
 * 用户相关类型
 */
export type { UserInfo, UserRole, CreateUserData, UpdateUserData } from './user';

/**
 * API 相关类型
 */
export type { ApiResponse, ApiError, PaginatedResponse } from './api';

/**
 * 组件相关类型
 */
export type { TableProps, TableColumn, FormField } from './components';

/**
 * 应用配置类型
 */
export type { AppConfig, ThemeConfig, RouteConfig } from './config';

/**
 * 工具类型
 */
export type { DeepPartial, DeepRequired, ValueOf, KeysOfType } from './utils';

// ✅ src/types/user.ts
/**
 * 用户角色枚举
 */
export const enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户唯一标识 */
  id: string;
  /** 用户名 */
  name: string;
  /** 邮箱地址 */
  email: string;
  /** 用户角色 */
  role: UserRole;
  /** 头像URL */
  avatar?: string;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 是否激活 */
  isActive: boolean;
}

/**
 * 创建用户数据
 */
export interface CreateUserData {
  name: string;
  email: string;
  role?: UserRole;
  avatar?: string;
}

/**
 * 更新用户数据
 */
export type UpdateUserData = Partial<Omit<UserInfo, 'id' | 'createTime' | 'updateTime'>>;

// ✅ src/types/utils.ts - 工具类型
/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度必需类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 获取对象值的联合类型
 */
export type ValueOf<T> = T[keyof T];

/**
 * 获取指定类型的键
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * 条件类型 - 如果 T 是 U 的子类型则返回 X，否则返回 Y
 */
export type If<T extends U, U, X, Y> = T extends U ? X : Y;

/**
 * 函数参数类型
 */
export type FunctionArgs<T> = T extends (...args: infer A) => any ? A : never;

/**
 * 函数返回值类型
 */
export type FunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;
```


## 最佳实践总结

### ✅ 推荐做法

1. **使用统一的类型导入**
```typescript
// ✅ 正确
import type { UserInfo, ApiResponse } from '@/types';

// ❌ 错误
import { UserInfo } from '../types/user';
import { ApiResponse } from '../../types/api';
```

2. **明确的函数签名**
```typescript
// ✅ 正确
function processUsers(users: UserInfo[]): ProcessedUser[] {
  return users.map(transformUser);
}

// ❌ 错误
function processUsers(users: any): any {
  return users.map(transformUser);
}
```

3. **使用类型守卫而非断言**
```typescript
// ✅ 正确
if (isUserInfo(data)) {
  console.log(data.name); // TypeScript 知道 data 是 UserInfo
}

// ❌ 错误
console.log((data as UserInfo).name); // 危险的断言
```

4. **导出组件类型**
```typescript
// ✅ 正确
export default UserCard;
export type { UserCardProps };

// ❌ 错误
export default UserCard;
// 没有导出 Props 类型
```

### 📋 代码审查检查清单

- [ ] 所有函数都有明确的参数和返回值类型
- [ ] 没有使用 `any` 类型
- [ ] 所有接口和类型都有 JSDoc 注释
- [ ] 使用了合适的泛型约束
- [ ] 导出了所有公共类型
- [ ] 使用了统一的类型导入路径
- [ ] 枚举使用了 `const enum`
- [ ] 复杂类型有类型守卫函数
- [ ] 编译没有任何错误或警告

遵循这些 TypeScript 规范将确保项目具有良好的类型安全性、可维护性和开发体验！
