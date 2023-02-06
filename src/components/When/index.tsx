import React from 'react';
import Render from '@/components/Render';
import tplEngine from '@/utils/template';

const When: React.FC<any> = (props: any) => {
  const componentRender = () => {
    return props.items.forEach((item: any) => {
      if (tplEngine(item.condition, props.data) === 'true') {
        return (
          <Render
            body={item.body}
            data={props.data}
            callback={props.callback}
          />
        );
      }
    });
  };

  return componentRender();
};

export default When;
