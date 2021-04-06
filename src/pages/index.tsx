import React from 'react';
import Engine from '@/components/Engine';
import zhCN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider
} from 'antd';

const Index: React.FC<{}> = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Engine api='layout/container' />
    </ConfigProvider>
  );
}

export default Index;