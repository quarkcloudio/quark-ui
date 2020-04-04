import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Index.less';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';

import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Modal,
  message,
  Badge,
  Card,
  Steps,
  Collapse,
  Typography,
  Divider,
  Progress,
  Spin,
  Popconfirm
} from 'antd';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Step = Steps.Step;
const Panel = Collapse.Panel;
const { Title } = Typography;

class UpdatePage extends PureComponent {
  // 定义要操作的模型名称
  modelName = 'console';

  state = {
    msg: '',
    url: '',
    data: {},
    status: '',
    pagination: {},
    loading: false,
    visible: false,
    percent:0,
    current:0,
    actionStatus:'',
    downloadLoading:false,
    extractLoading:false,
    updateFileLoading:false,
    updateDatabaseLoading:false,
    clearCacheLoading:false,
    finishLoading:false
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {
    this.checkUpdate();
  }

  checkUpdate = () => {

  };

  upgrade = () => {
    // loading
    this.download();
  };

  download = () => {

  };

  extract = () => {

  };

  updateFile = () => {

  };

  updateDatabase = () => {

  };

  clearCache = () => {

  };

  finish = () => {

  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    if(this.state.current == 0) {
      this.upgrade();
    }
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Spin spinning={this.state.loading} tip="Loading...">

      </Spin>
    );
  }
}

export default UpdatePage;
