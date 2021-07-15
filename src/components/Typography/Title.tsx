import React from 'react';
import Render from '@/components/Render';
import { Typography } from 'antd';

const Title: React.FC<any> = (props:any) => {

  return (
    <Typography.Title {...props}>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </Typography.Title>
  );
}

export default Title;