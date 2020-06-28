import React, { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { stringify } from 'qs';
import styles from './Style.less';
import zhCN from 'antd/es/locale/zh_CN';

import {
  createFromIconfontCN
} from '@ant-design/icons';

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

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
  Table,
  Badge,
  Menu,
  Dropdown,
  Divider,
  List,
  Avatar,
  ConfigProvider
} from 'antd';

moment.locale('zh-cn');

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class IndexPage extends Component<any> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    data:false,
    msg: '',
    url: '',
    status: '',
    loading: false,
    selected: '0',
    advancedSearchExpand: false,
    search:[],
    pagination:[],
    tableLoading:false,
    exportUrl:''
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
        actionUrl: 'admin/goodsOrder/deliveryIndex' + stringify(params),
      },
      callback: (res:any) => {
        if (res) {
          this.setState({
            search: res.data.search,
            pagination: res.data.pagination,
            data: res.data,
            exportUrl:res.data.exportUrl
          });
        }
      },
    });
  }

  render() {

    // 展开或收缩高级搜索
    const toggle = () => {
      this.setState({
        advancedSearchExpand: !this.state.advancedSearchExpand
      });
    };

    const expandedRowRender = (record:any, index:any) => {
      return <div style={{'backgroundColor':'#ffffff','padding':'0px 10px'}}>
        <p style={{'textAlign':'left','margin':0,'borderBottom':'1px solid #e8e8e8','padding':'10px 0px'}}>收货信息：{record.consignee_name} ，{record.consignee_phone} ，{record.consignee_address}</p>
        <p style={{'textAlign':'left','margin':0,'borderBottom':'1px solid #e8e8e8','padding':'10px 0px'}}>发货单状态：<span style={{'color':'#5bb85d'}}>{record.status ==1 ? '待发货' : '已发货'}</span></p>
        <List
          size="large"
          dataSource={record.goods_order_details}
          renderItem={(item:any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.cover_id} shape="square" size="large" />
                }
                title={<a href={"#/admin/goods/edit?search[id]="+item.goods_id}>{item.goods_name} {item.goods_property_names}</a>}
                description={item.description}
              />
              {<span style={{'marginRight':150,'float':'left'}}>￥{item.goods_price}</span>}
              {<span style={{'marginRight':150,'float':'left','color':'#ff3535'}}>x {item.num}</span>}
            </List.Item>
          )}
        />
        <p style={{'textAlign':'right','marginTop':0,'borderBottom':'1px solid #e8e8e8','borderTop':'1px solid #e8e8e8','padding':'10px 0px'}}>购买账号：{record.username}（{record.phone}）</p>
        <p style={{'textAlign':'right','margin':0,'height':40}}>
          <span style={{'float':'left'}}><Button>打印发货单</Button></span>
          <span style={{'float':'right'}}><Button href={"#/admin/goodsOrder/deliveryInfo?id="+record.id}>发货单详情</Button> <Button type="primary" href={"#/admin/goodsOrder/deliveryEdit?id="+record.id}>修改运单</Button> </span>
        </p>
      </div>;
    };

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '发货单号', dataIndex: 'delivery_no', key: 'delivery_no' },
      { title: '发货时间', dataIndex: 'express_send_at', key: 'express_send_at' },
      { title: '订单编号', dataIndex: 'order_no', key: 'order_no' },
      { title: '下单时间', dataIndex: 'paid_at', key: 'paid_at' },
    ];

    // 分页切换
    const changePagination = (pagination:any, filters:any, sorter:any) => {

      // 获得url参数
      const params = this.props.location.query;

      this.setState({
        tableLoading: true
      });

      this.props.dispatch({
        type: 'request/get',
        payload: {
          actionUrl: 'admin/goodsOrder/deliveryIndex' + stringify(params),
          pageSize: pagination.pageSize, // 分页数量
          current: pagination.current, // 当前页码
          sortField: sorter.field, // 排序字段
          sortOrder: sorter.order, // 排序规则
          ...filters, // 筛选
          search: this.state.search,
        },
        callback : (res:any) => {
          if (res) {
            this.setState({
              search: res.data.search,
              pagination: res.data.pagination,
              data:res.data,
              tableLoading: false
            });
          }
        }
      });
    };

    // 不同状态不同数据
    const getStatusLists = (values:any) => {

      // 获得url参数
      const params = this.props.location.query;

      if (values['dateRange'] && values['dateRange']) {
        if (values['dateRange'][0] && values['dateRange'][1]) {
          // 时间标准化
          let dateStart = values['dateRange'][0].format('YYYY-MM-DD HH:mm:ss');
          let dateEnd = values['dateRange'][1].format('YYYY-MM-DD HH:mm:ss');
          // 先清空对象
          values['dateRange'] = [];
          // 重新赋值对象
          values['dateRange'] = [dateStart, dateEnd];
        }
      }

      this.setState({
        tableLoading: true
      });
      this.props.dispatch({
        type: 'request/get',
        payload: {
          actionUrl: 'admin/goodsOrder/deliveryIndex' + stringify(params),
          ...this.state.pagination,
          search: values,
        },
        callback : (res:any) => {
          if (res) {
            this.setState({
              search: res.data.search,
              pagination: res.data.pagination,
              data:res.data,
              tableLoading: false
            });
          }
        }
      });
    };

    // 搜索
    const onSearch = (values:any) => {

      // 获得url参数
      const params = this.props.location.query;

      if (values['dateRange'] && values['dateRange']) {
        if (values['dateRange'][0] && values['dateRange'][1]) {
          // 时间标准化
          let dateStart = values['dateRange'][0].format('YYYY-MM-DD HH:mm:ss');
          let dateEnd = values['dateRange'][1].format('YYYY-MM-DD HH:mm:ss');
          // 先清空对象
          values['dateRange'] = [];
          // 重新赋值对象
          values['dateRange'] = [dateStart, dateEnd];
        }
      }

      this.setState({
        tableLoading: true
      });

      this.props.dispatch({
        type: 'request/get',
        payload: {
          actionUrl: 'admin/goodsOrder/deliveryIndex' + stringify(params),
          ...this.state.pagination,
          search: values,
        },
        callback : (res:any) => {
          if (res) {
            this.setState({
              search: res.data.search,
              pagination: res.data.pagination,
              data:res.data,
              tableLoading: false
            });
          }
        }
      });
    };

    return (
      <ConfigProvider locale={zhCN}>
      <PageHeaderWrapper title={'发货单列表'}>
        <div className={styles.container}>
          <div className={styles.tableHeader}>
            <Row type="flex" justify="start">
              <Col span={4}>
                <h5 className={styles.tableHeaderTitle}>发货单列表</h5>
              </Col>
              <Col span={20}>
                <div className={styles.floatRight}>
                <Form
                  layout="inline"
                  ref={this.formRef}
                >
                  <Form.Item name={'status'}>
                    <Radio.Group onChange={getStatusLists}>
                      <Radio.Button value="0">全部发货单({this.state.data.totalNum})</Radio.Button>
                      <Radio.Button value="1">等待发货({this.state.data.waitSendNum})</Radio.Button>
                      <Radio.Button value="2">已发货({this.state.data.sendNum})</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form>
                </div>
              </Col>
            </Row>
          </div>

          <Divider style={{ marginBottom: 10,marginTop: 10 }} />
          <div className={styles.tableToolBar}>
            <Row type="flex" justify="start">
              <Col span={2}>
                <Tag color="#2db7f5" style={{ marginTop:2,paddingBottom:5,paddingTop:5,paddingLeft:10,paddingRight:10 }}>发货单统计：{this.state.data.totalNum}</Tag>
              </Col>
              <Col span={22}>
                <div className={styles.floatRight}>
                  <Form
                    layout="inline"
                    ref={this.formRef}
                  >
                    <Form.Item name={'title'}>
                      <Input style={{ width: 220 }} placeholder="发货单号/订单编号/买家账号" />
                    </Form.Item>
                    <Form.Item name={'status'}>
                      <Select style={{ width: 120 }}>
                        <Option value="0">全部发货单</Option>
                        <Option value="1">等待发货</Option>
                        <Option value="2">已发货</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={'expressType'}>
                      <Select style={{ width: 120 }}>
                        <Option value="0">全部配送方式</Option>
                        <Option value="1">无需物流</Option>
                        <Option value="2">第三方物流</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button>搜索</Button>
                    </Form.Item>
                    <Form.Item>
                      <Button href={this.state.exportUrl} target="_blank" type="primary">导出</Button>
                    </Form.Item>
                    <Form.Item style={{ marginRight: 10 }}>
                      <a type="link" style={{ fontSize: 12}}  onClick={toggle}>
                        高级搜索 {this.state.advancedSearchExpand ? <Iconfont type={'icon-up'} /> : <Iconfont type={'icon-down'} />}
                      </a>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
          <div
            className={styles.tableAdvancedSearchBar}
            style={{ display: this.state.advancedSearchExpand ? 'block' : 'none' }}
          >
            <Row>
              <Col span={24}>
                <Form
                  layout="inline"
                  ref={this.formRef}
                >
                  <Form.Item name={'dateRange'}>
                    <RangePicker
                      showTime={true}
                      style={{ width: 360 }}
                    />
                  </Form.Item>
                  <Form.Item >
                    <Button>搜索</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div className={styles.tableData}>
            <Table
              rowKey="id"
              key={`table-${this.state.data.lists && this.state.data.lists.length}`}
              defaultExpandAllRows={true}
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={this.state.data.lists}
              pagination={this.state.pagination}
              loading={this.state.tableLoading}
              onChange={changePagination}
            />
          </div>
        </div>
      </PageHeaderWrapper>
      </ConfigProvider>
    );
  }
}

function mapStateToProps(state:any) {
  const { submitting } = state.request;
  return {
    submitting
  };
}

export default connect(mapStateToProps)(IndexPage);