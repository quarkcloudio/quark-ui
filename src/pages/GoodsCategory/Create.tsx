import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import { parse } from 'qs';

import {
  Card,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Tag,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Transfer,
  Table,
  Divider,
  Drawer,
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

class CreatePage extends Component<any> {

  state = {
    data: {},
    status: '',
    loading: false,
    coverId: false,
    attributeTable: [],
    attributeSearch: [],
    attributeSelectedIds: [],
    attributeSelectedData: [],
    attributeDrawerVisible: false,
    specificationTable: [],
    specificationSearch: [],
    specificationSelectedIds: [],
    specificationSelectedData: [],
    specificationDrawerVisible: false,
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {
    // 获得url参数
    const params = this.props.location.query;

    // loading
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsCategory/create',
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ data: res.data });
        }
      },
    });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsAttribute/index',
        attributeSelectedIds: this.state.attributeSelectedIds,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ attributeTable: res.data.table });
        }
      },
    });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsSpecification/index',
        specificationSelectedIds: this.state.specificationSelectedIds,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ specificationTable: res.data.table });
        }
      },
    });
  }

  attributeShowDrawer = () => {
    this.setState({
      attributeDrawerVisible: true,
    });
  };

  attributeCloseDrawer = () => {
    this.setState({
      attributeDrawerVisible: false,
    });
  };

  // 分页切换
  attributeChangePagination = (pagination:any, filters:any, sorter:any) => {
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsAttribute/index',
        pageSize: pagination.pageSize, // 分页数量
        current: pagination.current, // 当前页码
        sortField: sorter.field, // 排序字段
        sortOrder: sorter.order, // 排序规则
        ...filters, // 筛选
        search: this.state.attributeSearch,
        attributeSelectedIds: this.state.attributeSelectedIds,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ attributeTable: res.data.table });
        }
      },
    });
  };

  // 搜索
  attributeOnSearch = () => {
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        values['name'] = values['attributeName'];
        values['goodsTypeId'] = values['attributeGoodsTypeId'];

        this.props.dispatch({
          type: 'request/get',
          payload: {
            actionUrl: 'admin/goodsAttribute/index',
            ...this.state.attributeTable.pagination,
            search: values,
            attributeSelectedIds: this.state.attributeSelectedIds,
          },
          callback: (res:any) => {
            if (res) {
              this.setState({ attributeTable: res.data.table, attributeSearch: values });
            }
          },
        });
      }
    });
  };

  specificationShowDrawer = () => {
    this.setState({
      specificationDrawerVisible: true,
    });
  };

  specificationCloseDrawer = () => {
    this.setState({
      specificationDrawerVisible: false,
    });
  };

  // 分页切换
  specificationChangePagination = (pagination:any, filters:any, sorter:any) => {
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsSpecification/index',
        pageSize: pagination.pageSize, // 分页数量
        current: pagination.current, // 当前页码
        sortField: sorter.field, // 排序字段
        sortOrder: sorter.order, // 排序规则
        ...filters, // 筛选
        search: this.state.specificationSearch,
        specificationSelectedIds: this.state.specificationSelectedIds,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ specificationTable: res.data.table });
        }
      },
    });
  };

  // 搜索
  specificationOnSearch = () => {
    this.props.form.validateFields((err:any, values:any) => {
      values['name'] = values['specificationName'];
      values['goodsTypeId'] = values['specificationGoodsTypeId'];

      if (!err) {
        this.props.dispatch({
          type: 'request/get',
          payload: {
            actionUrl: 'admin/goodsSpecification/index',
            ...this.state.specificationTable.pagination,
            search: values,
            specificationSelectedIds: this.state.specificationSelectedIds,
          },
          callback: (res:any) => {
            if (res) {
              this.setState({ specificationTable: res.data.table, specificationSearch: values });
            }
          },
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      values['cover_id'] = this.state.coverId;

      // 验证正确提交表单
      if (!err) {
        this.props.dispatch({
          type: 'action/post',
          payload: {
            actionUrl: 'admin/goodsCategory/store',
            ...values,
          },
        });
      }
    });
  };

  brandFilterOption = (inputValue:any, option:any) => option.title.indexOf(inputValue) > -1;

  brandChange = (targetKeys:any) => {
    let data = this.state.data;
    data.goodsBrandSelectedKeys = targetKeys;
    this.setState({ data: data });
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 18,
        offset: 2,
      },
    };

    // 单图片上传模式
    let uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const attributeColumns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '属性值',
        dataIndex: 'goods_attribute_values',
        key: 'goods_attribute_values',
      },
      {
        title: '操作',
        key: 'action',
        render: (text:any, record:any, index:any) => <a >选择</a>,
      },
    ];

    const specificationColumns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '属性值',
        dataIndex: 'goods_attribute_values',
        key: 'goods_attribute_values',
      },
      {
        title: '操作',
        key: 'action',
        render: (text:any, record:any, index:any) => <a >选择</a>,
      },
    ];

    return (
      <PageHeaderWrapper title="添加商品分类">
        <div style={{ background: '#fff', padding: '10px' }}>
          <Tabs>
            <TabPane tab="基本信息" key="1">
              <Form onFinish={this.handleSubmit} style={{ marginTop: 8 }}>
                <Form.Item {...formItemLayout} label="分类标题">
                  <Input style={{ width: 400 }} placeholder="请输入分类标题" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="分类名称">
                  <Input style={{ width: 200 }} placeholder="请输入分类名称" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="封面图">
                  <Upload
                    name={'file'}
                    listType={'picture-card'}
                    showUploadList={false}
                    action={'/api/admin/picture/upload'}
                    headers={{ authorization: 'Bearer ' + sessionStorage['token'] }}
                    beforeUpload={file => {
                      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                        message.error('请上传jpg或png格式的图片!');
                        return false;
                      }
                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        message.error('图片大小不可超过2MB!');
                        return false;
                      }
                      return true;
                    }}
                    onChange={info => {
                      if (info.file.status === 'done') {
                        // Get this url from response in real world.
                        if (info.file.response.status === 'success') {
                          let fileList = [];
                          if (info.file.response) {
                            info.file.url = info.file.response.data.url;
                            info.file.uid = info.file.response.data.id;
                            info.file.id = info.file.response.data.id;
                          }
                          fileList[0] = info.file;
                          this.setState({ coverId: fileList });
                        } else {
                          message.error(info.file.response.msg);
                        }
                      }
                    }}
                  >
                    {this.state.coverId ? (
                      <img src={this.state.coverId[0]['url']} alt="avatar" width={80} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item {...formItemLayout} label="父节点">
                  <Select style={{ width: 200 }}>
                    {!!this.state.data.categorys &&
                      this.state.data.categorys.map(option => {
                        return <Option key={option.value.toString()}>{option.name}</Option>;
                      })}
                  </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="排序">
                  <InputNumber style={{ width: 200 }} placeholder="排序" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="描述">
                  <TextArea style={{ width: 400 }} placeholder="请输入描述" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="频道模板">
                  <Input style={{ width: 400 }} placeholder="请输入频道模板" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="列表模板">
                  <Input style={{ width: 400 }} placeholder="请输入列表模板" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="详情模板">
                  <Input style={{ width: 400 }} placeholder="请输入详情模板" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="分页数量">
                  <InputNumber style={{ width: 200 }} placeholder="请输入分页数量" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  <Switch checkedChildren="正常" unCheckedChildren="禁用" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="关联品牌" key="2">
              <Form onFinish={this.handleSubmit} style={{ marginTop: 8 }}>
                <Form.Item {...formItemLayout}>
                  <Transfer
                    titles={['所有品牌', '已选择关联品牌']}
                    dataSource={this.state.data ? this.state.data.goodsBrands : []}
                    showSearch
                    listStyle={{
                      width: 300,
                      height: 300,
                    }}
                    filterOption={this.brandFilterOption}
                    targetKeys={this.state.data ? this.state.data.goodsBrandSelectedKeys : []}
                    onChange={this.brandChange}
                    render={item => item.title}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  <Switch checkedChildren="正常" unCheckedChildren="禁用" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="关联属性、规格" key="3">
              <Form onFinish={this.handleSubmit} style={{ marginTop: 8 }}>
                {/* {attributeFormItems} */}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={this.attributeShowDrawer}
                    style={{ width: '400px' }}
                  >
                    <PlusOutlined /> 添加属性
                  </Button>
                </Form.Item>
                {/* {specificationFormItems} */}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={this.specificationShowDrawer}
                    style={{ width: '400px' }}
                  >
                    <PlusOutlined /> 添加规格
                  </Button>
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  <Switch checkedChildren="正常" unCheckedChildren="禁用" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>

              <Drawer
                title="请选择关联属性"
                closable={false}
                onClose={this.attributeCloseDrawer}
                visible={this.state.attributeDrawerVisible}
                width={500}
              >
                <p>
                  <Form layout="inline" onFinish={this.attributeOnSearch}>
                    <Form.Item>
                      <Input placeholder="搜索内容" />
                    </Form.Item>
                    <Form.Item>
                      <Select style={{ width: 150 }}>
                        {!!this.state.data.goodsTypes &&
                          this.state.data.goodsTypes.map(option => {
                            return <Option key={option.value.toString()}>{option.name}</Option>;
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                  <Table
                    columns={attributeColumns}
                    dataSource={this.state.attributeTable.dataSource}
                    pagination={this.state.attributeTable.pagination}
                    onChange={this.attributeChangePagination}
                  />
                </p>
              </Drawer>

              <Drawer
                title="请选择关联规格"
                closable={false}
                onClose={this.specificationCloseDrawer}
                visible={this.state.specificationDrawerVisible}
                width={500}
              >
                <p>
                  <Form layout="inline" onFinish={this.specificationOnSearch}>
                    <Form.Item>
                      <Input placeholder="搜索内容" />
                    </Form.Item>
                    <Form.Item>
                      <Select style={{ width: 150 }}>
                        {!!this.state.data.goodsTypes &&
                          this.state.data.goodsTypes.map(option => {
                            return <Option key={option.value.toString()}>{option.name}</Option>;
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                  <Table
                    columns={specificationColumns}
                    dataSource={this.state.specificationTable.dataSource}
                    pagination={this.state.specificationTable.pagination}
                    onChange={this.specificationChangePagination}
                  />
                </p>
              </Drawer>
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }

}

function mapStateToProps(state:any) {
  const { submitting } = state.request;
  return {
    submitting
  };
}

export default connect(mapStateToProps)(CreatePage);