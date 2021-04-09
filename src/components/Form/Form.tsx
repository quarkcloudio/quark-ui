import React, {  useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import Item from './Item';
import { history } from 'umi';
import { post } from '@/services/action';
import moment from 'moment';
import {
  Space,
  Form as AntForm,
  message,
  Button
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
          if(props.disabledResetButton === true && props.disabledSubmitButton === true && props.disabledBackButton === true) {
            return null;
          }
          return (
            <AntForm.Item wrapperCol={props.buttonWrapperCol}>
              <Space>
                {!props.disabledResetButton ? 
                    doms[0]
                  : null}
                {!props.disabledSubmitButton ? 
                    doms[1]
                  : null}
                {!props.disabledBackButton ? 
                    <Button onClick={e => history.go(-1)}>{props.backButtonText}</Button>
                  : null}
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