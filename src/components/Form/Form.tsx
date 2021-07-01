import React, {  useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import { history } from 'umi';
import { post } from '@/services/action';
import moment from 'moment';
import Action from '@/components/Action/Action';
import Render from '@/components/Render';
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
  const formKey = props.formKey ? props.formKey : 'form';
  // 注册全局变量
  window[formKey] = form;

  useEffect(() => {
    let initialValues = props.initialValues;
    props?.body?.map((item:any) => {
      if(item.component === 'time') {
        if(initialValues.hasOwnProperty(item.name)) {
          initialValues[item.name] = moment(initialValues[item.name],item.format);
        }
      }
    })
    window[formKey].setFieldsValue(initialValues);
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
      form={window[formKey]}
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
                  return <Action {...action} submitForm={ action.submitForm ?? formKey } data={props.data}/>
                })}
              </Space>
            </AntForm.Item>
          );
        },
      }}
    >
      <Render body={props.body} data={props.data} />
    </ProForm>
  );
}

export default Form;