import React from 'react';
import { Row as AntdRow, RowProps as AntdRowProps } from 'antd';
import Render from '@/components/Render';

export interface RowProps {
  body?: any;
  data?: any;
  callback?: any;
}

const Row: React.FC<
  RowProps & AntdRowProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  const { body, data, callback } = { ...props };
  return (
    <AntdRow {...props}>
      <Render body={body} data={data} callback={callback} />
    </AntdRow>
  );
};

export default Row;
