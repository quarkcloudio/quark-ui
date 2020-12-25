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
  const [menuOpenKeys, setMenuOpenKeys] = useState([quarkMenus?quarkMenus[0]['key']:null]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([quarkMenus?quarkMenus[0]['children'][0]['key']:null]);

  useEffect(() => {
    if(quarkMenus) {
      const title = getMenuName(quarkMenus, window.location.href);
      setTitle(title);
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
        headerTheme={settings.headerTheme}
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
