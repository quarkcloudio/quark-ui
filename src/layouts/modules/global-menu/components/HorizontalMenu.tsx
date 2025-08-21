import type { MenuInfo } from 'rc-menu/lib/interface';
import type { FC } from 'react';

import { useMixMenuContext } from '@/features/menu';
import { useRouter } from '@/features/router';
import { getThemeSettings } from '@/features/theme';

interface Props {
  mode: '1' | '2' | '3';
}

function isHasChildren(menus: App.Global.Menu[], key: string) {
  return menus.some(item => item.key === key && item.children?.length);
}

const HorizontalMenu: FC<Props> = memo(({ mode }) => {
  const themeSettings = useAppSelector(getThemeSettings);

  const { allMenus, childLevelMenus, firstLevelMenu, selectKey, setActiveFirstLevelMenuKey } = useMixMenuContext();

  const { navigate } = useRouter();

  const selectedKeys = mode === '3' ? [`/${selectKey[0].split('/')[1]}`] : selectKey;

  function getMenus() {
    if (mode === '1') {
      return allMenus;
    } else if (mode === '2') {
      return childLevelMenus;
    }
    return firstLevelMenu;
  }

  function handleClickMenu(menuInfo: MenuInfo) {
    if (mode === '3' && isHasChildren(allMenus, menuInfo.key)) {
      setActiveFirstLevelMenuKey(menuInfo.key);
    } else {
      navigate(menuInfo.key);
    }
  }

  return (
    <AMenu
      className="size-full transition-400 border-0!"
      inlineIndent={18}
      items={getMenus()}
      mode="horizontal"
      selectedKeys={selectedKeys}
      style={{ lineHeight: `${themeSettings.header.height}px` }}
      onSelect={handleClickMenu}
    />
  );
});

export default HorizontalMenu;
