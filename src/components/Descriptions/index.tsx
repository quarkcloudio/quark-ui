import React from 'react';
import { Space, Divider } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import Render from '@/components/Render';
import Action from '@/components/Action';

const Descriptions: React.FC<any> = (props: any) => {

  // 解析column
  const parseColumns = (columns: any) => {
    columns.forEach((item: any, key: any) => {
      if(item.valueType === 'text') {
        item.render = (text: any, row: any) => {
          if (typeof text === 'string' || typeof text === 'number') {
            return <Render body={text} data={row} callback={props.callback} />;
          }
          return text
        }
      }
      columns[key] = item;
    });

    return columns;
  };

  return (
    <>
      <ProDescriptions
        title={props.title}
        tooltip={props.tooltip}
        extra={props.extra}
        bordered={props.bordered}
        column={props.column}
        size={props.size}
        layout={props.layout}
        colon={props.colon}
        columns={props.columns && parseColumns(props.columns)}
        dataSource={props.dataSource}
      >
        {props?.items?.map((item: any, index: number) => {
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
          )
        })}
      </ProDescriptions>
      {props?.actions?.length > 0 && (
        <>
          <Divider style={{ marginTop: 0 }} />
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
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
        </>
      )}
    </>
  );
};

export default Descriptions;
