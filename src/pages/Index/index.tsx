import React, { useState, useEffect } from 'react';
import Engine from '@/components/Engine';
import styles from './index.less'
import { request } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider,
  Spin
} from 'antd';

const Index: React.FC<{}> = () => {

  const [initData, setInitApi] = useState();

  useEffect(() => {
    onSetInitApi()
  }, []);

  const onSetInitApi = async () => {
    const config = await request('./config.json');
    setInitApi(config.initApi);
  };

  return (
    <ConfigProvider locale={zhCN}>
      {initData ? <Engine initApi={initData} /> : <div className={styles.loading}><Spin /></div>}
    </ConfigProvider>
  );
}

export default Index;