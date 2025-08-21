---
description:
globs:
alwaysApply: false
---
# 路由系统规范

## 1. 文件系统路由结构
```
src/pages/
├── index.tsx                    // 首页 -> /
├── (base)/                      // 路由组，不生成路由
│   ├── layout.tsx              // 基础布局
│   ├── loading.tsx             // 加载状态
│   ├── error.tsx               // 错误处理
│   ├── home/
│   │   └── index.tsx           // /home
│   ├── user/
│   │   ├── index.tsx           // /user
│   │   ├── [id].tsx            // /user/:id
│   │   └── profile/
│   │       └── index.tsx       // /user/profile
│   └── manage/
│       ├── role/
│       │   ├── index.tsx       // /manage/role
│       │   └── [...slug].tsx   // /manage/role/any/path
├── (blank)/                     // 空白布局路由组
│   ├── layout.tsx
│   └── login/
│       └── index.tsx           // /login
└── _builtin/                   // 忽略文件夹，不生成路由
    ├── 403/
    │   └── index.tsx           // /403
    ├── 404/
    │   └── index.tsx           // /404
    └── 500/
        └── index.tsx           // /500
```

### 2. 路由组件规范
- **页面级组件**：`index.tsx`、`[id].tsx`、`[...slug].tsx`
- **布局级组件**：`layout.tsx` 为当前目录及子目录提供布局
- **路由组**：用括号包裹的文件夹 `(base)`，只提供布局不生成路由
- **忽略文件夹**：以 `_` 开头的文件夹，内容会聚合到上级路由
- **异步状态组件**：`loading.tsx` 处理加载状态
- **错误边界组件**：`error.tsx` 处理错误状态
