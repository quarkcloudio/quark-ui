import React from 'react';
import Render from '@/components/Render';
import ProCard from '@ant-design/pro-card';

const Card: React.FC<any> = (props:any) => {

  return (
    <ProCard {...props}>
      <Render body={props.body} data={props.data} />
    </ProCard>
  );
}

export default Card;