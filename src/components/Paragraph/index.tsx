import React from 'react';
import Render from '@/components/Render';
import { Typography } from 'antd';

const Paragraph: React.FC<any> = (props: any) => {
  return (
    <Typography.Paragraph {...props}>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </Typography.Paragraph>
  );
};

export default Paragraph;
