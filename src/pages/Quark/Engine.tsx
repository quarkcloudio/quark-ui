import React, { PureComponent } from 'react';
import { connect } from 'dva';
import FormPage from '@/components/QuarkUI/FormPage';
import TablePage from '@/components/QuarkUI/TablePage';
import ShowPage from '@/components/QuarkUI/ShowPage';
import DashboardPage from '@/components/QuarkUI/DashboardPage';
import zhCN from 'antd/es/locale/zh_CN';

import {
  ConfigProvider
} from 'antd';

class Engine extends PureComponent<any> {

  state = {
    api: this.props.location.query.api,
    component:this.props.location.query.component,
    search:this.props.location.query.search
  };


  render() {

    const {engine} = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <div>
          {engine ?
            <div>
              {!!engine.component && engine.component =='form' ? <FormPage api={engine.api} type={'page'} search={engine.search} /> : null}
              {!!engine.component && engine.component =='table' ? <TablePage api={engine.api} search={engine.search} /> : null}
              {!!engine.component && engine.component =='show' ? <ShowPage api={engine.api} search={engine.search} /> : null}
              {!!engine.component && engine.component =='dashboard' ? <DashboardPage api={engine.api} search={engine.search} /> : null}
            </div>
          : 
            <div>
              {!!this.state.component && this.state.component =='form' ? <FormPage api={this.state.api} type={'page'} search={this.state.search} /> : null}
              {!!this.state.component && this.state.component =='table' ? <TablePage api={this.state.api} search={this.state.search} /> : null}
              {!!this.state.component && this.state.component =='show' ? <ShowPage api={this.state.api} search={this.state.search} /> : null}
              {!!this.state.component && this.state.component =='dashboard' ? <DashboardPage api={this.state.api} search={this.state.search} /> : null}
            </div>
          }
        </div>
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

export default connect(mapStateToProps)(Engine);
