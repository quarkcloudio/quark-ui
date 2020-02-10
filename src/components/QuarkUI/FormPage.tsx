import React, { useEffect } from 'react';
import styles from './FormPage.less';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Card,
  Spin,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Tree,
  Cascader
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;

export interface FormPageProps {
  title:string;
  loading: boolean;
  api?: string;
  layout?: [];
  items?: [];
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const FormPage: React.SFC<FormPageProps> = props => {

  const {
    title,
    loading,
    api,
    layout,
    items,
    dispatch
  } = props;

  const [form] = Form.useForm();

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'form/info',
      payload: {
        actionUrl: api,
      }
    });
  }, [dispatch, api]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values:any) => {
    dispatch({
      type: 'form/submit',
      payload: {
        actionUrl: 'admin/login',
        ...values
      }
    });
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{background:'#fff'}}>
      <Card
        size="small"
        title={title}
        bordered={false}
        extra={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}
      >
        <Form {...layout} form={form} onFinish={onFinish}>
          {!!items && items.map((item:any) => {
            if(item.component == 'input') {
              return (
                <Form.Item
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                >
                  <Input
                    placeholder={item.placeholder}
                    style={item.style ? item.style : []}
                  />
                </Form.Item>
              )
            }
          })}
          <Form.Item
            wrapperCol={
              { offset: 3, span: 21 }
            }
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
            <Button 
              htmlType="button"
              onClick={onReset}
              style={{marginLeft:'8px'}}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    title,
    loading,
    layout,
    items,
  } = state.form;

  return {
    title,
    loading,
    layout,
    items,
  };
}

export default connect(mapStateToProps)(FormPage);