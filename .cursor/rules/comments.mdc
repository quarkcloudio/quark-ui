---
description:
globs:
alwaysApply: false
---
# SoybeanAdmin React 注释规范

## 概述

本文档定义了 SoybeanAdmin React 项目的注释规范，旨在提高代码的可读性、可维护性和团队协作效率。良好的注释是代码自文档化的重要组成部分。

## 注释基本原则

### 🎯 核心原则

1. **注释要说明"为什么"，而不是"做什么"**
2. **注释应该是代码的补充，而不是重复**
3. **保持注释与代码同步更新**
4. **使用中文注释，提高团队理解效率**
5. **遵循统一的注释格式和风格**

### ⚡ 何时需要注释

```typescript
// ✅ 需要注释的场景
// 1. 复杂的业务逻辑
// 2. 算法实现
// 3. 魔法数字和常量
// 4. API 接口说明
// 5. 公共组件和工具函数
// 6. 临时解决方案（TODO/FIXME）

// ❌ 不需要注释的场景
// 1. 自解释的代码
// 2. 简单的变量赋值
// 3. 显而易见的操作
```

## JSDoc 注释规范

### 📝 函数注释

**规则：使用 JSDoc 风格，包含描述、参数、返回值**

```typescript
// ✅ 正确示例
/**
 * 格式化日期
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式化模板，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // '2024-01-15'
 * formatDate(1642204800000, 'MM/DD/YYYY') // '01/15/2022'
 */
export const formatDate = (
  date: Date | number | string,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  // 实现逻辑
  return dayjs(date).format(format);
};

/**
 * 防抖函数 - 在指定时间内多次调用只执行最后一次
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 * @example
 * const debouncedSearch = debounce(search, 300);
 * debouncedSearch('keyword'); // 300ms 后执行
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
};

/**
 * 深拷贝对象或数组
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的新对象
 * @throws {Error} 当对象包含循环引用时抛出错误
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  // 实现逻辑
};

// ❌ 错误示例
// 缺少注释
export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

// 注释过于简单，没有提供有用信息
/**
 * 格式化日期
 */
export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};
```

### 🏗️ 类和接口注释

```typescript
// ✅ 正确示例
/**
 * 用户信息接口
 * @description 定义用户的基本信息结构
 */
interface UserInfo {
  /** 用户唯一标识 */
  id: string;
  /** 用户名 */
  name: string;
  /** 邮箱地址 */
  email: string;
  /** 用户角色 */
  role: 'admin' | 'user' | 'guest';
  /** 账户创建时间 */
  createTime: string;
  /** 最后更新时间 */
  updateTime: string;
  /** 是否激活 */
  isActive: boolean;
}

/**
 * API 响应数据结构
 * @template T 响应数据的类型
 */
interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 请求是否成功 */
  success: boolean;
}

/**
 * 用户服务类
 * @description 处理用户相关的 API 请求
 */
class UserService {
  private apiClient: ApiClient;

  /**
   * 构造函数
   * @param apiClient API 客户端实例
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * 获取用户列表
   * @param params 查询参数
   * @returns Promise<UserListResponse>
   */
  async getUserList(params: UserListParams): Promise<UserListResponse> {
    return this.apiClient.get('/users', { params });
  }
}
```

### 🧩 组件注释

```typescript
// ✅ 正确示例
/**
 * 用户信息卡片组件
 * @description 展示用户基本信息，支持编辑和删除操作
 * @author 张三
 * @since 1.0.0
 */
interface UserCardProps {
  /** 用户信息对象 */
  user: UserInfo;
  /** 是否显示操作按钮 */
  showActions?: boolean;
  /** 卡片尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 编辑回调函数 */
  onEdit?: (user: UserInfo) => void;
  /** 删除回调函数 */
  onDelete?: (userId: string) => void;
}

/**
 * 用户信息卡片组件
 * @param props 组件属性
 * @returns JSX.Element
 */
const UserCard: React.FC<UserCardProps> = ({
  user,
  showActions = true,
  size = 'medium',
  onEdit,
  onDelete
}) => {
  // 处理编辑操作
  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [user, onEdit]);

  // 处理删除操作
  const handleDelete = useCallback(() => {
    if (window.confirm('确认删除此用户？')) {
      onDelete?.(user.id);
    }
  }, [user.id, onDelete]);

  return (
    <Card className={`user-card user-card--${size}`}>
      {/* 用户头像区域 */}
      <div className="user-card__avatar">
        <Avatar size={size === 'large' ? 64 : 48} src={user.avatar} />
      </div>

      {/* 用户信息区域 */}
      <div className="user-card__info">
        <h3 className="user-card__name">{user.name}</h3>
        <p className="user-card__email">{user.email}</p>
        <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
          {user.role}
        </Tag>
      </div>

      {/* 操作按钮区域 */}
      {showActions && (
        <div className="user-card__actions">
          <Button size="small" onClick={handleEdit}>
            编辑
          </Button>
          <Button size="small" danger onClick={handleDelete}>
            删除
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserCard;
```

### 🪝 Hook 注释

```typescript
// ✅ 正确示例
/**
 * 用户信息管理 Hook
 * @description 提供用户信息的获取、更新和缓存功能
 * @param userId 用户ID
 * @returns 用户信息和相关操作方法
 * @example
 * const { user, loading, updateUser, refreshUser } = useUserInfo('123');
 */
export const useUserInfo = (userId: string) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取用户信息
  const fetchUser = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUserById(userId);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取用户信息失败');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 更新用户信息
  const updateUser = useCallback(async (updates: Partial<UserInfo>) => {
    if (!user) return;

    try {
      const updatedUser = await updateUserById(user.id, updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新用户信息失败');
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
    updateUser,
    refreshUser: fetchUser
  };
};
```

## 行内注释规范

### 💬 单行注释

```typescript
// ✅ 正确示例
// 计算用户权限等级（1-5级，5级为最高权限）
const calculateUserLevel = (permissions: string[]) => {
  // 管理员权限直接返回最高等级
  if (permissions.includes('admin')) {
    return 5;
  }

  // 根据权限数量计算等级
  const level = Math.min(Math.floor(permissions.length / 2) + 1, 4);
  return level;
};

// 处理API响应错误
const handleApiError = (error: ApiError) => {
  // 401 未授权，跳转到登录页
  if (error.code === 401) {
    router.push('/login');
    return;
  }

  // 403 权限不足，显示错误提示
  if (error.code === 403) {
    notification.error({
      message: '权限不足',
      description: '您没有执行此操作的权限'
    });
    return;
  }

  // 其他错误显示通用错误信息
  notification.error({
    message: '操作失败',
    description: error.message || '请稍后重试'
  });
};

// ❌ 错误示例
const userName = 'admin'; // 用户名  <- 无意义的注释
const age = 25; // 年龄是25  <- 重复代码内容
// 这是一个函数  <- 太泛泛的注释
function getData() {
  return data;
}
```

### 🏷️ 特殊标记注释

```typescript
// ✅ 正确示例
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // TODO: 添加用户头像上传功能
  // 计划在下个版本中实现头像拖拽上传

  // FIXME: 修复在移动端显示异常的问题
  // 当前在 iOS Safari 中用户信息卡片会出现布局错乱

  // HACK: 临时解决方案 - 强制刷新组件
  // 等待 React 18 并发特性稳定后重构此部分代码
  const [forceUpdate, setForceUpdate] = useState(0);

  // NOTE: 这里使用了特殊的数据格式
  // 服务端返回的时间格式为 Unix timestamp，需要转换
  const formattedTime = useMemo(() => {
    return dayjs.unix(user.createTime).format('YYYY-MM-DD HH:mm:ss');
  }, [user.createTime]);

  // WARNING: 此方法会修改原始对象
  // 调用前请确认是否需要深拷贝
  const processUserData = (userData: UserInfo) => {
    userData.name = userData.name.trim();
    return userData;
  };

  return (
    <div className="user-profile">
      {/* 用户基本信息 */}
      <div className="user-profile__basic">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      {/* 用户详细信息 */}
      <div className="user-profile__details">
        <p>创建时间: {formattedTime}</p>
        <p>用户角色: {user.role}</p>
      </div>
    </div>
  );
};
```

### 📝 特殊标记说明

| 标记 | 用途 | 示例 |
|------|------|------|
| `TODO` | 计划添加的功能 | `// TODO: 添加数据导出功能` |
| `FIXME` | 需要修复的问题 | `// FIXME: 修复内存泄漏问题` |
| `HACK` | 临时解决方案 | `// HACK: 绕过第三方库的bug` |
| `NOTE` | 重要说明 | `// NOTE: 此API在v2.0中已废弃` |
| `WARNING` | 警告信息 | `// WARNING: 此操作不可逆` |
| `OPTIMIZE` | 性能优化点 | `// OPTIMIZE: 考虑使用虚拟滚动` |
| `REVIEW` | 需要代码审查 | `// REVIEW: 确认业务逻辑是否正确` |


## API 和配置注释

### 🌐 API 接口注释

```typescript
// ✅ 正确示例
/**
 * 用户相关 API 接口
 */
export const userApi = {
  /**
   * 获取用户列表
   * @param params 查询参数
   * @param params.page 页码，从1开始
   * @param params.pageSize 每页数量，默认20
   * @param params.keyword 搜索关键词，支持用户名和邮箱搜索
   * @param params.role 用户角色筛选
   * @param params.status 用户状态筛选
   * @returns Promise<UserListResponse> 用户列表数据
   * @example
   * const result = await userApi.fetchUserList({
   *   page: 1,
   *   pageSize: 20,
   *   keyword: 'admin'
   * });
   */
  fetchUserList: (params: UserListParams) => {
    return request<UserListResponse>({
      url: '/api/users',
      method: 'GET',
      params
    });
  },

  /**
   * 根据ID获取用户详情
   * @param id 用户ID
   * @returns Promise<UserInfo> 用户详细信息
   * @throws {ApiError} 当用户不存在时抛出404错误
   */
  fetchUserById: (id: string) => {
    return request<UserInfo>({
      url: `/api/users/${id}`,
      method: 'GET'
    });
  },

  /**
   * 创建新用户
   * @param userData 用户数据
   * @returns Promise<UserInfo> 创建成功的用户信息
   * @throws {ValidationError} 当数据验证失败时抛出400错误
   */
  createUser: (userData: CreateUserData) => {
    return request<UserInfo>({
      url: '/api/users',
      method: 'POST',
      data: userData
    });
  }
};
```

### ⚙️ 配置文件注释

```typescript
// ✅ 正确示例
/**
 * 应用配置
 * @description 包含应用的基本配置信息
 */
export const appConfig = {
  /** 应用名称 */
  name: 'SoybeanAdmin',

  /** 应用版本 */
  version: '1.0.0',

  /** 应用描述 */
  description: '基于 React + TypeScript 的后台管理系统',

  /** 默认语言 */
  defaultLang: 'zh-CN',

  /** 是否启用国际化 */
  enableI18n: true,

  /**
   * 分页配置
   * @description 表格分页的默认配置
   */
  pagination: {
    /** 默认页码 */
    defaultPage: 1,
    /** 默认每页数量 */
    defaultPageSize: 20,
    /** 每页数量选项 */
    pageSizeOptions: ['10', '20', '50', '100'],
    /** 是否显示快速跳转 */
    showQuickJumper: true,
    /** 是否显示总数 */
    showTotal: true
  },

  /**
   * 请求配置
   * @description HTTP请求的默认配置
   */
  request: {
    /** 请求超时时间（毫秒） */
    timeout: 10000,
    /** 基础URL */
    baseURL: import.meta.env.VITE_API_BASE_URL,
    /** 重试次数 */
    retryCount: 3,
    /** 重试间隔（毫秒） */
    retryDelay: 1000
  }
};

/**
 * 主题配置
 * @description 定义应用的主题样式配置
 */
export const themeConfig = {
  /** 默认主题模式 */
  defaultMode: 'light' as const,

  /** 是否启用暗色模式 */
  enableDarkMode: true,

  /**
   * 主色调配置
   * @description 影响按钮、链接等主要元素的颜色
   */
  primaryColor: '#1890ff',

  /**
   * 成功状态颜色
   * @description 用于成功提示、完成状态等
   */
  successColor: '#52c41a',

  /**
   * 警告状态颜色
   * @description 用于警告提示、待处理状态等
   */
  warningColor: '#faad14',

  /**
   * 错误状态颜色
   * @description 用于错误提示、失败状态等
   */
  errorColor: '#ff4d4f'
};
```

## 注释最佳实践

### ✅ 推荐做法

```typescript
// 1. 解释复杂业务逻辑
const calculateUserScore = (user: UserInfo) => {
  // 用户评分算法：基础分数50分
  let score = 50;

  // 根据注册时长加分（每年+10分，最多+30分）
  const yearsSinceRegistration = dayjs().diff(user.registerTime, 'year');
  score += Math.min(yearsSinceRegistration * 10, 30);

  // 根据活跃度加分（每月活跃+5分，最多+20分）
  score += Math.min(user.activeMonths * 5, 20);

  // 违规记录扣分（每次违规-10分）
  score -= user.violationCount * 10;

  // 确保分数在0-100范围内
  return Math.max(0, Math.min(100, score));
};

// 2. 解释魔法数字
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB - 用户头像上传限制
const DEBOUNCE_DELAY = 300; // 300ms - 搜索防抖延迟，平衡用户体验和性能

// 3. 解释复杂的正则表达式
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱格式验证正则

// 4. 解释算法思路
const quickSort = (arr: number[]): number[] => {
  // 快速排序算法实现
  // 选择最后一个元素作为基准点，分为小于和大于基准的两部分
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x <= pivot);
  const right = arr.slice(0, -1).filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
};
```

### ❌ 避免的做法

```typescript
// ❌ 不要重复代码
const userName = 'admin'; // 设置用户名为admin

// ❌ 不要注释显而易见的代码
const sum = a + b; // 把a和b相加

// ❌ 不要使用过时的注释
const fetchUserData = async () => {
  // 使用axios发送请求 <- 实际代码已改为fetch
  return fetch('/api/users');
};

// ❌ 不要使用无意义的注释
// 这是一个函数
function getData() {
  return data;
}

// ❌ 不要使用英文注释（在中文团队中）
// Get user information from server
const getUserInfo = () => {
  // Implementation
};
```

## 注释维护

### 🔄 注释更新原则

1. **代码修改时同步更新注释**
2. **删除过时和无效的注释**
3. **定期审查注释的准确性**
4. **保持注释格式的一致性**

### 📋 代码审查检查清单

- [ ] 所有公共函数都有JSDoc注释
- [ ] 复杂业务逻辑有说明注释
- [ ] 魔法数字有解释说明
- [ ] TODO/FIXME等标记有明确描述
- [ ] 注释内容与代码实现一致
- [ ] 注释语言统一（推荐中文）
- [ ] 注释格式规范统一

## 总结

### 📝 注释规范速查表

| 注释类型 | 格式 | 适用场景 |
|---------|------|----------|
| JSDoc注释 | `/** */` | 函数、类、接口、组件 |
| 单行注释 | `//` | 行内说明、简短解释 |
| 多行注释 | `/* */` | 大段说明、临时禁用代码 |
| 特殊标记 | `// TODO:` | 待办事项、问题标记 |

### 🎯 注释质量标准

**高质量注释的特征：**
- 解释代码的"为什么"而不是"是什么"
- 提供有价值的上下文信息
- 格式规范，易于阅读
- 与代码保持同步
- 使用合适的语言（团队统一）

**避免的注释：**
- 重复代码内容的注释
- 过时不准确的注释
- 过于显而易见的注释
- 格式不规范的注释
- 语言不统一的注释
- 不需要头部文件注释

遵循这些注释规范将大大提高代码的可读性和可维护性，让团队协作更加高效！
