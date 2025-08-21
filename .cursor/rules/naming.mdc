---
description:
globs:
alwaysApply: false
---
# SoybeanAdmin React 命名规范

## 概述

本文档定义了 SoybeanAdmin React 项目的命名规范，旨在确保代码的一致性、可读性和可维护性。所有团队成员都应严格遵循这些规范。

## 文件和目录命名

### 📁 目录命名规范

**规则：统一使用小写字母 + 连字符（kebab-case）**

```bash
# ✅ 正确示例
src/
├── components/
├── pages/
├── user-center/
├── role-manage/
├── global-header/
├── theme-drawer/
├── multi-menu/
└── system-config/

# ❌ 错误示例
src/
├── userCenter/        # 不使用 camelCase
├── RoleManage/        # 不使用 PascalCase
├── global_header/     # 不使用 snake_case
└── SYSTEM_CONFIG/     # 不使用 UPPER_CASE
```

### 📄 文件命名规范

#### React 组件文件
- **页面组件**：`index.tsx`
- **动态路由**：`[id].tsx`、`[...slug].tsx`
- **布局组件**：`layout.tsx`
- **异步状态组件**：`loading.tsx`、`error.tsx`
- **普通组件**：使用 PascalCase，如 `UserProfile.tsx`

```bash
# ✅ 正确示例
components/
├── UserProfile.tsx
├── GlobalHeader.tsx
├── ThemeDrawer.tsx
└── DataTable.tsx

pages/
├── index.tsx
├── [id].tsx
├── [...slug].tsx
├── layout.tsx
├── loading.tsx
└── error.tsx

# ❌ 错误示例
components/
├── userProfile.tsx    # 不使用 camelCase
├── global-header.tsx  # 不使用 kebab-case
└── THEME_DRAWER.tsx   # 不使用 UPPER_CASE
```

#### 其他文件类型
```bash
# ✅ 样式文件
styles/
├── global.scss
├── user-card.module.scss
└── theme-config.css

# ✅ 工具文件
utils/
├── common.ts
├── date-format.ts
└── api-helper.ts

# ✅ 类型文件
types/
├── api.d.ts
├── user-info.d.ts
└── common.d.ts

# ✅ 配置文件
config/
├── app-config.ts
├── theme-config.ts
└── router-config.ts
```

## JavaScript/TypeScript 命名

### 🔤 变量命名

**规则：使用 camelCase**

```typescript
// ✅ 正确示例
const userName = 'admin';
const userAge = 25;
const isLoading = false;
const hasPermission = true;
const userList = [];
const currentUser = null;
const pageConfig = {};

// ❌ 错误示例
const user_name = 'admin';        // 不使用 snake_case
const UserAge = 25;               // 不使用 PascalCase
const is_loading = false;         // 不使用 snake_case
const HAS_PERMISSION = true;      // 不使用 UPPER_CASE
```

### 🔧 函数命名

**规则：使用 camelCase，动词开头**

```typescript
// ✅ 正确示例
function getUserInfo() {}
function handleClick() {}
function validateForm() {}
function formatDate() {}
function checkPermission() {}
function toggleTheme() {}
function calculateTotal() {}
function renderComponent() {}

// ❌ 错误示例
function GetUserInfo() {}         // 不使用 PascalCase
function handle_click() {}        // 不使用 snake_case
function user_info() {}           // 缺少动词
function VALIDATE_FORM() {}       // 不使用 UPPER_CASE
```

### 📦 常量命名

**规则：使用 UPPER_SNAKE_CASE**

```typescript
// ✅ 正确示例
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 20;
const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  THEME_CONFIG: 'theme_config',
  LANGUAGE: 'language'
};

const HTTP_STATUS = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

// ❌ 错误示例
const maxRetryCount = 3;          // 不使用 camelCase 表示常量
const apiBaseUrl = 'https://...'; // 不使用 camelCase 表示常量
const Max_Retry_Count = 3;        // 混合命名风格
```

### 🏗️ 类型和接口命名

**规则：使用 PascalCase**

```typescript
// ✅ 正确示例 - 接口
interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface ComponentProps {
  title: string;
  visible?: boolean;
  onClose?: () => void;
}

// ✅ 正确示例 - 类型别名
type Theme = 'light' | 'dark';
type UserRole = 'admin' | 'user' | 'guest';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ✅ 正确示例 - 泛型
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type ApiResult<T = any> = {
  success: boolean;
  data: T;
  error?: string;
};

// ❌ 错误示例
interface userInfo {}            // 不使用 camelCase
interface api_response {}        // 不使用 snake_case
interface COMPONENT_PROPS {}     // 不使用 UPPER_CASE
type theme = 'light' | 'dark';   // 不使用 camelCase
```

### 🏛️ 类命名

**规则：使用 PascalCase**

```typescript
// ✅ 正确示例
class UserService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
}

class HttpClient {
  private baseURL: string;

  get(url: string) {}
  post(url: string, data: any) {}
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ❌ 错误示例
class userService {}             // 不使用 camelCase
class http_client {}             // 不使用 snake_case
class VALIDATION_ERROR {}        // 不使用 UPPER_CASE
```

### 🔗 枚举命名

**规则：枚举名使用 PascalCase，成员使用 PascalCase**

```typescript
// ✅ 正确示例
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

enum RequestStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed'
}

enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto'
}

// ❌ 错误示例
enum userRole {                  // 不使用 camelCase
  ADMIN = 'admin',              // 不使用 UPPER_CASE 成员
  USER = 'user'
}

enum REQUEST_STATUS {            // 不使用 UPPER_CASE 枚举名
  pending = 'pending',          // 不使用 camelCase 成员
  success = 'success'
}
```

## React 组件命名

### 🧩 组件命名规范

**规则：使用 PascalCase**

```typescript
// ✅ 正确示例
const UserProfile: React.FC = () => {
  return <div>User Profile</div>;
};

const GlobalHeader: React.FC = () => {
  return <header>Global Header</header>;
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return <table>{/* table content */}</table>;
};

const ThemeDrawer: React.FC = () => {
  return <div>Theme Drawer</div>;
};

// ❌ 错误示例
const userProfile = () => {};     // 不使用 camelCase
const global_header = () => {};   // 不使用 snake_case
const DATA_TABLE = () => {};      // 不使用 UPPER_CASE
```

### 🏷️ Props 接口命名

**规则：组件名 + Props 后缀**

```typescript
// ✅ 正确示例
interface UserProfileProps {
  user: UserInfo;
  onEdit?: (user: UserInfo) => void;
  onDelete?: (id: string) => void;
}

interface DataTableProps<T = any> {
  data: T[];
  columns: ColumnConfig[];
  loading?: boolean;
  onRowClick?: (record: T) => void;
}

interface ModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

// ❌ 错误示例
interface UserProfileProperties {}  // 不使用完整的 Props
interface userProfileProps {}       // 不使用 PascalCase
interface UserProfile_Props {}      // 不使用下划线
```

### 🎯 事件处理函数命名

**规则：handle + 动作名称**

```typescript
// ✅ 正确示例
const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit?.(user);
  };

  const handleDelete = () => {
    if (window.confirm('确认删除？')) {
      onDelete?.(user.id);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 处理提交逻辑
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <button onClick={handleEdit}>编辑</button>
      <button onClick={handleDelete}>删除</button>
    </div>
  );
};

// ❌ 错误示例
const onEditClick = () => {};      // 不使用 handle 前缀
const deleteHandler = () => {};    // 不使用 handle 前缀
const HandleEdit = () => {};       // 不使用 PascalCase
const handle_delete = () => {};    // 不使用 snake_case
```

## Hook 命名规范

### 🪝 自定义 Hook 命名

**规则：use + 功能描述（PascalCase）**

```typescript
// ✅ 正确示例
const useUserInfo = (userId: string) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserById(userId).then(setUser);
  }, [userId]);

  return { user, loading };
};

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  return [value, setValue] as const;
};

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// ❌ 错误示例
const userInfo = () => {};         // 缺少 use 前缀
const getUserInfo = () => {};      // 不是 Hook，应该是普通函数
const useuser_info = () => {};     // 不使用 snake_case
const USE_USER_INFO = () => {};    // 不使用 UPPER_CASE
```

## API 和服务命名

### 🌐 API 函数命名

**规则：fetch + 资源名称（PascalCase）**

```typescript
// ✅ 正确示例
export const fetchUserList = (params: UserListParams) => {
  return request<UserListResponse>({
    url: '/user/list',
    method: 'GET',
    params,
  });
};

export const fetchUserById = (id: string) => {
  return request<UserInfo>({
    url: `/user/${id}`,
    method: 'GET',
  });
};

export const createUser = (data: CreateUserData) => {
  return request<ApiResponse>({
    url: '/user',
    method: 'POST',
    data,
  });
};

export const updateUser = (id: string, data: UpdateUserData) => {
  return request<ApiResponse>({
    url: `/user/${id}`,
    method: 'PUT',
    data,
  });
};

export const deleteUser = (id: string) => {
  return request<ApiResponse>({
    url: `/user/${id}`,
    method: 'DELETE',
  });
};

// ❌ 错误示例
export const getUserList = () => {};     // 不使用 fetch 前缀
export const fetch_user_list = () => {}; // 不使用 snake_case
export const FETCH_USER_LIST = () => {}; // 不使用 UPPER_CASE
export const userListApi = () => {};     // 不清晰的命名
```

### 🏢 服务类命名

**规则：资源名称 + Service 后缀**

```typescript
// ✅ 正确示例
class UserService {
  async getList(params: UserListParams) {
    return fetchUserList(params);
  }

  async getById(id: string) {
    return fetchUserById(id);
  }

  async create(data: CreateUserData) {
    return createUser(data);
  }
}

class AuthService {
  async login(credentials: LoginCredentials) {
    return request('/auth/login', { method: 'POST', data: credentials });
  }

  async logout() {
    return request('/auth/logout', { method: 'POST' });
  }
}

// ❌ 错误示例
class userService {}              // 不使用 PascalCase
class User_Service {}             // 不使用下划线
class USERSERVICE {}              // 不使用 UPPER_CASE
class UserApi {}                  // 不使用 Service 后缀
```

## 样式和CSS命名

### 🎨 CSS 类名命名

**规则：使用 kebab-case，遵循 BEM 规范**

```scss
// ✅ 正确示例
.user-card {
  padding: 16px;
  border-radius: 8px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    &__title {
      font-size: 18px;
      font-weight: bold;
    }

    &__actions {
      display: flex;
      gap: 8px;
    }
  }

  &__content {
    color: #666;
    line-height: 1.5;
  }

  &--active {
    border: 2px solid #1890ff;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.data-table {
  width: 100%;

  &__row {
    &:hover {
      background-color: #f5f5f5;
    }

    &--selected {
      background-color: #e6f7ff;
    }
  }
}

// ❌ 错误示例
.userCard {}                     // 不使用 camelCase
.user_card {}                    // 不使用 snake_case
.USER_CARD {}                    // 不使用 UPPER_CASE
.user-card-header-title {}       // 不使用 BEM 规范
```

### 🏷️ CSS Modules 命名

```scss
// UserCard.module.scss
// ✅ 正确示例
.userCard {
  @apply bg-white rounded-lg shadow-md p-4;

  .header {
    @apply flex items-center justify-between mb-4;

    .title {
      @apply text-lg font-bold text-gray-800;
    }

    .actions {
      @apply flex gap-2;
    }
  }

  .content {
    @apply text-gray-600;
  }

  .footer {
    @apply mt-4 pt-4 border-t border-gray-200;
  }
}

// ❌ 错误示例
.user-card {}                    // CSS modules 中不使用 kebab-case
.user_card {}                    // 不使用 snake_case
.USER_CARD {}                    // 不使用 UPPER_CASE
```

## 图标命名规范

### 🎯 Iconify 图标使用

**规则：使用 kebab-case，遵循 iconify 规范**

```tsx
// ✅ 正确示例
<IconMdiHome />
<iconTablerSearch />


// ❌ 错误示例
<icon-carbon-settings />        // 不使用 kebab-case
<icon_mdi_home />                // 不使用 snake_case
<ICON-MDI-HOME />                // 不使用 UPPER_CASE
```

### 🖼️ 本地 SVG 图标

```bash
# ✅ 正确示例
src/assets/svg-icon/
├── arrow-left.svg
├── arrow-right.svg
├── user-circle.svg
├── settings-gear.svg
└── notification-bell.svg

# ❌ 错误示例
src/assets/svg-icon/
├── arrowLeft.svg               # 不使用 camelCase
├── arrow_right.svg             # 不使用 snake_case
├── USERCIRCLE.svg              # 不使用 UPPER_CASE
└── settings.Gear.svg           # 不使用混合命名
```

## 配置和环境变量

### ⚙️ 环境变量命名

**规则：使用 UPPER_SNAKE_CASE，项目前缀**

```bash
# ✅ 正确示例
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=SoybeanAdmin
VITE_APP_VERSION=1.0.0
VITE_ENABLE_MOCK=true
VITE_STORAGE_PREFIX=soybean_
VITE_DEFAULT_THEME=light

# ❌ 错误示例
viteApiBaseUrl=                 # 不使用 camelCase
vite-api-base-url=              # 不使用 kebab-case
ViteApiBaseUrl=                 # 不使用 PascalCase
```

### 📋 配置对象命名

```typescript
// ✅ 正确示例
export const appConfig = {
  name: 'SoybeanAdmin',
  version: '1.0.0',
  description: 'A fresh and elegant admin template'
};

export const themeConfig = {
  defaultTheme: 'light' as const,
  enableDarkMode: true,
  primaryColor: '#1890ff'
};

export const routeConfig = {
  homePath: '/home',
  loginPath: '/login',
  enableAuth: true
};

// ❌ 错误示例
export const AppConfig = {};             // 不使用 PascalCase 用于对象
export const theme_config = {};         // 不使用 snake_case
export const ROUTE_CONFIG = {};         // 不使用 UPPER_CASE
```

## 总结

### 📝 命名规范速查表

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件/文件夹 | kebab-case | `user-center/`, `global-header.tsx` |
| React 组件 | PascalCase | `UserProfile`, `DataTable` |
| 变量/函数 | camelCase | `userName`, `getUserInfo()` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| 类型/接口 | PascalCase | `UserInfo`, `ApiResponse<T>` |
| CSS 类名 | kebab-case (BEM) | `.user-card__header--active` |
| CSS Modules | camelCase | `.userCard`, `.headerTitle` |
| Hooks | use + PascalCase | `useUserInfo`, `useLocalStorage` |
| API 函数 | fetch + PascalCase | `fetchUserList`, `createUser` |
| 图标 | kebab-case | `<icon-mdi-home />` |
| 环境变量 | UPPER_SNAKE_CASE | `VITE_API_BASE_URL` |

### ⚡ 最佳实践

1. **保持一致性**：在整个项目中使用相同的命名约定
2. **语义化命名**：名称应该能清楚地表达其用途和含义
3. **避免缩写**：除非是公认的缩写，否则使用完整的单词
4. **使用英文**：所有命名都应该使用英文，避免中文拼音
5. **遵循约定**：优先使用团队和社区认可的命名约定

遵循这些命名规范将有助于提高代码的可读性、可维护性和团队协作效率。
