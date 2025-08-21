import type { FC, PropsWithChildren } from 'react';

import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/features/tab/tabStore';

import { useLang } from '../lang';
import { useRoute, useRouter } from '../router';
import { getBaseChildrenRoutes } from '../router/routes';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, getSelectKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  const menus = useMemo(
    () => filterRoutesToMenus(getBaseChildrenRoutes(router.reactRouter.routes)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.reactRouter.routes, locale]
  );

  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  const selectKey = getSelectKey(route);

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || getActiveFirstLevelMenuKey(route);

    dispatch(setActiveFirstLevelMenuKey(routeKey || ''));
  }

  const mixMenuContext = {
    activeFirstLevelMenuKey,
    allMenus: menus,
    childLevelMenus: childLevelMenus || [],
    firstLevelMenu,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
    route,
    selectKey,
    setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey
  };

  return <MixMenuContext value={mixMenuContext}>{children}</MixMenuContext>;
};

export default MenuProvider;
