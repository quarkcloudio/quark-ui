import React, { useState, useEffect } from 'react';
import Render from '@/components/Render';
import { Row as AntRow, Col, Button } from 'antd';

const Row: React.FC<any> = (props:any) => {

  return (
    <AntRow {...props}>
      <Render body={props.body} data={props.data} />
    </AntRow>
  );
}

export default Row;