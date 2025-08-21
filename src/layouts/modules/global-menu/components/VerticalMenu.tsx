import { SimpleScrollbar } from '@sa/materials';
import type { MenuProps } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { useMixMenuContext } from '@/features/menu';
import { useRouter } from '@/features/router';
import { getThemeSettings } from '@/features/theme';
import { getSiderCollapse } from '@/layouts/appStore';

interface LevelKeysProps {
  children?: LevelKeysProps[];
  key?: string;
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const getSelectedMenuKeyPath = (matches: Router.Route['matched']) => {
  const result = matches.reduce((acc: string[], match, index) => {
    if (index < matches.length - 1 && match.pathname) {
      acc.push(match.pathname);
    }
    return acc;
  }, []);

  return result;
};

const VerticalMenu = memo(() => {
  const { allMenus, childLevelMenus, route, selectKey } = useMixMenuContext();

  const levelKeys = useMemo(() => getLevelKeys(allMenus), [allMenus]);

  const themeSettings = useAppSelector(getThemeSettings);

  const { navigate } = useRouter();

  const isMix = themeSettings.layout.mode.includes('mix');

  const isVerticalMix = themeSettings.layout.mode === 'vertical-mix';

  const inlineCollapsed = useAppSelector(getSiderCollapse);

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(
    inlineCollapsed ? [] : getSelectedMenuKeyPath(route.matched)
  );

  function handleClickMenu(menuInfo: MenuInfo) {
    navigate(menuInfo.key);
  }

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    if (keys.includes('rc-menu-more')) {
      setStateOpenKeys(keys);
      return;
    }

    const currentOpenKey = keys.find(key => !stateOpenKeys.includes(key));

    // open
    if (currentOpenKey && themeSettings.isOnlyExpandCurrentParentMenu) {
      const repeatIndex = keys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        keys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // // close
      setStateOpenKeys(keys);
    }
  };

  useEffect(() => {
    if (inlineCollapsed || isVerticalMix) return;
    setStateOpenKeys(getSelectedMenuKeyPath(route.matched));
  }, [route, inlineCollapsed, isVerticalMix]);

  useUpdateEffect(() => {
    if (inlineCollapsed || isVerticalMix) return;

    const names = route.matched
      .slice(isMix ? 1 : 0, -1)
      .map(item => item.pathname)
      .filter(Boolean) as string[];

    setStateOpenKeys(names || []);
  }, [isMix, inlineCollapsed]);

  return (
    <SimpleScrollbar>
      <AMenu
        className="size-full transition-300 border-0!"
        inlineCollapsed={isVerticalMix ? false : inlineCollapsed}
        inlineIndent={18}
        items={isMix ? childLevelMenus : allMenus}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectKey}
        onOpenChange={onOpenChange}
        onSelect={handleClickMenu}
      />
    </SimpleScrollbar>
  );
});

export default VerticalMenu;
