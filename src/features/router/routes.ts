import type { TFunction } from 'i18next';
import type { RouteObject } from 'react-router-dom';

type FlatRoute = {
  name?: string;
  path: string;
};

// 返回仅保留想要的字段
interface SimpleRoute {
  children?: SimpleRoute[];
  key: string;
  title?: string;
}

/**
 * 将多级路由递归拍平成一个数组
 *
 * @param routes 原始路由数组
 * @param parentPath 父级拼接后的 path，初始可传空字符串或 '/'
 * @returns 拍平后的一维路由数组
 */
export function flattenLeafRoutes(routes: RouteObject[]) {
  const flat: { name?: string; path: string }[] = [];

  for (const route of routes) {
    // 如果还有 children，就递归往下找叶子
    if (route.children && route.children.length > 0) {
      const childLeafs = flattenLeafRoutes(route.children);

      flat.push(...childLeafs);
    } else {
      // 没有 children => 叶子路由

      // eslint-disable-next-line no-lonely-if
      if (route.path) {
        const isHasIndex = Boolean(route.children?.[0]?.index);

        if (isHasIndex || !route.children || route.children?.length < 1) {
          flat.push({
            name: route.id, // 根据需要保存 name，这里拿 route.id
            path: route.path // path 可能为空字符串或undefined，统一成''
          });
        }
      }
      // 如果是 index 或者 有有效的 path => 收集
    }
  }

  return flat;
}

// 判断是否是“路由组”
// 约定：以 "(" 开头、")" 结尾的 id 为路由组
function isRouteGroup(routeId?: string): boolean {
  if (!routeId) return false;
  return routeId.endsWith(')');
}

/** 过滤并展开路由组，同时过滤 handle.constant 为 true 的路由 保留 name、path、children */
export function filterAndFlattenRoutes(routes: RouteObject[], t: TFunction): SimpleRoute[] {
  const result: SimpleRoute[] = [];

  for (const route of routes) {
    // 1. 如果有 handle?.constant === true，直接跳过（不放到结果里）
    if (
      route.handle?.constant ||
      route?.index ||
      (route.children && route.children[0] && route.children[0].index && route.children[0].handle?.constant)
    ) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // 2. 如果是路由组，则“展开”它的子路由到同级
    if (isRouteGroup(route.id)) {
      // 继续处理它的 children，并将处理后的结果直接合并到当前 result
      if (route.children && route.children.length > 0) {
        const flattenedChildren = filterAndFlattenRoutes(route.children, t);
        result.push(...flattenedChildren);
      }
    } else {
      // 3. 否则是正常路由，保留 name、path、children
      const newRoute: SimpleRoute = {
        key: route.path || '',
        title: t(`route.${route.id}`)
      };

      // 递归处理它的子路由
      if (route.children && route.children.length > 0) {
        newRoute.children = filterAndFlattenRoutes(route.children, t);
      }

      result.push(newRoute);
    }
  }

  return result;
}

export function getFlatBaseRoutes(routes: FlatRoute[], t: TFunction) {
  return routes.map(({ name, path }) => ({
    label: t(`route.${name}`),
    value: path
  }));
}

export function getBaseChildrenRoutes(routes: RouteObject[]) {
  const baseRoutes = routes[0].children?.find(item => item.id === '(base)')?.children;

  return baseRoutes || [];
}
