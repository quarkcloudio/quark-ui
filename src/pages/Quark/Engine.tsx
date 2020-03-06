import React, { PureComponent } from 'react';
import { connect } from 'dva';
import FormPage from '@/components/QuarkUI/FormPage';
import TablePage from '@/components/QuarkUI/TablePage';
import ShowPage from '@/components/QuarkUI/ShowPage';
import { stringify } from 'qs';

class Engine extends PureComponent<any> {

  state = {
    api: this.props.location.query.api,
    component:this.props.location.query.component,
    search:this.props.location.query.search
  };


  render() {

    const {engine} = this.props;

    return (
      <div>
        {engine ?
          <div>
            {!!engine.component && engine.component =='form' ? <FormPage api={engine.api} search={engine.search} /> : null}
            {!!engine.component && engine.component =='table' ? <TablePage api={engine.api} search={engine.search} /> : null}
            {!!engine.component && engine.component =='show' ? <ShowPage api={engine.api} search={engine.search} /> : null}
          </div>
        : 
          <div>
            {!!this.state.component && this.state.component =='form' ? <FormPage api={this.state.api} search={this.state.search} /> : null}
            {!!this.state.component && this.state.component =='table' ? <TablePage api={this.state.api} search={this.state.search} /> : null}
            {!!this.state.component && this.state.component =='show' ? <ShowPage api={this.state.api} search={this.state.search} /> : null}
          </div>
        }
      </div>
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
