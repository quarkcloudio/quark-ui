import React, {  useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import FormItem from './FormItem';
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
    let initialValues = props.form.initialValues;
    props.form.items.map((item:any) => {
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
          onFinish={async (values:any) => { onFinish(values) }}
          style={props.form.style ? props.form.style : {margin:'25px',width:'100%'}}
          colon={props.form.colon}
          labelAlign={props.form.labelAlign}
          name={props.form.name}
          preserve={props.form.preserve}
          requiredMark={props.form.requiredMark}
          scrollToFirstError={props.form.scrollToFirstError}
          size={props.form.size}
          layout={props.form.layout}
          labelCol={props.form.labelCol}
          wrapperCol={props.form.wrapperCol}
          dateFormatter={props.form.dateFormatter}
          submitter={{
            searchConfig: {
              resetText: props.form.resetButtonText,
              submitText: props.form.submitButtonText,
            },
            render: (proFormProps:any, doms:any) => {
              if(props.form.disabledResetButton === true && props.form.disabledSubmitButton === true && props.form.disabledBackButton === true) {
                return null;
              }

              return (
                <AntForm.Item wrapperCol={props.form.buttonWrapperCol}>
                  <Space>
                    {!props.form.disabledResetButton ? 
                        doms[0]
                      : null}
                    {!props.form.disabledSubmitButton ? 
                        doms[1]
                      : null}
                    {!props.form.disabledBackButton ? 
                        <Button onClick={e => history.go(-1)}>{props.form.backButtonText}</Button>
                      : null}
                  </Space>
                </AntForm.Item>
              );
            },
          }}
        >
          <FormItem form={form} items={props.form.items} />
        </ProForm>
      </ProCard>
    );
  } else {
    return (
      <ProForm
        form={form}
        onFinish={async (values:any) => { onFinish(values) }}
        style={props.form.style}
        colon={props.form.colon}
        labelAlign={props.form.labelAlign}
        name={props.form.name}
        preserve={props.form.preserve}
        requiredMark={props.form.requiredMark}
        scrollToFirstError={props.form.scrollToFirstError}
        size={props.form.size}
        layout={props.form.layout}
        labelCol={props.form.labelCol}
        wrapperCol={props.form.wrapperCol}
        dateFormatter={props.form.dateFormatter}
        submitter={{
          searchConfig: {
            resetText: props.form.resetButtonText,
            submitText: props.form.submitButtonText,
          },
          render: (proFormProps:any, doms:any) => {
            if(props.form.disabledResetButton === true && props.form.disabledSubmitButton === true && props.form.disabledBackButton === true) {
              return null;
            }

            return (
              <AntForm.Item wrapperCol={props.form.buttonWrapperCol}>
                <Space>
                  {!props.form.disabledResetButton ? 
                      doms[0]
                    : null}
                  {!props.form.disabledSubmitButton ? 
                      doms[1]
                    : null}
                  {!props.form.disabledBackButton ? 
                      <Button onClick={e => history.go(-1)}>{props.form.backButtonText}</Button>
                    : null}
                </Space>
              </AntForm.Item>
            );
          },
        }}
      >
        <FormItem form={form} items={props.form.items} />
      </ProForm>
    );
  }
}

export default Form;