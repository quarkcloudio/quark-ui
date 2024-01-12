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
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

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

  const onMenuClick = (event: any) => {
    setMenuSelectedKeys([event.key]);
    const menu: any = getMenu(layout.menu, event.key);
    if (menu.is_link === 1) {
      window.open(menu.path, '_blank');
      return false;
    }

    history.push(menu.path);
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
