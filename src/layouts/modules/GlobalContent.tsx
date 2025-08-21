import clsx from 'clsx';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';

import { usePreviousRoute } from '@/features/router';
import { selectCacheRoutes, selectRemoveCacheKey, setRemoveCacheKey } from '@/features/router/routeStore';
import { useThemeSettings } from '@/features/theme';
import { getReloadFlag } from '@/layouts/appStore';
import './transition.css';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const GlobalContent = ({ closePadding }: Props) => {
  const previousRoute = usePreviousRoute();

  const dispatch = useAppDispatch();

  const currentOutlet = useOutlet(previousRoute);

  const { pathname } = useLocation();

  const aliveRef = useKeepAliveRef();

  const removeCacheKey = useAppSelector(selectRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  const themeSetting = useThemeSettings();

  const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  useUpdateEffect(() => {
    if (!aliveRef.current || !removeCacheKey) return;

    aliveRef.current.destroy(removeCacheKey);

    // 有的时候用户打开同一页面输入在关闭 不去切换新的页面 会造成无法二次删除缓存
    dispatch(setRemoveCacheKey(null));
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload, transitionName]);

  return (
    <div className={clsx('h-full flex-grow bg-layout', { 'p-16px': !closePadding })}>
      <KeepAlive
        activeCacheKey={pathname}
        aliveRef={aliveRef}
        cacheNodeClassName={reload ? '' : transitionName}
        include={cacheKeys}
      >
        {!reload && currentOutlet}
      </KeepAlive>
    </div>
  );
};

export default GlobalContent;
