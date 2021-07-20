import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import Render from '@/components/Render';

const Descriptions: React.FC<any> = (props:any) => {
  const componentRender = (items:any) => {
    return items.map((item:any) => {
        return <ProDescriptions.Item key={item.key} label={item.label}>
                <Render body={{...item, body:item.value}} />
              </ProDescriptions.Item>;
      })
  }

  return (
    <ProDescriptions {...props}>
      {componentRender(props.items)}
    </ProDescriptions>
  );
}

export default Descriptions;