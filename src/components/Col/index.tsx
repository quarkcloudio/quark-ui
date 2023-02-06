import React from 'react';
import Render from '@/components/Render';
import { Col as AntCol, ColProps } from 'antd';

export interface ColExtendProps {
  body?: any;
  data?: any;
  callback?: any;
}

const Col: React.FC<
  ColProps & React.RefAttributes<HTMLDivElement> & ColExtendProps
> = (props) => {
  const { body, data, callback } = { ...props };
  return (
    <AntCol {...props}>
      <Render body={body} data={data} callback={callback} />
    </AntCol>
  );
};

export default Col;
