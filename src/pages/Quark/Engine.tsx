import React, { PureComponent } from 'react';
import { connect } from 'dva';
import FormPage from '@/components/QuarkUI/FormPage';
import TablePage from '@/components/QuarkUI/TablePage';
import { stringify } from 'qs';

class Engine extends PureComponent<any> {

  state = {
    api: this.props.location.query.api,
    component:this.props.location.query.component
  };


  render() {

    const {engine} = this.props;

    return (
      <div>
        {engine ?
          <div>
            {!!engine.component && engine.component =='form' ? <FormPage api={engine.api} /> : null}
            {!!engine.component && engine.component =='table' ? <TablePage api={engine.api} /> : null}
            {!!engine.component && engine.component =='show' ? <TablePage api={engine.api} /> : null}
          </div>
        : 
          <div>
            {!!this.state.component && this.state.component =='form' ? <FormPage api={this.state.api} /> : null}
            {!!this.state.component && this.state.component =='table' ? <TablePage api={this.state.api} /> : null}
            {!!this.state.component && this.state.component =='show' ? <TablePage api={this.state.api} /> : null}
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
