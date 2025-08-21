import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';
import type { RouteObject } from 'react-router-dom';

import { transformElegantRoutesToReactRoutes } from '../elegant/transform';

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
export function getReactRoutes(route: ElegantConstRoute[]) {
  return transformElegantRoutesToReactRoutes(route);
}

function isGroup(id?: string) {
  if (!id) return false;

  return id.endsWith(')');
}

/**
 * 过滤路由并收集需要权限的路由
 *
 * @param {Array} routes - 当前路由数组
 * @param {Object | null} parent - 当前节点的父路由，根节点时为 null
 * @param {Array} authRoutes - 用于记录需要权限的路由和对应父级的数组
 * @returns {Array} 返回过滤后的路由数组
 */
// eslint-disable-next-line max-params
export function filterRoutes(
  routes: RouteObject[],
  parent: string | null = null,
  authRoutes: Router.SingleAuthRoute[] = [],
  cacheRoutes: string[] = [],
  parentPath: string = ''
) {
  return routes.reduce((acc, route) => {
    // 判断是否需要权限：假设 handles.constant 为 true 表示有权限要求
    const noPermission = route.handle && route.handle.constant;

    const newRoute = { ...route };

    const isRouteGroup = route.id?.startsWith('(') && route.id.endsWith(')');

    if (newRoute.handle?.keepAlive) {
      cacheRoutes.push(route.path || '');
    }

    // 递归处理子路由：注意，此处传递当前路由作为父级
    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = filterRoutes(newRoute.children, route.id, authRoutes, cacheRoutes, route.path);
    }

    if (!noPermission) {
      // 将当前路由及其父级（如果没有父级，则为 null）记录到 authRoutes 数组中
      if (isRouteGroup || newRoute.children?.[0]?.index) {
        const children = newRoute.children
          ?.map(item => {
            if (item.handle?.constant || isGroup(item.id) || item.children?.[0]?.index) {
              return item;
            }
            return null;
          })
          .filter(Boolean) as RouteObject[];

        newRoute.children = children;

        acc.push(newRoute);
      } else {
        authRoutes.push({
          parent: parent || null,
          parentPath,
          route: newRoute
        });
      }
    } else {
      // 放入结果数组

      acc.push(newRoute);
    }

    // 如果没有权限，则该路由不加入结果数组
    return acc;
  }, [] as RouteObject[]);
}
