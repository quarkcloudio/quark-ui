import React, { useEffect } from 'react';
import styles from './FormPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
  Cascader,
  Breadcrumb
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;

export interface FormPageProps {
  api?: string;
  content: {
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      form: {
        title:string,
        layout:any,
        items:any,
        action:string,
        disableSubmit:any,
        disableReset:any
      }
    }
  };
  routes:any;
  loading: boolean;
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const FormPage: React.SFC<FormPageProps> = props => {

  const {
    api,
    content,
    routes,
    loading,
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
        actionUrl: content.body.form.action,
        ...values
      }
    });
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
      <PageHeaderWrapper
        title={content ? content.title : false}
        subTitle={content.subTitle}
        content={content.description}
        breadcrumb={{routes}}
      >
        <Card
          size="small"
          title={content.body.form.title}
          bordered={false}
          extra={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}
        >
          <Form {...content.body.form.layout} form={form} onFinish={onFinish}>
            {!!content.body.form.items && content.body.form.items.map((item:any) => {
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
              {content.body.form.disableSubmit ? null :
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </Button>
              }
              {content.body.form.disableReset ? null :
                <Button
                  htmlType="button"
                  onClick={onReset}
                  style={{marginLeft:'8px'}}
                >
                  重置
                </Button>
              }
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
      : null}
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    loading,
  } = state.form;

  return {
    content,
    routes,
    loading,
  };
}

export default connect(mapStateToProps)(FormPage);