import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import logo from '../assets/logo.png';
import styles from './LoginLayout.less';

interface IProps {
  dispatch:Dispatch<any>;
}

class LoginLayout extends Component<IProps> {

  state = {
    logo:'',
    name:'',
    description:''
  };

  componentDidMount() {
    document.title = '管理员登录';

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/appInfo',
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ ...res.data });
        }
      },
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
                <img alt="logo" className={styles.logo} src={this.state.logo ? this.state.logo : logo} />
                <span className={styles.title}>{this.state.name ? this.state.name : 'Quark'}</span>
            </div>
            <div className={styles.desc}><p>{this.state.description ? this.state.description : '在信息丰富的世界里，唯一稀缺的资源就是人类的注意力。'}</p></div>
          </div>
          {children}
        </div>
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

export default connect(mapStateToProps)(LoginLayout);