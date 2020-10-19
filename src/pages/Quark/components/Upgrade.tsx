import React, { useState, useEffect } from 'react';

import {
  Affix,
  Button,
  Badge,
  Tooltip
} from 'antd';

import {
  ArrowUpOutlined,
  SyncOutlined
} from '@ant-design/icons';

const Upgrade: React.FC<any> = props => {

  const [canUpgrade, checkUpgrade] = useState(false);
  const [checking, checkUpgrading] = useState(false);

  const {
    api,
    dispatch
  } = props;

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'show/info',
      payload: {
        actionUrl: api
      }
    });
    checkUpdate()
  }, [dispatch, api]); // eslint-disable-line 

  const checkUpdate = () =>  { // eslint-disable-line 
    checkUpgrading(true)
    // 调用model
    dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/upgrade/index',
      },
      callback: (res:any) => {
        if (res) {
          checkUpgrading(false)
          checkUpgrade(res.data.can_upgrade);
        }
      },
    });
  }

  return (
    <Affix offsetBottom={20} style={{float:'right'}}>
      <span>
      {canUpgrade ?
        <Tooltip title="有新版可以更新">
          <Badge dot>
            <a href="#/upgrade/index">
              <Button size={'large'} type="primary" shape="circle" icon={<ArrowUpOutlined />} />
            </a>
          </Badge>
        </Tooltip>
      :
        <Tooltip title="检查更新">
          <Button size={'large'} type="primary" shape="circle" onClick={checkUpdate} icon={<SyncOutlined spin={checking}/> }/>
        </Tooltip>
      }
      </span>
    </Affix>
  );
};

export default Upgrade;