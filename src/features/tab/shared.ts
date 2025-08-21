import type { LastLevelRouteKey, RouteMap } from '@soybean-react/vite-plugin-react-router';

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map(tab => tab.id);
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.fixedIndex || tab.fixedIndex === 0);
}

/**
 * The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: Router.Route) {
  // Set default value for icon at the beginning
  let icon: string = route?.handle?.icon || import.meta.env.VITE_MENU_ICON;
  let localIcon: string | undefined = route?.handle?.localIcon;

  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // Find the handle of the current route from matched
    const currentRoute = route.matched.find(r => r.id === route.id);
    // If icon exists in currentRoute.handle, it will overwrite the default value
    icon = currentRoute?.handle?.icon || icon;
    localIcon = currentRoute?.handle?.localIcon;
  }

  return { icon, localIcon };
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: Router.Route) {
  const { fullPath, handle, id, pathname } = route;

  const { fixedIndexInTab, i18nKey, keepAlive = false, title } = handle;

  let fixedIndex = fixedIndexInTab;

  if (pathname === import.meta.env.VITE_ROUTE_HOME) {
    fixedIndex = 0;
  }

  // Get icon and localIcon from getRouteIcons function
  const { icon, localIcon } = getRouteIcons(route);

  const tab: App.Global.Tab = {
    fixedIndex,
    fullPath,
    i18nKey,
    icon,
    id: handle.multiTab ? fullPath : pathname,
    keepAlive,
    label: title,
    localIcon,
    newLabel: '',
    oldLabel: i18nKey || title,
    routeKey: id as LastLevelRouteKey,
    routePath: pathname as RouteMap[LastLevelRouteKey]
  };

  return tab;
}

/**
 * Is tab in tabs
 *
 * @param tab
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId);
}

/**
 * extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(routeNames: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => routeNames.includes(tab.routeKey));
}
