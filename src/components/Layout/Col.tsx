import React from 'react';
import Render from '@/components/Render';
import { Col as AntCol } from 'antd';

const Col: React.FC<any> = (props:any) => {

  return (
    <AntCol {...props}>
      <Render body={props.body} data={props.data} />
    </AntCol>
  );
}

export default Col;