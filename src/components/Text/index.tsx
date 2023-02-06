import React from 'react';
import Render from '@/components/Render';
import { Typography } from 'antd';

const Text: React.FC<any> = (props: any) => {
  return (
    <Typography.Text {...props}>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </Typography.Text>
  );
};

export default Text;
