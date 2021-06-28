import React from 'react';
import Render from '@/components/Render';
import { Divider as AntDivider } from 'antd';

const Divider: React.FC<any> = (props:any) => {

  return (
    <AntDivider
      dashed={props.dashed}
      orientation={props.orientation}
      plain={props.plain}
      style={props.style}
      type={props.type ? props.type : 'horizontal'}
    >
      <Render body={props.body} data={props.data} />
    </AntDivider>
  );
}

export default Divider;