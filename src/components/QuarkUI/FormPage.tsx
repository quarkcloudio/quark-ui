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
  api: string;
  search:[];
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
        disableReset:any,
        initialValues:[]
      }
    }
  };
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
}

const FormPage: React.SFC<FormPageProps> = props => {

  const {
    api,
    search,
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
        ...search
      },
      callback: (res:any) => {
        form.setFieldsValue(res.data.content.body.form.data);
      }
    });
  }, [dispatch, api, search]); // eslint-disable-line 

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
          <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
            {!!content.body.form.items && content.body.form.items.map((item:any) => {
              if(item.component == 'id') {
                return (
                  <Form.Item
                    style={{display:'none'}}
                    key={item.name}
                    name={item.name}
                  >
                    <Input/>
                  </Form.Item>
                )
              }

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

              if(item.component == 'radio') {
                return (
                  <Form.Item
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    rules={item.rules}
                  >
                    <Radio.Group options={item.options} />
                  </Form.Item>
                )
              }

            })}
            {(!content.body.form.disableSubmit && !content.body.form.disableReset) ? 
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
            : null}
            {(!content.body.form.disableSubmit && content.body.form.disableReset) ?
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
              </Form.Item>
            : null}
            {(content.body.form.disableSubmit && !content.body.form.disableReset) ? 
              <Form.Item
                wrapperCol={
                  { offset: 3, span: 21 }
                }
              >
                <Button
                  htmlType="button"
                  onClick={onReset}
                >
                  重置
                </Button>
              </Form.Item>
            : null}
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