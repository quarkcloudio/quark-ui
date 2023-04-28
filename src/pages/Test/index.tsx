import React from 'react';
import { Space } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <PageContainer title="测试页">
      <ProCard>
        这是一个测试页
      </ProCard>
    </PageContainer>
  );
};

export default Index;
