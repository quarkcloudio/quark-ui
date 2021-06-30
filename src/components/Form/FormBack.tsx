import React, {  useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import Item from './Item';
import { history } from 'umi';
import { post } from '@/services/action';
import moment from 'moment';
import Action from '@/components/Action/Action';
import {
  Form as AntForm,
  message,
  Space
} from 'antd';

export interface Form {
  form: any;
}

const Form: React.FC<Form> = (props:any) => {

  const [form] = AntForm.useForm();

  useEffect(() => {
    let initialValues = props.initialValues;
    props?.items?.map((item:any) => {
      if(item.component === 'time') {
        if(initialValues.hasOwnProperty(item.name)) {
          initialValues[item.name] = moment(initialValues[item.name],item.format);
        }
      }
    })
    form.setFieldsValue(initialValues);
  }, []);

  const onFinish = async (values: any) => {
    const result = await post({
      actionUrl: props.api,
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
    <ProForm
      {...props}
      form={form}
      onFinish={async (values:any) => { onFinish(values) }}
      submitter={{
        searchConfig: {
          resetText: props.resetButtonText,
          submitText: props.submitButtonText,
        },
        render: (proFormProps:any, doms:any) => {
          return (
            <AntForm.Item wrapperCol={props.buttonWrapperCol}>
              <Space>
                {props?.actions?.map((action:any) => {
                  return <Action {...action} form={form} data={props.data}/>
                })}
              </Space>
            </AntForm.Item>
          );
        },
      }}
    >
      <Item form={form} items={props.items} />
    </ProForm>
  );
}

export default Form;