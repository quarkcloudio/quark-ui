import type { BreadcrumbProps } from 'antd';

import { useMixMenuContext } from '@/features/menu';

import { getBreadcrumbsByRoute } from './breadcrumbShared.tsx';

const GlobalBreadcrumb: FC<Omit<BreadcrumbProps, 'items'>> = props => {
  const { allMenus: menus, route } = useMixMenuContext();

  const breadcrumb = useMemo(() => {
    return getBreadcrumbsByRoute(route, menus);
  }, [route, menus]);

  return (
    <ABreadcrumb
      {...props}
      items={breadcrumb}
    />
  );
};

export default GlobalBreadcrumb;
