import React from 'react';
import { Form } from 'antd';
import Sku from '@/components/Form/Field/Sku';
import ImageBox from '@/components/Form/Field/ImageBox';
import {
  ProForm,
  ProCard,
  PageContainer,
  ProFormItem,
} from '@ant-design/pro-components';

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
          <ProFormItem name="image">
            <ImageBox />
          </ProFormItem>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
