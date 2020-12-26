import React, { useState, useEffect } from 'react';
import { useModel, history, Helmet } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.png';

import {
  Spin,
} from 'antd';

const Index: React.FC<{}> = (props) => {
  const api = history.location.query.api;
  const { initialState } = useModel('@@initialState');
  const accountInfo = initialState.accountInfo;
  const quarkMenus = initialState.quarkMenus;
  const settings = initialState.settings;
  const [title, setTitle] = useState<string>('QuarkCMS');
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([null]);

  var menuTreeList:any = [];

  const menuTreeToList = (menus: any) => {
    menus.map((item: any) => {
      menuTreeList.push(item);
      if (item.hasOwnProperty('children')) {
        menuTreeToList(item.children);
      }
    });
  };

  if(quarkMenus) {
    menuTreeToList(quarkMenus);
  }

  useEffect(() => {
    if(quarkMenus) {
      // 获取当前选中菜单的名称
      const title = getMenuName(quarkMenus, decodeURIComponent(window.location.href));
      // 设置页面标题
      setTitle(title);
      // 获取当前选中的菜单
      const menuSelectedKey = getMenuKey(quarkMenus, decodeURIComponent(window.location.href));
      // 获取当前展开的菜单
      getMenuOpenKeys(menuSelectedKey);
      // 设置选中菜单
      setMenuSelectedKeys([menuSelectedKey]);
    }
  }, [api]);

  const getMenuName = (menus: any, path: string) => {
    let menuName = '';
    menus.map((item: any) => {
      if (path.indexOf(item.path) != -1 && item.path.split('/').length >= 3) {
        menuName = item.name;
      } else {
        if (item.hasOwnProperty('children')) {
          if (getMenuName(item.children, path)) {
            menuName = getMenuName(item.children, path);
          }
        }
      }
    });
    return menuName;
  };

  const getMenuKey = (menus: any, path: string) => {
    let menuKey:any = '';
    menus.map((item: any) => {
      if (path.indexOf(item.path) != -1 && item.path.split('/').length >= 3) {
        menuKey = item.key
      } else {
        if (item.hasOwnProperty('children')) {
          if (getMenuKey(item.children, path)) {
            menuKey = getMenuKey(item.children, path);
          }
        }
      }
    });
    return menuKey;
  };

  // 获取当前展开的菜单
  const getMenuOpenKeys = (key: string) => {
    let menuRow = getMenuWithKey(key);
    let menuKey = getParentMenuKey(menuRow['pid']);
    if(menuKey) {
      if(!hasOpenKey(menuKey)) {
        menuOpenKeys.push(menuKey);
        setMenuOpenKeys(menuOpenKeys);
      }
      getMenuOpenKeys(menuKey);
    }
  };

  // 根据key获取菜单行
  const getMenuWithKey = (key: string) => {
    let row:any = '';
    menuTreeList.map((item: any) => {
      if (item.key == key) {
        row = item
      }
    });
    return row;
  };

  // 根据pid获取父亲菜单的key
  const getParentMenuKey = (pid: string) => {
    let menuKey:string = '';
    menuTreeList.map((item: any) => {
      if (item.id == pid) {
        menuKey = item.key
      }
    });
    return menuKey;
  };

  const hasOpenKey = (key: any) => {
    let isHas = false;
    menuOpenKeys.map((item: any) => {
      if(item == key) {
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
        if (item.hasOwnProperty('children')) {
          if (getMenuPath(item.children, key)) {
            menuPath = getMenuPath(item.children, key);
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
    history.push(getMenuPath(quarkMenus, event.key));
  };

  const onMenuOpenChange = (openKeys: any) => {
    setMenuOpenKeys(openKeys);
  };

  if (!accountInfo?.id && location.pathname !== '/user/login') {
    history.push('/user/login');
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? title : 'QuarkCMS'}</title>
      </Helmet>
      {!accountInfo?.id && location.pathname !== '/user/login' ?
        <Spin size="large">
          <div style={{
            display: 'flex',
            height: '100vh',
            overflow: 'auto'
          }}>

          </div>
        </Spin>
      :
        <ProLayout
          title={settings.title ? settings.title : 'QuarkCMS'}
          logo={settings.logo ? settings.logo : logo}
          contentStyle={settings.contentStyle}
          layout={settings.layout}
          contentWidth={settings.contentWidth}
          navTheme={settings.navTheme}
          primaryColor={settings.primaryColor}
          fixedHeader={settings.fixedHeader}
          fixSiderbar={settings.fixSiderbar}
          iconfontUrl={settings.iconfontUrl}
          locale={settings.locale}
          siderWidth={settings.siderWidth}
          splitMenus={settings.splitMenus}
          disableContentMargin={false}
          rightContentRender={() => <RightContent/>}
          menuDataRender= {() => quarkMenus}
          footerRender= {() => <Footer />}
          onPageChange= {() => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!accountInfo?.id && location.pathname !== '/user/login') {
              history.push('/user/login');
            }
          }}
          menuHeaderRender={ undefined }
          menuProps={{
            onOpenChange: onMenuOpenChange,
            onClick: onMenuClick,
          }}
          openKeys={menuOpenKeys}
          selectedKeys={menuSelectedKeys}
        >
          { props.children }
        </ProLayout>
      }
    </>
  );
}

export default Index;