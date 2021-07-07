import React, {  useEffect, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { dataMapping, tplEngine } from '@/utils/template';
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
    let initialValues = props.initialValues;
    props?.body?.map((item:any) => {
      if(item.component === 'time') {
        if(initialValues.hasOwnProperty(item.name)) {
          initialValues[item.name] = moment(initialValues[item.name],item.format);
        }
      }
    })

    props.initApi ? getInitialValues() : window[formKey].setFieldsValue(initialValues);
    
  }, [props]);

  const getInitialValues = async () => {
    if(props.initApi) {
      setLoading(true);

      let result = await get({
        actionUrl: dataMapping(props.initApi,props.data)
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
      // 弹窗、抽屉等表单，提交完成后重置表单
      window[formKey]?.resetFields?.();

      if(props.callback) {
        props.callback()
      }

      message.success(result.msg);
    } else {
      message.error(result.msg);
    }

    if(result.url) {
      history.push(result.url);
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