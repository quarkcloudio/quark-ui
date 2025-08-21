import { createContext } from 'react';

export interface MixMenuContextProps<T = unknown> {
  activeFirstLevelMenuKey: string;
  allMenus: App.Global.Menu[];
  childLevelMenus: App.Global.Menu[];
  firstLevelMenu: App.Global.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
  route: Router.Route<T>;
  selectKey: string[];
  setActiveFirstLevelMenuKey: (key?: string) => void;
}

function voidFunc() {}

export const MixMenuContext = createContext<MixMenuContextProps<unknown>>({
  activeFirstLevelMenuKey: '',
  allMenus: [],
  childLevelMenus: [],
  firstLevelMenu: [],
  isActiveFirstLevelMenuHasChildren: false,
  route: {} as Router.Route<unknown>,
  selectKey: [],
  setActiveFirstLevelMenuKey: voidFunc
});

export function useMixMenuContext<T = unknown>() {
  const context = useContext(MixMenuContext);

  if (!context) {
    throw new Error('useMixMenu must be used within a MixMenuContext');
  }

  return context as MixMenuContextProps<T>;
}
