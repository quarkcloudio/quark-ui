import React from 'react';
import { Form } from 'antd';
import ImagePicker from '@/components/Form/Field/ImagePicker';
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
            <ImagePicker />
          </ProFormItem>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
