import React, { useEffect } from 'react';
import styles from './ShowPage.less';
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
  Breadcrumb,
  Popconfirm,
  Row, Col
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;

export interface ShowPageProps {
  api: string;
  search:{id:any};
  content: {
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      show: {
        title:string,
        layout:any,
        items:any,
        disableSubmit:any,
        disableReset:any
      }
    }
  };
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
}

const ShowPage: React.SFC<ShowPageProps> = props => {

  const {
    api,
    search,
    content,
    routes,
    loading,
    dispatch
  } = props;

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'show/info',
      payload: {
        actionUrl: api,
        ...search
      }
    });
  }, [dispatch, api, search]);

  const destroy = () => {
    dispatch({
      type: 'show/submit',
      payload: {
        actionUrl: api.replace(/\/show/g, '/destroy'),
        id:search.id
      },
      callback: (res:any) => {
        // 操作成功
        if (res.status === 'success') {
          // 页面跳转
          router.push("#/admin/quark/engine?api="+api.replace(/\/show/g, '/index')+"&component=table");
        }
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
          title={content.body.show.title}
          bordered={false}
          extra={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}
        >
          <Form {...content.body.show.layout} style={{marginTop:'20px'}}>
            {!!content.body.show.items && content.body.show.items.map((item:any) => {
              if(item.component == 'text') {
                return (
                  <Form.Item
                    key={item.name}
                    label={item.label}
                    name={item.name}
                  >
                    <div>{item.value}</div>
                  </Form.Item>
                )
              }
            })}
            {(!content.body.show.disableSubmit && !content.body.show.disableReset) ? 
              <Form.Item
                wrapperCol={
                  { offset: 3, span: 21 }
                }
              >
                <Button
                  type="primary"
                  href={"#/admin/quark/engine?api="+api.replace(/\/show/g, '/edit')+"&component=form"+"&search[id]="+search.id}
                >
                  编辑
                </Button>
                <Popconfirm title="确定删除吗？" onConfirm={destroy} okText="确认" cancelText="取消">
                  <Button
                    type="primary"
                    style={{marginLeft:'8px'}}
                    danger
                  >
                    删除
                  </Button>
                </Popconfirm>
                <Button
                  style={{marginLeft:'8px'}}
                  href={"#/admin/quark/engine?api="+api.replace(/\/show/g, '/index')+"&component=table"}
                >
                  查看列表
                </Button>
              </Form.Item>
            : null}
            {(!content.body.show.disableSubmit && content.body.show.disableReset) ?
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
            {(content.body.show.disableSubmit && !content.body.show.disableReset) ? 
              <Form.Item
                wrapperCol={
                  { offset: 3, span: 21 }
                }
              >
                <Button
                  htmlType="button"
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
  } = state.show;

  return {
    content,
    routes,
    loading,
  };
}

export default connect(mapStateToProps)(ShowPage);