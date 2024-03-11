import React, { useState, useEffect } from 'react';
import {
  useLocation,
  request,
  history,
  Helmet,
  useModel,
  Outlet,
} from '@umijs/max';
import type { MenuProps } from 'antd';
import { ConfigProvider, App, Dropdown } from 'antd';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { ProLayout } from '@ant-design/pro-components';
import qs from 'query-string';
import Render from '@/components/Render';
import defaultLogo from '@/assets/logo.png';
import {
  getMenuName,
  getMenuSelectedKey,
  getMenuOpenKeys,
  getMenu,
} from '@/components/Layout/menu';
import { get } from '@/services/action';
import { UserOutlined } from '@ant-design/icons';

const Layout: React.FC<any> = (props) => {
  const { pageLoading } = useModel('pageLoading');
  const [layout, setLayout] = useState<any>({});
  const [component, setComponent] = useState<any>({});
  const { setPageLoading } = useModel('pageLoading');
  const { initialState } = useModel('@@initialState');
  const accountInfo = initialState?.accountInfo;
  const location = useLocation();
  const query = qs.parse(location.search);
  const [innerTitle, setInnerTitle] = useState<string>('');
  const [menuOpenKeys, setMenuOpenKeys] = useState<any>([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState(['']);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const getLayout = async () => {
    const config = await request('./config.json');
    let layoutApi = config.api.layout;

    if (!layoutApi) {
      setComponent('The layout API cannot be null!');
      return;
    }

    // 设置页面loading状态
    setPageLoading(true);

    const result = await get({
      url: layoutApi,
    });

    // 设置Layout数据
    setLayout(result);

    if (result.menu) {
      // 获取当前选中的菜单
      const menuSelectedKey = getMenuSelectedKey(
        result.menu,
        location.pathname,
        decodeURIComponent(api),
      );
      // 获取当前展开的菜单
      const currentMenuOpenKeys = getMenuOpenKeys(result.menu, menuSelectedKey);
      // 设置菜单展开
      menuOpenKeys.push(...currentMenuOpenKeys);
      setMenuOpenKeys(menuOpenKeys);
      // 设置选中菜单
      setMenuSelectedKeys([menuSelectedKey]);
    }

    // 获取当前选中菜单的名称
    const title = getMenuName(
      result.menu,
      location.pathname,
      decodeURIComponent(api),
    );

    // 设置页面标题
    setInnerTitle(title);

    // 设置页面loading状态
    setPageLoading(false);
  };

  const getComponent = async () => {
    // 获取当前选中菜单的名称
    const title = getMenuName(
      layout.menu,
      location.pathname,
      decodeURIComponent(api),
    );

    // 设置页面标题
    setInnerTitle(title);

    if (!api) {
      setComponent(null);
      return;
    }

    let data: any = {};
    Object.keys(query).forEach((key) => {
      if (key !== 'api') {
        data[key] = query[key];
      }
    });

    // 设置页面loading状态
    setPageLoading(true);
    const result = await get({
      url: api,
      data: data,
    });

    // 设置组件
    setComponent(result);

    // 取消页面loading状态
    setPageLoading(false);
  };

  let api: any = '';
  if (query?.api) {
    api = query.api;
  }

  // 获取布局数据
  useEffect(() => {
    getLayout();
  }, []);

  // 获取组件数据
  useEffect(() => {
    getComponent();
  }, [query.api]);

  const findMenuItem = (
    key: string,
    routes = layout.menu,
    selected: string[] = [],
  ): any => {
    for (let item of routes) {
      const currentKey = item.key;
      if (key === currentKey) {
        selected.push(currentKey);
        setMenuSelectedKeys([...new Set(selected)]); // 使用 Set 来确保唯一性，防止重复的 key
        return item;
      }
      if (item.routes && item.routes.length > 0) {
        selected.push(currentKey); // 先添加当前层的 key
        const foundItem = findMenuItem(key, item.routes, selected); // 递归调用
        if (foundItem) {
          setMenuSelectedKeys([...new Set(selected)]); // 确保添加的 keys 是唯一的
          return foundItem; // 如果在递归调用中找到了匹配项，立即返回该项
        } else {
          selected.pop(); // 如果当前分支没有找到匹配项，撤销添加的key
        }
      }
    }
  };

  const findFirstChild = (menu: any, openKeys: string[] = []): any => {
    if (menu.type === 2) return menu;
    // 如果没有子菜单的时候则保持不动
    if (!menu.routes || !menu.routes.length) return;
    for (let item of menu.routes) {
      if (item.type === 2) {
        return item;
      }
      if (item.routes && item.routes.length > 0) {
        openKeys.push(item.key);
        setMenuOpenKeys(openKeys);
        return findFirstChild(item.routes[0]);
      }
    }
  };

  const onMenuClick = (event: any) => {
    const menuItem = findMenuItem(event.key);
    if (!menuItem) return;
    if (menuItem.type === 3) return;
    if (menuItem.type === 1) {
      const child = findFirstChild(menuItem);
      if (!child) return;
      menuSelectedKeys.push(child.key);
      setMenuSelectedKeys([menuItem.key, child.key]);
      history.push(child.path);
    } else {
      if (menuItem.is_link === 1) {
        window.open(menuItem.path, '_blank');
        return false;
      }
      history.push(menuItem.path);
    }
  };

  const onMenuOpenChange = (openKeys: any) => {
    setMenuOpenKeys(openKeys);
  };

  const items: MenuProps['items'] = layout?.rightMenus?.map(
    (item: any, index: number) => {
      return {
        key: index,
        label: <Render body={item} />,
      };
    },
  );

  useEffect(() => {
    if (layout.menu && layout.menu.length > 0) {
      const flatRoutes = flattenRoutes(layout.menu);
      const route = flatRoutes.find(
        (item) => item.path === location.pathname + location.search,
      );
      if (!route) return;
      const menuItem = findMenuItem(route.key);
      if (menuItem && menuItem.type === 1) {
        findFirstChild(menuItem);
      }
    }
  }, [location, layout.menu]);
  const flattenRoutes = (routes: any[]): any[] => {
    return routes.reduce((accumulator: any[], currentValue: any) => {
      // 将当前值添加到累加器数组中
      accumulator.push(currentValue);
      // 如果当前值有routes属性，递归调用flattenRoutes并将结果展平后添加到累加器数组中
      if (currentValue.routes && currentValue.routes.length > 0) {
        accumulator = accumulator.concat(flattenRoutes(currentValue.routes));
      }
      return accumulator;
    }, []);
  };

  return (
    <ConfigProvider locale={locale}>
      <App>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{innerTitle}</title>
        </Helmet>
        {layout?.title && (
          <ProLayout
            {...layout}
            loading={pageLoading}
            logo={layout.logo ? layout.logo : defaultLogo}
            iconfontUrl={layout.iconfontUrl}
            openKeys={menuOpenKeys}
            selectedKeys={menuSelectedKeys}
            menuProps={{
              onOpenChange: onMenuOpenChange,
              onClick: onMenuClick,
            }}
            onCollapse={(collapsed: boolean) => {
              setCollapsed(collapsed);
            }}
            menuDataRender={() => layout.menu}
            actionsRender={() => [
              <Render key="action" body={layout.actions} />,
            ]}
            avatarProps={{
              src: accountInfo?.avatar ? accountInfo?.avatar : <UserOutlined />,
              size: 'small',
              title:
                props.layout === 'side'
                  ? !collapsed
                    ? accountInfo?.nickname
                    : undefined
                  : accountInfo?.nickname,
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: items,
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            footerRender={() => <Render body={layout.footer} />}
          >
            {component ? <Render body={component} /> : <Outlet />}
          </ProLayout>
        )}
      </App>
    </ConfigProvider>
  );
};

export default Layout;
