import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { stringify } from 'qs';
import styles from './Style.less';

import {
  Card,
  Row,
  Col,
  Tabs,
  Form,
  Button,
  message,
  Modal,
  Table,
  Divider,
  List,
  Avatar,
  Steps,
  Tag,
  Input,
  Select
} from 'antd';

moment.locale('zh-cn');

const TabPane = Tabs.TabPane;

class IndexPage extends Component<any> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    data:{
      goodsOrderDeliveryInfo:false,
      goodsOrderDeliveryDetails:false,
      goodsOrderInfo:false,
    },
    msg: '',
    url: '',
    status: '',
    loading: false,
    expressType:1
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
        actionUrl: 'admin/goodsOrder/deliveryEdit?' + stringify(params),
      },
      callback: (res:any) => {
        if (res) {
          this.setState({
            data: res.data
          });
        }
      },
    });
  }

  onFinish = (values:any) => {
    // 配送类型
    values['express_type'] = this.state.expressType

    this.props.dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/goodsOrder/deliverySave',
        ...values,
      }
    });
  };
 
  onTabChange = (key:any) => {
    this.setState({
      expressType:key
    })
  }

  render() {
    
    const columns = [
      {
        title: '商品名称',
        key: 'cover_id',
        dataIndex: 'cover_id',
        render: (text:any, record:any) => (
          <span>
            <Avatar src={text} shape="square" size="large" /> 
            {record.goods_name}
          </span>
        ),
      },
      {
        title: '属性',
        dataIndex: 'goods_property_names',
        key: 'goods_property_names',
      },
      {
        title: '单价',
        dataIndex: 'goods_price',
        key: 'goods_price',
      },
      {
        title: '发货数量',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '库存',
        dataIndex: 'stock_num',
        key: 'stock_num',
      }
    ];

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

    return (
      <PageHeaderWrapper title={false}>
        <div className={styles.container}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              发货单编号：{this.state.data.goodsOrderDeliveryInfo.delivery_no}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Table
                dataSource={this.state.data.goodsOrderDeliveryDetails}
                columns={columns}
                pagination={false}
                bordered
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card size="small" title="收货信息">
                <p>收 货 人： {this.state.data.goodsOrderInfo.consignee_name}，{this.state.data.goodsOrderInfo.consignee_phone}</p>
                <p>收货地址： {this.state.data.goodsOrderInfo.consignee_address}</p>
                <p>支付方式： {this.state.data.goodsOrderInfo.pay_type}</p>
                <p>买家留言： {this.state.data.goodsOrderInfo.remark}</p>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {!!this.state.data.goodsOrderDeliveryInfo && (
              <Card size="small" title="选择物流服务">
                <Tabs defaultActiveKey={this.state.data.goodsOrderDeliveryInfo ? this.state.data.goodsOrderDeliveryInfo.express_type.toString() : '1'} onChange={this.onTabChange}>
                  <TabPane tab="无需物流" key="1">
                    <Form
                      ref={this.formRef}
                      onFinish={this.onFinish}
                      style={{ marginTop: 8 }}
                    >
                      <Form.Item {...formItemLayout} label="注意">
                        <span className="ant-form-text">如果订单中的商品无需物流运送，您可以直接点击确认发货！</span>
                      </Form.Item>
                      <Form.Item
                        style={{display:'none'}}
                        name={'id'}
                        initialValue={this.state.data.goodsOrderDeliveryInfo.id}
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                        <Button type="primary" htmlType="submit">确认修改</Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="第三方物流" key="2">
                    <Form
                      ref={this.formRef}
                      onFinish={this.onFinish}
                      style={{ marginTop: 8 }}
                    >
                      <Form.Item
                        style={{display:'none'}}
                        name={'id'}
                        initialValue={this.state.data.goodsOrderDeliveryInfo.id}
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="物流公司"
                        name={'express_id'}
                        initialValue={this.state.data.goodsOrderDeliveryInfo ? this.state.data.goodsOrderDeliveryInfo.goods_express_id : 0}
                      >
                        <Select style={{ width: 200 }}>
                          <Option key={0} value={0}>{'请选择物流公司'}</Option>
                          {!!this.state.data.goodsExpresses &&
                            this.state.data.goodsExpresses.map((option:any) => {
                              return <Option key={option.id} value={0}>{option.name}</Option>;
                            })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="物流单号"
                        name={'express_no'}
                        initialValue={this.state.data.goodsOrderDeliveryInfo.express_no}
                      >
                        <Input style={{ width: 200 }} placeholder="请输入物流单号" />
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                        <Button type="primary" htmlType="submit">
                          确认修改
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                </Tabs>
              </Card>
              )}
            </Col>
          </Row>
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

export default connect(mapStateToProps)(IndexPage);