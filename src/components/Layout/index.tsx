import React, { useState, useEffect } from 'react';
import { useLocation, history, Helmet, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import qs from 'query-string';
import Render from '@/components/Render';
import RightContent from '@/components/RightContent';
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

export interface LayoutProps {
  logo?: React.ReactNode;
  title?: string;
  cache?: boolean;
  menu?: any;
  actions?: any;
  body?: any;
  footer?: any;
  data?: any;
  callback?: any;
  children?: React.ReactNode;
}

const defaultProps = {
  logo: '',
  title: 'QuarkCMS',
  cache: false,
  iconfontUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
} as LayoutProps;

const Layout: React.FC<ProLayoutProps & LayoutProps> = (props) => {
  const { pageLoading } = useModel('pageLoading');
  let innerProps = { ...defaultProps, ...props };
  if (innerProps.cache) {
    const layoutCache = sessionStorage.getItem('layout');
    if (!layoutCache) {
      // 记录布局
      sessionStorage.setItem('layout', JSON.stringify(innerProps));
    } else {
      innerProps = JSON.parse(layoutCache);
    }
  }
  const { logo, title, menu, iconfontUrl, actions, footer } = { ...innerProps };
  const { initialState } = useModel('@@initialState');
  const accountInfo = initialState?.accountInfo;
  const location = useLocation();
  const query = qs.parse(location.search);
  const [innerTitle, setInnerTitle] = useState<string>(title ? title : '');
  const [menuOpenKeys, setMenuOpenKeys] = useState<any>([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState(['']);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  let api: any = '';
  if (query?.api) {
    api = query.api;
  }

  useEffect(() => {
    if (menu && query.api) {
      // 获取当前选中菜单的名称
      const title = getMenuName(menu, location.pathname, decodeURIComponent(api));
      // 设置页面标题
      setInnerTitle(title);
      // 获取当前选中的菜单
      const menuSelectedKey = getMenuSelectedKey(menu, location.pathname, decodeURIComponent(api));
      // 获取当前展开的菜单
      const currentMenuOpenKeys = getMenuOpenKeys(menu, menuSelectedKey);
      // 设置菜单展开
      menuOpenKeys.push(...currentMenuOpenKeys);
      setMenuOpenKeys(menuOpenKeys);
      // 设置选中菜单
      setMenuSelectedKeys([menuSelectedKey]);
    }
  }, [query.api]);

  const onMenuClick = (event: any) => {
    setMenuSelectedKeys([event.key]);
    const menuItem:any = getMenu(menu ,event.key);
    if (menuItem.is_link === 1) {
      window.open(menuItem.path, '_blank');
      return false;
    }

    history.push(menuItem.path);
  };

  const onMenuOpenChange = (openKeys: any) => {
    setMenuOpenKeys(openKeys);
  };

  const onRightContentMenuClick = (event: any) => {
    switch (event.key) {
      case 'logout':
        loginOut();
        break;
      case 'setting':
        history.push({
          pathname: '/index',
          search: 'api=/api/admin/account/setting/form',
        });
        break;
    }
  };

  // 退出登录
  const loginOut = async () => {
    const result = await get({
      url: '/api/admin/logout/index/handle',
    });
    if (result['status'] === 'success') {
      localStorage.removeItem('token');
    }
    history.push('/');
  };

  const items: MenuProps['items'] = [
    {
      key: 'setting',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{innerTitle}</title>
      </Helmet>
      <ProLayout
        {...props}
        loading={pageLoading}
        logo={logo ? logo : defaultLogo}
        iconfontUrl={iconfontUrl}
        openKeys={menuOpenKeys}
        selectedKeys={menuSelectedKeys}
        menuProps={{
          onOpenChange: onMenuOpenChange,
          onClick: onMenuClick,
        }}
        onCollapse={(collapsed: boolean) => {
          setCollapsed(collapsed);
        }}
        menuDataRender={() => menu}
        actionsRender={() => [
          <Render key="action" body={actions} data={props.data} />,
        ]}
        rightContentRender={() => (
          <RightContent
            menu={{
              items: items,
              onClick: onRightContentMenuClick,
            }}
            avatar={
              accountInfo?.avatar ? accountInfo?.avatar : <UserOutlined />
            }
            name={
              props.layout === 'side'
                ? !collapsed
                  ? accountInfo?.nickname
                  : undefined
                : accountInfo?.nickname
            }
          />
        )}
        footerRender={() => <Render body={footer} data={props.data} />}
      >
        {props.children ?? <Render body={props.body} data={props.data} />}
      </ProLayout>
    </>
  );
};

export default Layout;
