import React, { PureComponent } from 'react';
import { connect } from 'dva';
import DashboardPage from '@/components/QuarkUI/DashboardPage';
import { stringify } from 'qs';
import zhCN from 'antd/es/locale/zh_CN';

import {
  ConfigProvider
} from 'antd';

class Index extends PureComponent<any> {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <DashboardPage api={'admin/dashboard/index'} />
      </ConfigProvider>
    );
  }
}

function mapStateToProps(state:any) {
  const { engine } = state.global;
  return {
    engine
  };
}

export default connect(mapStateToProps)(Index);