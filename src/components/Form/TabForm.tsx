import React, { useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import Item from './Item';
import { history } from 'umi';
import { post } from '@/services/action';
import moment from 'moment';
import {
  Form,
  message,
  Button,
  Space
} from 'antd';

export interface Form {
  key: number;
  form: any;
}

const TabForm: React.FC<Form> = (props:any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    let initialValues = props.form.initialValues;

    props.form.tab.map((tab: any, index: any) => {
      tab.items.map((item:any) => {
        if(item.component === 'time') {
          if(initialValues.hasOwnProperty(item.name)) {
            initialValues[item.name] = moment(initialValues[item.name],item.format);
          }
        }
      })
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

  const formButtonRender = (form: any) => {
    if(form.disabledResetButton === true && form.disabledSubmitButton === true && form.disabledBackButton === true) {
      return null;
    }

    return (
      <Form.Item wrapperCol={props.form.buttonWrapperCol}>
        <Space>
          {!form.disabledResetButton ? 
              <Button onClick={()=>form.resetFields()}>
                {form.resetButtonText}
              </Button>
            : null}
          {!form.disabledSubmitButton ? 
              <Button type="primary" htmlType="submit">
                {form.submitButtonText}
              </Button>
            : null}
          {!form.disabledBackButton ? 
              <Button onClick={e => history.go(-1)}>{form.backButtonText}</Button>
            : null}
        </Space>
      </Form.Item>
    );
  };

  return (
    <Form
      form={form}
      onFinish={async (values) => { onFinish(values) }}
      key={props.form.key}
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
      <ProCard
        key={'proCard'+props.form.key}
        headerBordered={true}
        tabs={{
          tabPosition:'top',
          defaultActiveKey: '1',
          tabBarExtraContent:
          <Button type="link" onClick={e => history.go(-1)}>
            返回上一页
          </Button>
        }}
      >
        {props.form.tab.map((tab: any, index: any) => {
          return (
            <ProCard.TabPane key={(index + 1).toString()} tab={tab.title}>
              <Item key={props.form.key + 'Item' + (index + 1).toString()} form={form} items={tab.items} />
              {formButtonRender(props.form)}
            </ProCard.TabPane>
          );
        })}
      </ProCard>
    </Form>
  );
}

export default TabForm;