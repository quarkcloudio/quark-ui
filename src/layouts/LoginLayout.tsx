import React, { Component } from 'react';
import { Spin } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Helmet } from 'umi';
import logo from '../assets/logo.png';
import styles from './LoginLayout.less';

interface IProps {
  dispatch: Dispatch<any>;
}

class LoginLayout extends Component<IProps> {
  state = {
    logo: '',
    name: '',
    description: '',
    loading: true,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/appInfo',
      },
      callback: (res: any) => {
        if (res) {
          this.setState({ ...res.data, loading: false });
        }
      },
    });
  }

  render() {
    const { children } = this.props;
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.name ? this.state.name : 'loading...'}</title>
        </Helmet>
        <div className={styles.container}>
          <div
            className={styles.content}
            style={{ display: this.state.loading ? 'none' : 'block' }}
          >
            <div className={styles.top}>
              <div className={styles.header}>
                <img
                  alt="logo"
                  className={styles.logo}
                  src={this.state.logo ? this.state.logo : logo}
                />
                <span className={styles.title}>
                  {this.state.name ? this.state.name : 'Quark'}
                </span>
              </div>
              <div className={styles.desc}>
                <p>
                  {this.state.description
                    ? this.state.description
                    : '在信息丰富的世界里，唯一稀缺的资源就是人类的注意力。'}
                </p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </Spin>
    );
  }
}

function mapStateToProps(state: any) {
  const { submitting } = state.request;
  return {
    submitting,
  };
}

export default connect(mapStateToProps)(LoginLayout);
