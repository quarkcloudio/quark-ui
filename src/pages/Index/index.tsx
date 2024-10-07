import React, { useState, useEffect } from 'react';
import { useLocation, request } from '@umijs/max';
import { ConfigProvider, App, Spin } from 'antd';
import Engine from '@/components/Engine';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import qs from 'query-string';
import styles from './index.less';

const Index: React.FC = () => {
  const location = useLocation();
  const query = qs.parse(location.search);
  const [api, setApi] = useState(String);
  dayjs.locale('zh-cn');
  const getApi = async () => {
    const config = await request('./config.json');
    let api = config.api.default;
    if (query?.api) {
      api = query.api;
    }

    setApi(api);
  };

  useEffect(() => {
    getApi();
  }, [location.search]);

  return (
    <ConfigProvider locale={locale}>
      <App>
        {api ? (
          <Engine api={api} />
        ) : (
          <div className={styles.loading}>
            <Spin />
          </div>
        )}
      </App>
    </ConfigProvider>
  );
};

export default Index;
