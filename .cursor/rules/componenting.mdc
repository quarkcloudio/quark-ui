---
description:
globs:
alwaysApply: false
---
# 组件开发规范

## 1. 组件结构
```typescript
// 组件导入顺序
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { customHook, utilFunction } from '@/utils';
import styles from './index.module.scss';

// 类型定义
interface Props {
  title: string;
  onConfirm?: () => void;
}

// 组件实现
const ComponentName: React.FC<Props> = ({ title, onConfirm }) => {
  // 状态管理
  const [loading, setLoading] = useState(false);

  // Redux
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  // 事件处理
  const handleConfirm = () => {
    onConfirm?.();
  };

  // 副作用
  useEffect(() => {
    // 初始化逻辑
  }, []);


  // 渲染
  return (
    <Card title={title}>
      <Button onClick={handleConfirm}>确认</Button>
    </Card>
  );
};

export default ComponentName;
```

### 2. 组件命名规范
- **组件名称：PascalCase**
```typescript
<UserProfile />
<GlobalHeader />
<ThemeDrawer />
```
- **Iconify 图标：kebab-case**
```typescript
<IconMdiHome />
<IconAntDesignUserOutlined />
```

### 3. Props 和 State 设计
- 使用 TypeScript 接口定义 Props
- 为可选属性使用 `?` 标记
- 使用泛型提高复用性
```typescript
interface TableProps<T = any> {
  data: T[];
  loading?: boolean;
  onRowClick?: (record: T) => void;
}
```
