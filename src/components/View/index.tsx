import React from 'react';
import Render from '@/components/Render';

const View: React.FC<any> = (props: any) => {
  return (
    <div {...props}>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </div>
  );
};

export default View;
