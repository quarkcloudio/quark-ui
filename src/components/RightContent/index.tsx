import { Tooltip, Tag, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const settings = initialState.settings;
  const className = styles.right;

  // 解析actions
  const parseHeaderActions = (actions:any) => {
    let actionComponent:any = null;
    actionComponent = (
      actions.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'a':
            // 跳转行为
            if(item.target === '_blank') {
              component = 
              <a key={item.key} href={item.href} target={item.target} style={item.style}>
                {item.name}
              </a>
            } else {
              component = 
              <Link key={item.key} style={item.style} to={item.href}>
                {item.name}
              </Link>
            }
            break;

          case 'icon':
            component = <Tooltip title={item.tooltip}>
                          <span
                            onClick={() => {
                              window.location.href = 'http://www.quarkcms.com/';
                            }}
                          >
                            <QuestionCircleOutlined />
                          </span>
                        </Tooltip>
            break;

          default:
            break;
        }
        return component;
      })
    )
    return actionComponent;
  }

  return (
    <Space className={className}>
      { parseHeaderActions(settings.headerActions) }
      <Avatar menu={true} />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
