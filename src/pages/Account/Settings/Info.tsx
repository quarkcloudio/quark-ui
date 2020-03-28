import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import styles from './Style.less';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Menu, Form, Input, Button } from 'antd';

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

class InfoPage extends Component<IProps> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    msg: '',
    url: '',
    data: {
      username:'',
      nickname:'',
      email:''
    },
    status: '',
    pagination: {},
    loading: false,
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {
    // loading
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/account/info'
      },
      callback: (res: any) => {
        // 执行成功后，进行回调
        if (res) {
          // 接口得到数据，放到state里
          this.formRef.current.setFieldsValue(res.data);
          this.setState({ data: res.data, loading: false });
        }
      }
    });
  }

  onFinish = (values:any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/account/profile',
        ...values
      }
    });
  };

  handleMenuClick = (e: any) => {
    if (e.key === 'info') {
      router.push('/account/settings/info');
      return;
    }
    if (e.key === 'security') {
      router.push('/account/settings/security');
      return;
    }
  };

  render() {
    const { submitting } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (

      <PageHeaderWrapper title={'个人设置'}>
        <div className={styles.container}>
          <div className={styles.sider}>
            <Menu
              onClick={this.handleMenuClick}
              style={{ width: 256, minHeight: 500 }}
              defaultSelectedKeys={['info']}
              mode="inline"
            >
              <Menu.Item key="info">基本信息</Menu.Item>
              <Menu.Item key="security">账户安全</Menu.Item>
            </Menu>
          </div>
          <div className={styles.content}>
            <div>
              <span className={styles.title}>基本信息</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <Form ref={this.formRef} onFinish={this.onFinish}>
                <Form.Item
                  label="用户名"
                  name={'username'}
                  {...formItemLayout}
                >
                  <span>{this.state.data.username}</span>
                </Form.Item>
                <Form.Item
                  label="昵称"
                  name={'nickname'}
                  {...formItemLayout}
                >
                  <Input className={styles.smallItem} placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item
                  label="邮箱"
                  name={'email'}
                  {...formItemLayout}
                >
                  <Input className={styles.smallItem} placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button 
                    type="primary"
                    loading={submitting}
                    htmlType="submit"
                  >
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
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

export default connect(mapStateToProps)(InfoPage);
