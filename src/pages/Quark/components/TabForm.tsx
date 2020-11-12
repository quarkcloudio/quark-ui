import React, { useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import FormItem from './FormItem';
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

  return (
    <Form
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
              <FormItem form={form} items={tab.items} />
              <Form.Item >
               <Space>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button onClick={()=>form.resetFields()}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </ProCard.TabPane>
          );
        })}
      </ProCard>
    </Form>
  );
}

export default TabForm;