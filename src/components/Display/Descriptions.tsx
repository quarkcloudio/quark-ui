import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import Render from '@/components/Render';
import Action from '@/components/Action/Action';
import {
  Space,
  Divider
} from 'antd';

const Descriptions: React.FC<any> = (props: any) => {
  const componentRender = (items: any) => {
    return items?.map((item: any) => {
      return (
        <ProDescriptions.Item key={item.key} label={item.label}>
          <Render body={{ ...item, body: item.value }} data={props.data} />
        </ProDescriptions.Item>
      );
    });
  };

  return (
    <span>
      <ProDescriptions {...props}>{componentRender(props.items)}</ProDescriptions>
      {
        props?.actions?
          <div>
            <Divider style={{marginTop:0}}/>
            <div style={{marginBottom:24,textAlign:'center'}}>
              <Space>
                {props?.actions?.map((action:any) => {
                  return <Action {...action} data={{...props.data, ...props.dataSource}} callback={props.callback}/>
                })}
              </Space>
            </div>
          </div>
        : null
      }
    </span>
  );
};

export default Descriptions;
