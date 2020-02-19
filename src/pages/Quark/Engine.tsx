import React, { PureComponent } from 'react';
import FormPage from '@/components/QuarkUI/FormPage';
import TablePage from '@/components/QuarkUI/TablePage';
import { stringify } from 'qs';

class Engine extends PureComponent<any> {

  state = {
    api: this.props.location.query.api,
    component:this.props.location.query.component
  };
  
  componentDidMount() {

  }

  render() {
    return (
      <div>
        {!!this.state.component && this.state.component =='form' ? <FormPage api={this.state.api} /> : null}
        {!!this.state.component && this.state.component =='table' ? <TablePage api={this.state.api} /> : null}
        {!!this.state.component && this.state.component =='show' ? <TablePage api={this.state.api} /> : null}
      </div>
    );
  }
}

export default Engine;
