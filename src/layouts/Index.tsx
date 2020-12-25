import React, { useState, useEffect } from 'react';
import { useModel, history, Helmet } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.png';

const Index: React.FC<{}> = (props) => {
  const api = history.location.query.api;
  const { initialState } = useModel('@@initialState');
  const accountInfo = initialState.accountInfo;
  const quarkMenus = initialState.quarkMenus;
  const settings = initialState.settings;
  const [title, setTitle] = useState<string>('QuarkCMS');
  const [menuOpenKeys, setMenuOpenKeys] = useState([null]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([null]);

  useEffect(() => {
    if(quarkMenus) {
      const title = getMenuName(quarkMenus, decodeURIComponent(window.location.href));
      setTitle(title);
      const menuSelectedKey = getMenuKey(quarkMenus, decodeURIComponent(window.location.href));
      if(menuSelectedKey) {
        const menuOpenKey1 = getParentMenuKey(quarkMenus,menuSelectedKey, decodeURIComponent(window.location.href));
        if(menuOpenKey1) {
          if(!hasOpenKey(menuOpenKey1)) {
            menuOpenKeys.push(menuOpenKey1);
          }
          const menuOpenKey2 = getParentMenuKey(quarkMenus,menuOpenKey1, decodeURIComponent(window.location.href));
          if(menuOpenKey2) {
            if(!hasOpenKey(menuOpenKey2)) {
              menuOpenKeys.push(menuOpenKey2);
            }
          }
        }
        setMenuOpenKeys(menuOpenKeys);
        setMenuSelectedKeys([menuSelectedKey]);
      }
    }
  }, [api]);

  const hasOpenKey = (key: any) => {
    let result = false;
    menuOpenKeys.map((item: any) => {
      if(item == key) {
        result = true;
      }
    });
    return result;
  };

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

  const getParentMenuKey = (menus: any, key: string, path: string) => {
    let parentMenuKey:any = '';
    menus.map((item: any) => {
      if (item.hasOwnProperty('children')) {
        if (getMenuKey(item.children, path)) {
          if(key === getMenuKey(item.children, path)) {
            parentMenuKey = item.key;
          }
        }
      }
    });
    return parentMenuKey;
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? title : 'QuarkCMS'}</title>
      </Helmet>
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
    </>
  );
}

export default Index;