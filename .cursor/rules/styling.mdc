---
description:
globs:
alwaysApply: false
---

# 样式开发规范

## 1. UnoCSS 使用规范
- 优先使用 UnoCSS 原子类
- 复杂布局使用 CSS Modules
- 响应式设计使用断点前缀
```typescript
// 基础样式
<div className="flex items-center justify-between p-4 bg-white">
  <h1 className="text-lg font-bold">标题</h1>
  <Button className="btn-primary">操作</Button>
</div>

// 响应式样式
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

## 2. CSS Modules 规范
- 文件命名：`Component.module.scss`
- 类名使用 camelCase
```scss
// UserCard.module.scss
.userCard {
  @apply bg-white rounded-lg shadow-md p-4;

  .header {
    @apply flex items-center justify-between mb-4;

    .title {
      @apply text-lg font-bold text-gray-800;
    }
  }

  .content {
    @apply text-gray-600;
  }
}
```

## 3. 主题系统
- 使用 CSS 变量定义主题色
- 支持暗色模式切换
```scss
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
}

[data-theme='dark'] {
  --primary-color: #177ddc;
  --bg-color: #141414;
  --text-color: #ffffff;
}
```


## 暗色模式

- 所有组件必须支持暗色模式
- 暗色模式应通过 Token 系统实现，不应硬编码
- 测试暗色模式下的颜色对比度，确保可访问性
- 在设计暗色模式时考虑降低亮度和饱和度
- 确保文本在暗色背景上有足够的对比度
- 图片和图标应提供适合暗色模式的版本

## 可访问性样式

- 遵循 WCAG 2.1 AA 级别标准
- 确保焦点状态有明显的视觉提示
- 提供足够的色彩对比度
- 不依赖颜色来传达信息
- 支持用户放大页面至 200% 时的正常布局
- 避免使用会导致闪烁的动画
