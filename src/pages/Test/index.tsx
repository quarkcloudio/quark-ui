import React, { useState, useEffect } from 'react';
import { ConfigProvider,Space } from 'antd';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { PageContainer, ProForm, ProFormItem, ProFormText, ProFormSelect,ProFormGroup } from '@ant-design/pro-components';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <PageContainer title="输入表单">
        <ProForm
          onFinish={async (values) => console.log(values)}
          initialValues={{name:"tt"}}
        >
          <ProFormItem label="BirthDate" style={{ marginBottom: 0 }}>
            <Space>
              <ProFormText
                name="name"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                name={['name2', 'text']}
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                name={['name3', 'text']}
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
            </Space>
          </ProFormItem>
          <ProFormItem label="BirthDate" style={{ marginBottom: 0 }}>
            <Space>
              <ProFormText
                name="name"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                name={['name2', 'text']}
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                name={['name3', 'text']}
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
            </Space>
          </ProFormItem>
        </ProForm>
      </PageContainer>
    </ConfigProvider>
  );
};

export default Index;
