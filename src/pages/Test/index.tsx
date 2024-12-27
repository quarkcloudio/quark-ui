import React from 'react';
import { Form } from 'antd';
import Sku from '@/components/Form/Field/Sku';
import {
  ProForm,
  ProCard,
  PageContainer,
  ProFormItem,
} from '@ant-design/pro-components';
import styles from './index.less';
import { values } from 'lodash-es';

const Index: React.FC<any> = () => {
  return (
    <PageContainer title="测试页">
      <ProCard>
        <ProForm
          onFinish={(values: any) => {
            console.log(values);
          }}
          layout="horizontal"
        >
          <ProFormItem name="sku">
            <Sku />
          </ProFormItem>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
