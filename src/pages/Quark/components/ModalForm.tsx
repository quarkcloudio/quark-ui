import React, { useState, useEffect } from 'react';
import ProForm, {
  ModalForm as AntModalForm,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import FormItem from './FormItem';
import { history } from 'umi';
import { post, get } from '@/services/action';
import {
  Form as AntForm,
  message,
  Button
} from 'antd';

export interface ModalForm {
  key: number;
  form: any;
}

const ModalForm: React.FC<ModalForm> = (props:any) => {

  const [form] = AntForm.useForm();

  const onFinish = async (values: any) => {
    const result = await post({
      actionUrl: props.form.api,
      ...values
    });

    if(result.status === 'success') {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }

    if(result.url) {
      history.push(result.url);
    }
  };

  return (
    <ProCard
      headerBordered={true}
    >
      <AntModalForm
        form={form}
        trigger={
          <Button type="primary">
            新建表单
          </Button>
        }
        onFinish={async (values) => { onFinish(values) }}
      >

      </AntModalForm>
    </ProCard>
  );
}

export default ModalForm;