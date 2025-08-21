import type { RouteObject } from 'react-router-dom';

import BeyondHiding from '@/components/BeyondHiding';
import { $t } from '@/locales';

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 */
export function filterRoutesToMenus(routes: RouteObject[]) {
  // 先根据 handle?.order 对路由做排序
  const sortedRoutes = sortRoutesByOrder(routes);

  const menus: App.Global.Menu[] = [];

  for (const route of sortedRoutes) {
    // 如果节点存在 path（注意：这里假设空字符串或 undefined 均视为无 path）

    if (route.path && !route.handle?.hideInMenu) {
      // 如果存在 children，则递归处理
      const newNode = getGlobalMenuByBaseRoute(route);

      if (route.children && route.children.length) {
        const filteredChildren = filterRoutesToMenus(route.children);

        if (filteredChildren?.length) {
          newNode.children = filteredChildren;
        }
      }
      menus.push(newNode);
    } else if (route.children && route.children.length) {
      // 如果当前节点没有 path，但有 children，则递归处理 children，
      menus.push(...filterRoutesToMenus(route.children));
      // 如果既没有 path 也没有 children，则该节点直接被过滤掉
    }
  }

  return menus;
}

/**
 * sort routes by order
 *
 * @param routes routes
 */
export function sortRoutesByOrder(routes: RouteObject[]) {
  routes.sort((next, prev) => (Number(next.handle?.order) || 0) - (Number(prev.handle?.order) || 0));
  routes.forEach(sortRouteByOrder);

  return routes;
}

/**
 * sort route by order
 *
 * @param route route
 */
function sortRouteByOrder(route: RouteObject) {
  if (route.children?.length) {
    route.children.sort((next, prev) => (Number(next.handle?.order) || 0) - (Number(prev.handle?.order) || 0));
    route.children.forEach(sortRouteByOrder);
  }

  return route;
}

/**
 * Get global menu by route
 *
 * @param route
 */
export function getGlobalMenuByBaseRoute(route: RouteObject): App.Global.Menu {
  const { path } = route;

  const { i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon, title } = route.handle ?? {};

  const label = i18nKey ? $t(i18nKey) : title;

  const menu: App.Global.Menu = {
    icon: (
      <SvgIcon
        icon={icon}
        localIcon={localIcon}
        style={{ fontSize: '20px' }}
      />
    ),
    key: path || '',
    label: <BeyondHiding title={label} />,
    title: label
  };

  return menu;
}

/**
 * Get active first level menu key
 *
 * @param route
 */
export function getActiveFirstLevelMenuKey(route: App.Global.TabRoute) {
  const { activeMenu, hideInMenu } = route.handle;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [_, firstLevelRouteName] = routeName.split('/');

  return `/${firstLevelRouteName}`;
}

export function mergeMenus(menus: App.Global.Menu[], newMenus: App.Global.Menu[]) {
  newMenus.forEach(newMenu => {
    const newMenuKey = newMenu.key.split('/'); // 分割路径

    function findAndMergeParent(currentMenus: App.Global.Menu[], menuPath: string[]): boolean {
      for (const menu of currentMenus) {
        // 判断当前菜单的路径是否匹配，使用 startsWith 来判断路径的前缀
        const menuKeyParts = menu.key.split('/');

        // 如果路径的前缀一致，进一步递归查找子菜单
        if (menuKeyParts[1] === menuPath[1]) {
          // 如果匹配到父级菜单的路径并且这个菜单没有 children，则初始化 children
          if (!menu.children) {
            menu.children = [];
          }

          // 如果 newMenu 的路径和当前菜单的路径匹配，递归查找它的子菜单
          if (menuPath.length === 3) {
            // 如果路径已完全匹配，将 newMenu 添加到子菜单中
            menu.children.push(newMenu);

            return true;
          }

          // 如果路径部分匹配，递归检查当前菜单的 children
          return findAndMergeParent(menu.children || [], menuPath.slice(1));
        }
      }
      return false;
    }

    // 如果没有找到父级，将 newMenu 直接添加到 menus
    if (!findAndMergeParent(menus, newMenuKey)) {
      menus.push(newMenu);
    }
  });

  return menus;
}

export function getSelectKey(route: Router.Route) {
  const { activeMenu, hideInMenu } = route.handle;

  const name = route.pathname as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}
