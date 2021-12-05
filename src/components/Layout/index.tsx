import React, { useState, useEffect } from 'react';
import { history, Helmet, useModel } from 'umi';
import Render from '@/components/Render';
import RightContent from '@/components/Layout/RightContent';
import ProLayout from '@ant-design/pro-layout';
import logo from '@/assets/logo.png';

const Layout: React.FC<any> = (props: any) => {
  const { pageLoading, changePageLoading } = useModel('global', (model) => ({
    pageLoading: model.pageLoading,
    changePageLoading: model.changePageLoading,
  }));

  const body = props.body;
  const data = props.data;
  const children = props.children;

  if (props.cache) {
    const layout = sessionStorage.getItem('layout');
    if (!layout) {
      // 记录布局
      sessionStorage.setItem('layout', JSON.stringify(props));
    } else {
      props = JSON.parse(layout);
    }
  }

  const query: any = history.location.query;
  const [title, setTitle] = useState<string>(props.title);
  const [menuOpenKeys, setMenuOpenKeys] = useState<any>([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([null]);

  var menuTreeList: any = [];

  const menuTreeToList = (menus: any, pkey: any = 0) => {
    menus.map((item: any) => {
      item['pkey'] = pkey;
      menuTreeList.push(item);
      if (item.hasOwnProperty('routes')) {
        menuTreeToList(item.routes, item.key);
      }
    });
  };

  if (props.menu) {
    menuTreeToList(props.menu);
  }

  useEffect(() => {
    if (props.menu && query.api) {
      // 获取当前选中菜单的名称
      const title = getMenuName(props.menu, decodeURIComponent(query.api));
      // 设置页面标题
      setTitle(title);
      // 获取当前选中的菜单
      const menuSelectedKey = getMenuKey(
        props.menu,
        decodeURIComponent(query.api),
      );
      // 获取当前展开的菜单
      getMenuOpenKeys(menuSelectedKey);
      // 设置选中菜单
      setMenuSelectedKeys([menuSelectedKey]);
    }
  }, [query.api]);

  const getMenuName = (menus: any, path: string) => {
    let menuName = '';
    menus.map((item: any) => {
      if (item.path.indexOf(path) != -1) {
        menuName = item.name;
      } else {
        if (item.hasOwnProperty('routes')) {
          if (getMenuName(item.routes, path)) {
            menuName = getMenuName(item.routes, path);
          }
        }
      }
    });
    return menuName;
  };

  const getMenuKey = (menus: any, path: string) => {
    let menuKey: any = '';
    menus.map((item: any) => {
      if (item.path.indexOf(path) != -1) {
        menuKey = item.key;
      } else {
        if (item.hasOwnProperty('routes')) {
          if (getMenuKey(item.routes, path)) {
            menuKey = getMenuKey(item.routes, path);
          }
        }
      }
    });
    return menuKey;
  };

  // 获取当前展开的菜单
  const getMenuOpenKeys = (key: string) => {
    let menuRow = getMenuWithKey(key);
    let menuKey = getParentMenuKey(menuRow['pkey']);
    if (menuKey) {
      if (!hasOpenKey(menuKey)) {
        menuOpenKeys.push(menuKey);
        setMenuOpenKeys(menuOpenKeys);
      }
      getMenuOpenKeys(menuKey);
    }
  };

  // 根据key获取菜单行
  const getMenuWithKey = (key: string) => {
    let row: any = '';
    menuTreeList.map((item: any) => {
      if (item.key == key) {
        row = item;
      }
    });
    return row;
  };

  // 根据pkey获取父亲菜单的key
  const getParentMenuKey = (pkey: string) => {
    let menuKey: string = '';
    menuTreeList.map((item: any) => {
      if (item.key == pkey) {
        menuKey = item.key;
      }
    });
    return menuKey;
  };

  const hasOpenKey = (key: any) => {
    let isHas = false;
    menuOpenKeys.map((item: any) => {
      if (item == key) {
        isHas = true;
      }
    });
    return isHas;
  };

  const getMenuPath = (menus: any, key: string) => {
    let menuPath = '';
    menus.map((item: any) => {
      if (key == item.key) {
        menuPath = item.path;
      } else {
        if (item.hasOwnProperty('routes')) {
          if (getMenuPath(item.routes, key)) {
            menuPath = getMenuPath(item.routes, key);
          }
        }
      }
    });
    return menuPath;
  };

  const onMenuClick = (event: any) => {
    let menuSelectedKeys = [];
    menuSelectedKeys.push(event.key);
    setMenuSelectedKeys(menuSelectedKeys);
    history.push(getMenuPath(props.menu, event.key));
  };

  const onMenuOpenChange = (openKeys: any) => {
    setMenuOpenKeys(openKeys);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <ProLayout
        {...props}
        loading={pageLoading}
        logo={props.logo ? props.logo : logo}
        iconfontUrl={
          props.iconfontUrl
            ? props.iconfontUrl
            : '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
        }
        menuDataRender={() => props.menu}
        rightContentRender={() => (
          <RightContent
            headerActions={props.headerActions}
            iconfontUrl={
              props.iconfontUrl
                ? props.iconfontUrl
                : '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
            }
          />
        )}
        openKeys={menuOpenKeys}
        selectedKeys={menuSelectedKeys}
        menuProps={{
          onOpenChange: onMenuOpenChange,
          onClick: onMenuClick,
        }}
        footerRender={() => <Render body={props.footer} data={data} />}
      >
        {children ?? <Render body={body} data={data} />}
      </ProLayout>
    </>
  );
};

export default Layout;
