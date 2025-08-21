---
description:
globs:
alwaysApply: false
---
---
description:
globs:
alwaysApply: true
---
# 项目背景

这是 soybeanjs/soybean-admin-react的源代码仓库，是一个 React 后台管理模板仓库

- 使用 TypeScript 和 React 开发
- 兼容 React 16 ~ 19 版本
- 遵循 Ant Design 设计规范
- 支持国际化
- 基于 React 18 + TypeScript + Vite 的后台管理系统
- 采用 pnpm monorepo 架构
- 使用文件系统路由，类似 Next.js 的路由系统
- 技术栈：React、TypeScript、Vite、Redux Toolkit、Antd、UnoCSS
- 代码风格遵循 SoybeanJS 官方规范

## 编码规范

- 使用 TypeScript 和 React 书写
- 使用函数式组件和 hooks，避免类组件
- 使用提前返回（early returns）提高代码可读性
- 组件名使用大驼峰（PascalCase）
- 属性名使用小驼峰（camelCase）
- 合理使用 React.memo、useMemo 和 useCallback 优化性能
- 所有页面放置于 `src/pages`，每个页面一个文件夹，命名使用小写连字符。
- 公共组件放在 `src/components`，抽象通用性组件优先。
- API 调用统一由 `src/service` 管理，采用 axios 封装。
- 工具函数集中于 `src/utils`。

## 核心开发原则

### 1. 严格的类型安全
- 所有代码必须使用 TypeScript
- 避免使用 `any` 类型，优先使用具体类型或泛型
- 为所有函数参数和返回值定义明确的类型
- 使用 `.d.ts` 文件定义全局类型

### 2. 响应式设计优先
- 所有组件必须考虑移动端适配
- 使用 UnoCSS 进行样式开发
- 遵循移动端优先的设计理念

### 3. 性能优化
- 使用 React.memo、useMemo、useCallback 优化组件性能
- 路由懒加载，避免首屏加载过慢
- 图片懒加载和压缩优化

## 文件和目录命名规范

### 1. 文件和文件夹命名
- **统一使用小写字母 + 连字符（kebab-case）命名**
- 多个单词用连字符 `-` 连接
- 示例：`user-center`、`role-manage`、`global-header`

### 2. 组件文件命名
- React 组件文件使用 PascalCase 命名
- 页面组件：`index.tsx`
- 动态路由：`[id].tsx`、`[...slug].tsx`
- 布局组件：`layout.tsx`
- 加载组件：`loading.tsx`
- 错误组件：`error.tsx`

### 3. 变量和函数命名
- **变量和普通函数：camelCase**
  ```typescript
  const userInfo = {...};
  const getUserInfo = () => {...};
  ```
- **常量：UPPER_SNAKE_CASE**
  ```typescript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = 'https://api.example.com';
  ```
- **类型和接口：PascalCase**
  ```typescript
  interface UserInfo {
    name: string;
  }
  type ApiResponse<T> = {
    data: T;
  };
  ```
- **请求函数：以 `fetch` 开头**
  ```typescript
  const fetchUserList = () => {...};
  const fetchUserById = (id: string) => {...};
  ```

### 4. 样式类命名

- 使用 Tailwind CSS + UnoCSS 配合，避免直接写原生 CSS。
- 原则：能用类写完的 UI 不新建样式文件。
- `class` 顺序遵循结构 > 状态 > 修饰。
- 尽量通过 `theme` 和 `preset` 控制色彩与间距。
- 避免写死颜色、字体，统一使用 token。
- 使用小写字母 + 连字符（kebab-case）
- 遵循 BEM 命名规范
```css
.user-card {
  .user-card__header {
    .user-card__title {
    }
  }
}
```

> 遵循约定大于配置，尽量避免横跨多个职责的模块。

