import React from 'react';
import { Space, Divider } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import Render from '@/components/Render';
import Action from '@/components/Action';

const Descriptions: React.FC<any> = (props: any) => {
  const componentRender = (items: any) => {
    return items?.map((item: any, index: number) => {
      return (
        <ProDescriptions.Item
          key={index}
          label={item.label}
          tooltip={item.tooltip}
          span={item.span}
          valueType={item.valueType}
          valueEnum={item.valueEnum}
          dataIndex={item.dataIndex}
          style={item.style}
        >
          <Render
            body={{ component: item.component, body: item.value }}
            data={props.data}
          />
        </ProDescriptions.Item>
      );
    });
  };

  return (
    <div>
      <ProDescriptions {...props}>
        {componentRender(props.items)}
      </ProDescriptions>
      {props?.actions?.length > 0 && (
        <div>
          <Divider style={{ marginTop: 0 }} />
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <Space>
              {props?.actions?.map((action: any, index: number) => {
                return (
                  <Action
                    {...action}
                    key={index}
                    data={{ ...props.data, ...props.dataSource }}
                    callback={props.callback}
                  />
                );
              })}
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

export default Descriptions;
