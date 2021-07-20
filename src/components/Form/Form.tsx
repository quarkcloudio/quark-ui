import React, {  useEffect, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { tplEngine } from '@/utils/template';
import { reload } from '@/utils/reload';
import { history } from 'umi';
import { post, get } from '@/services/action';
import moment from 'moment';
import Action from '@/components/Action/Action';
import Render from '@/components/Render';
import {
  Form as AntForm,
  message,
  Space,
  Spin
} from 'antd';

export interface Form {
  form: any;
}

const Form: React.FC<Form> = (props:any) => {

  const [form] = AntForm.useForm();
  const formKey = props.formKey ? props.formKey : 'form';
  const [spinning, setLoading] = useState(false);
  // 注册全局变量
  window[formKey] = form;

  useEffect(() => {
    if(props.initApi) {
      getInitialValues();
    }
  }, []);

  const getInitialValues = async () => {
    if(props.initApi) {
      setLoading(true);

      let result = await get({
        actionUrl: tplEngine(props.initApi,props.data)
      });

      window[formKey].setFieldsValue(result.data);
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    const result = await post({
      actionUrl: props.api,
      ...values
    });

    if(result.status === 'success') {
      
      if(props.callback) {
        props.callback()
      }

      message.success(result.msg);
    } else {
      message.error(result.msg);
    }

    if(result.url) {
      if(result.url === 'reload') {
        reload()
      } else {
        history.push(result.url);
      }
    }
  };

  return (
    <Spin spinning={spinning}>
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
            if(props?.actions) {
              return (
                <AntForm.Item wrapperCol={props.buttonWrapperCol}>
                  <Space>
                    {props?.actions?.map((action:any) => {
                      return <Action {...action} submitForm={ action.submitForm ?? formKey } data={props.data} callback={props.callback}/>
                    })}
                  </Space>
                </AntForm.Item>
              )
            }
          },
        }}
      >
        <Render body={props.body} data={props.data} callback={props.callback}/>
      </ProForm>
    </Spin>
  );
}

export default Form;