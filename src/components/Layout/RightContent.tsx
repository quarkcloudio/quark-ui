import { Tooltip, Space, Dropdown, Menu, Avatar } from 'antd';
import React from 'react';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import styles from './RightContent.less';
import {
  createFromIconfontCN,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const RightContent: React.FC<any> = (props) => {
  const IconFont = createFromIconfontCN({ scriptUrl: props.iconfontUrl });
  const getAccountInfo: any = sessionStorage.getItem('accountInfo');
  const accountInfo: any = JSON.parse(getAccountInfo);

  const onMenuClick = (event: any) => {
    if (event.key === 'logout') {
      loginOut();
      return;
    }

    if (event.key === 'setting') {
      history.push({
        pathname: '/index',
        query: { api: 'admin/account/setting-form' },
      });
      return;
    }

    history.push(`/account/${event.key}`);
  };

  // 退出登录
  const loginOut = async () => {
    const result = await get({
      url: '/api/admin/login/index/logout',
    });
    if (result['status'] === 'success') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('accountInfo');
    }
    history.push('/');
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="setting">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  // 解析actions
  const parseHeaderActions = (actions: any) => {
    let actionComponent: any = null;
    actionComponent = actions.map((item: any, key: any) => {
      let component: any = null;
      switch (item.component) {
        case 'a':
          // 跳转行为
          if (item.target === '_blank') {
            component = (
              <a
                key={key}
                href={item.href}
                target={item.target}
                style={item.style}
              >
                {item.title}
              </a>
            );
          } else {
            component = (
              <Link key={key} style={item.style} to={item.href}>
                {item.title}
              </Link>
            );
          }
          break;
        case 'icon':
          if (item.target === '_blank') {
            component = (
              <a
                key={key}
                href={item.href}
                target={item.target}
                style={item.style}
              >
                <Tooltip title={item.tooltip}>
                  {item.icon ? <IconFont type={item.icon} /> : null}
                </Tooltip>
              </a>
            );
          } else {
            component = (
              <Link key={key} style={item.style} to={item.href}>
                {item.icon ? <IconFont type={item.icon} /> : null}
              </Link>
            );
          }
          break;
        default:
          break;
      }
      return component;
    });
    return actionComponent;
  };

  return (
    <Space className={styles.right}>
      {props.headerActions ? parseHeaderActions(props.headerActions) : null}
      {accountInfo ? (
        <Dropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            {accountInfo.avatar ? (
              <Avatar
                size="small"
                className={styles.avatar}
                src={accountInfo.avatar}
              />
            ) : (
              <Avatar
                size="small"
                className={styles.avatar}
                icon={<UserOutlined />}
              />
            )}
            <span className={`${styles.name} anticon`}>
              {accountInfo.nickname}
            </span>
          </span>
        </Dropdown>
      ) : null}
    </Space>
  );
};

export default RightContent;
