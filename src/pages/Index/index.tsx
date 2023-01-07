import React, { useState, useEffect } from 'react';
import Engine from '@/components/Engine';
import styles from './index.less';
import { history, request } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Spin } from 'antd';

const Index: React.FC<{}> = () => {
  const query = history.location.query;
  const [api, setApi] = useState(String);

  useEffect(() => {
    getApi();
  }, [api]);

  const getApi = async () => {
    const config = await request('./config.json');
    let api = config.api;
    if (query?.api) {
      api = query.api;
    }

    setApi(api);
  };

  return (
    <ConfigProvider locale={zhCN}>
      {api ? (
        <Engine api={api} />
      ) : (
        <div className={styles.loading}>
          <Spin />
        </div>
      )}
    </ConfigProvider>
  );
};

export default Index;
