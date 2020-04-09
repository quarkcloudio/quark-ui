import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import styles from './Index.css';

import { Row, Col, Card, Statistic, Divider, Badge, Table} from 'antd';

import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

import {
  ArrowUpOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  PictureOutlined,
  MessageOutlined,
  MenuOutlined,
  UserOutlined,
  BarsOutlined,
  PaperClipOutlined
} from '@ant-design/icons';

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

class IndexPage extends Component<IProps> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    msg: '',
    url: '',
    data: {},
    status: '',
    pagination: {},
    visible: false,
    loading: false,
    canUpgrade: false,
  };
  
  componentDidMount() {
    // loading
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/dashboard/index',
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ ...res, loading: false });
        }
      },
    });

    this.checkUpdate();
  }

  checkUpdate() {
    // 调用model
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/upgrade/index',
      },
      callback: (res:any) => {
        if (res) {
          this.setState({canUpgrade: res.data.can_upgrade });
        }
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    const {submitting} = this.props;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '信息',
        dataIndex: 'info',
        key: 'info',
      },
    ];

    const data = [
      {
        key: '1',
        name: 'OneThink版本',
        info: '1.0.131218',
      },
      {
        key: '2',
        name: '服务器操作系统',
        info: 'Linux',
      },
      {
        key: '3',
        name: 'ThinkPHP版本',
        info: '3.2.0',
      },
      {
        key: '4',
        name: '运行环境',
        info: '	Apache',
      },
      {
        key: '5',
        name: 'MYSQL版本',
        info: '5.1.48-log',
      },
    ];

    return (
      <div className={styles.container}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="今日新增会员"
                value={this.state.data.user_today_num}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="文章总数"
                value={this.state.data.article_total_num}
                precision={0}
                valueStyle={{ color: '#999999' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="今日付款金额"
                value={this.state.data.order_today_money}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="订单总金额"
                value={this.state.data.order_total_money}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
        <div className={styles.line}></div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="待办事项" bordered={false}>
              <Row gutter={24}>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>商品库存报警</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>待付款订单</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>备货中订单</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>待处理退款</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>待处理退款</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBox}>
                    <div className={styles.gutterTitle}>待处理退款</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                  <Divider />
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBoxNoBottom}>
                    <div className={styles.gutterTitle}>待处理退款</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBoxNoBottom}>
                    <div className={styles.gutterTitle}>待处理退款</div>
                    <div className={styles.gutterNum}>
                      <a href="#">10</a>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.gutterBoxNoBottom}>
                    <div className={styles.gutterTitle}>系统版本</div>
                    <div className={styles.gutterNum}>
                    {this.state.canUpgrade ? 
                        <Badge dot>
                          <a className={styles.updateSystem} href="#/upgrade/index">
                            {this.state.data.app_version}
                          </a>
                          <ArrowUpOutlined />
                        </Badge>
                      : 
                        <a className={styles.updateSystem} href="#/upgrade/index">
                          {this.state.data.app_version}
                        </a>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="快捷入口" bordered={false}>
              <Row gutter={24} className={styles.fastRow}>
                <Col span={6}>
                  <a href="#/article/create">
                    <div className={styles.fastBox}>
                      <p>
                        <EditOutlined className={styles.fastIcon}/>
                      </p>
                      <p>添加文章</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/page/create">
                    <div className={styles.fastBox}>
                      <p>
                        <MoneyCollectOutlined className={styles.fastIcon}/>
                      </p>
                      <p>添加单页</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/banner/banner/index">
                    <div className={styles.fastBox}>
                      <p>
                        <PictureOutlined  className={styles.fastIcon}/>
                      </p>
                      <p>幻灯片管理</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/plugin/comment/index">
                    <div className={styles.fastBox}>
                      <p>
                        <MessageOutlined className={styles.fastIcon} />
                      </p>
                      <p>评论管理</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/system/menu/index">
                    <div className={styles.fastBox}>
                      <p>
                        <MenuOutlined className={styles.fastIcon} />
                      </p>
                      <p>菜单管理</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/user/index">
                    <div className={styles.fastBox}>
                      <p>
                        <UserOutlined className={styles.fastIcon} />
                      </p>
                      <p>用户管理</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/system/navigation/index">
                    <div className={styles.fastBox}>
                      <p>
                        <BarsOutlined className={styles.fastIcon} />
                      </p>
                      <p>导航管理</p>
                    </div>
                  </a>
                </Col>
                <Col span={6}>
                  <a href="#/attachment/file/index">
                    <div className={styles.fastBox}>
                      <p>
                        <PaperClipOutlined className={styles.fastIcon} />
                      </p>
                      <p>附件空间</p>
                    </div>
                  </a>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <div className={styles.line}></div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="系统信息" bordered={false}>
              <Table columns={columns} showHeader={false} pagination={false} dataSource={data} size="small" />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="产品团队" bordered={false}>

            </Card>
          </Col>
        </Row>
        <div className={styles.line}></div>
      </div>
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