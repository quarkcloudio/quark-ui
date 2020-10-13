import React from 'react';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import FormItem from './FormItem';
import { history } from 'umi';
import { post } from '@/services/action';
import {
  Form as AntForm,
  message,
  Button
} from 'antd';

export interface Table {
  key: number;
  form: any;
}

const Form: React.FC<Table> = (props:any) => {

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
      key={'proCard'+props.form.key}
      title={props.form.title}
      headerBordered={true}
    >
      <ProForm
        form={form}
        onFinish={async (values) => { onFinish(values) }}
        style={props.form.style}
        colon={props.form.colon}
        initialValues={props.form.initialValues}
        labelAlign={props.form.labelAlign}
        name={props.form.name}
        preserve={props.form.preserve}
        requiredMark={props.form.requiredMark}
        scrollToFirstError={props.form.scrollToFirstError}
        size={props.form.size}
        layout={props.form.layout}
        labelCol={props.form.labelCol}
        wrapperCol={props.form.wrapperCol}
      >
        <FormItem form={form} initialValues={props.form.initialValues} items={props.form.items} />
      </ProForm>
    </ProCard>
  );
}

export default Form;