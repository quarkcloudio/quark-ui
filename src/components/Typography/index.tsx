import React from 'react';
import Render from '@/components/Render';
import { Typography as AntTypography } from 'antd';

const Typography: React.FC<any> = (props:any) => {
  return (
    <AntTypography>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </AntTypography>
  );
}

export default Typography;