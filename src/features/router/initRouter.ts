import type { RouteObject } from 'react-router-dom';

import { authRoutes } from '@/router';
import { fetchGetUserRoutes } from '@/service/api';
import { store } from '@/store';

import { transformElegantRoutesToReactRoutes } from '../../router/elegant/transform';
import { isStaticSuper, selectUserInfo } from '../auth/authStore';

import { setHomePath } from './routeStore';
import { filterAuthRoutesByRoles, mergeValuesByParent } from './shared';

export async function initAuthRoutes(addRoutes: (parent: string | null, route: RouteObject[]) => void) {
  const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

  const reactAuthRoutes = mergeValuesByParent(authRoutes);

  const isSuper = isStaticSuper(store.getState());

  const { roles } = selectUserInfo(store.getState());

  // 静态模式
  if (authRouteMode === 'static') {
    // 超级管理员
    if (isSuper) {
      reactAuthRoutes.forEach(route => {
        addRoutes(route.parent, route.route);
      });
    } else {
      // 非超级管理员
      const filteredRoutes = filterAuthRoutesByRoles(reactAuthRoutes, roles);

      filteredRoutes.forEach(({ parent, route }) => {
        addRoutes(parent, route);
      });
    }
  } else {
    // 动态模式
    const { data, error } = await fetchGetUserRoutes();
    if (error) {
      return;
    }
    store.dispatch(setHomePath(data.home));

    const transformRoutes = data.routes.map(item => {
      return transformRoute(item);
    });

    console.log(transformRoutes);

    const getReactAuthRoutes = transformElegantRoutesToReactRoutes(transformRoutes);

    addRoutes('(base)', getReactAuthRoutes);
  }
}

/**
 * 转换函数（树结构）
 *
 * @param node 树节点
 * @param parentPath 父路径
 * @returns 转换后的路由
 */
function transformRoute(node: any, parentPath = '') {
  const fullPath = `${parentPath}/${node.path}`.replace(/\/+/g, '/');

  const route: any = {
    handle: node.meta,
    name: `(base)${fullPath.replace('/', '_')}`,
    path: fullPath
  };

  route.component = `/src/pages/(base)/${node.component}.tsx`;
  route.matchedFiles = [null, node.component, null, null];

  // 递归 children
  if (node.children && node.children.length > 0) {
    route.children = node.children.map((child: any) => transformRoute(child, fullPath));
  }

  return route;
}
