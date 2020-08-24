import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Dropdown, Avatar, Menu, Spin } from 'antd';
import logo from '../assets/logo.png';
import ProLayout from '@ant-design/pro-layout';
import { history, Helmet } from 'umi';

import { createFromIconfontCN } from '@ant-design/icons';

import styles from './AdminLayout.less';

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

interface IProps {
  dispatch: Dispatch<any>;
  menus: [];
  accountInfo: {
    nickname: '';
    username: '';
    avatar: '';
  };
}

class AdminLayout extends Component<IProps> {
  state = {
    logo: '',
    name: '',
    description: '',
    collapsed: false,
    menuOpenKeys: ['/dashboard'],
    menuSelectedKeys: ['/dashboard/index'],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/appInfo',
      },
      callback: (res: any) => {
        if (res) {
          this.setState({ ...res.data });
        }
      },
    });

    this.props.dispatch({
      type: 'global/getAccountInfo',
      payload: {
        actionUrl: 'admin/account/info',
      },
    });

    this.props.dispatch({
      type: 'global/getMenus',
      payload: {
        actionUrl: 'admin/account/menus',
      },
    });

    let menuSelectedKeys = [];
    menuSelectedKeys.push(this.props.location.query.api);
    this.setState({
      menuSelectedKeys: menuSelectedKeys,
    });
  }

  onMenuClick = (event: any) => {
    let menuSelectedKeys = [];
    menuSelectedKeys.push(event.key);
    this.setState({
      menuSelectedKeys: menuSelectedKeys,
    });
    history.push(event.key);
  };

  onMenuOpenChange = (openKeys: any) => {
    let menuOpenKeys = [];
    menuOpenKeys.push(openKeys);
    this.setState({
      menuOpenKeys: openKeys,
    });
  };

  onAvatarMenuClick = (event: any) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }

    if (key === 'settings') {
      history.push('/account/settings/info');
      return;
    }
  };

  render() {
    const { menus, accountInfo, children } = this.props;

    const menu = (
      <Menu onClick={this.onAvatarMenuClick}>
        <Menu.Item key="settings">
          <Iconfont type={'icon-setting'} /> 个人设置
        </Menu.Item>
        <Menu.Item key="logout">
          <Iconfont type={'icon-logout'} /> 退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div
        style={{
          transform: 'rotate(0)',
          overflowX: 'hidden',
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.name ? this.state.name : 'Quark'}</title>
        </Helmet>
        <ProLayout
          style={{
            height: '100vh',
          }}
          title={this.state.name ? this.state.name : 'Quark'}
          logo={this.state.logo ? this.state.logo : logo}
          menuDataRender={() => menus}
          fixedHeader={true}
          fixSiderbar={true}
          rightContentRender={() => (
            <div className={styles.right}>
              {accountInfo ? (
                <Dropdown className={styles.container} overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar
                      size="small"
                      className={styles.avatar}
                      src={accountInfo.avatar}
                      alt="avatar"
                    />
                    <span className={styles.name}>{accountInfo.nickname}</span>
                  </span>
                </Dropdown>
              ) : (
                <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
              )}
            </div>
          )}
          menuProps={{
            onOpenChange: this.onMenuOpenChange,
            onClick: this.onMenuClick,
          }}
          openKeys={this.state.menuOpenKeys}
          selectedKeys={this.state.menuSelectedKeys}
        >
          {children}
        </ProLayout>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { menus, accountInfo } = state.global;
  return {
    menus,
    accountInfo,
  };
}

export default connect(mapStateToProps)(AdminLayout);
