import React from 'react';
import Render from '@/components/Render';
import tplEngine from '@/utils/template';

const When: React.FC<any> = (props: any) => {
  const componentRender = () => {
    return props.items.map((item: any,index: number) => {
      if (tplEngine(item.condition, props.data) === 'true') {
        return (
          <Render
            key={index}
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
