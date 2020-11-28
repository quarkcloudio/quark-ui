import { Tooltip, Tag, Space } from 'antd';
import React from 'react';
import { useModel, SelectLang, Link } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { createFromIconfontCN } from '@ant-design/icons';

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

  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });

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
              <a key={key} href={item.href} target={item.target} style={item.style}>
                {item.title}
              </a>
            } else {
              component = 
              <Link key={key} style={item.style} to={item.href}>
                {item.title}
              </Link>
            }
            break;
            
          case 'icon':
            if(item.target === '_blank') {
              component = 
              <a key={key} href={item.href} target={item.target} style={item.style}>
                <Tooltip title={item.tooltip}>
                  {item.icon ? <IconFont type={item.icon} /> : null}
                </Tooltip>
              </a>
            } else {
              component = 
              <Link key={key} style={item.style} to={item.href}>
                {item.icon ? <IconFont type={item.icon} /> : null}
              </Link>
            }
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
      { settings.headerActions ? parseHeaderActions(settings.headerActions) : null}
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
