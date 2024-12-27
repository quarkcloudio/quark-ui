import React from 'react';
import { Form } from 'antd';
import Sku from '@/components/Form/Field/Sku';
import { ProForm, ProCard, PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const Index: React.FC<any> = () => {
  return (
    <PageContainer title="测试页">
      <ProCard>
        <ProForm layout="horizontal">
          <Sku />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
