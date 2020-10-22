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

export interface Form {
  form: any;
}

const Form: React.FC<Form> = (props:any) => {

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

  if(props.form.title) {
    return (
      <ProCard
        key={'proCard'+props.form.key}
        title={props.form.title}
        headerBordered={true}
        extra={
          <Button type="link" onClick={e => {history.go(-1);}}>
            返回上一页
          </Button>
        }
      >
        <ProForm
          form={form}
          onFinish={async (values) => { onFinish(values) }}
          style={props.form.style ? props.form.style : {margin:'25px',width:'100%'}}
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
          <FormItem form={form} items={props.form.items} />
        </ProForm>
      </ProCard>
    );
  } else {
    return (
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
        <FormItem form={form} items={props.form.items} />
      </ProForm>
    );
  }
}

export default Form;