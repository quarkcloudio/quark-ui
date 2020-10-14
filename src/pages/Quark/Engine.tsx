import React from 'react';
import ComponentRender from '@/pages/Quark/components/ComponentRender';
import zhCN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider
} from 'antd';

const Engine: React.FC<{}> = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ComponentRender />
    </ConfigProvider>
  );
}

export default Engine;