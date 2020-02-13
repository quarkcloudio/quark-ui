import React, { PureComponent } from 'react';
import FormPage from '@/components/QuarkUI/FormPage';
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
      <FormPage api={this.state.api} />
    );
  }
}

export default Engine;
