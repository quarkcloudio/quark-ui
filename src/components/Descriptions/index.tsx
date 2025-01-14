import React from 'react';
import { Space, Divider } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import Render from '@/components/Render';
import Action from '@/components/Action';

export interface DescriptionsProps {
  title?: any;
  tooltip?: any;
  extra?: any;
  bordered?: boolean;
  column?: any;
  size?: 'middle' | 'small' | 'default';
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  columns?: any;
  items?: any;
  actions?: any;
  dataSource?: any;
  data?: any;
  callback?: any;
}

const defaultProps = {
  column: 3,
  layout: 'horizontal',
  colon: true,
} as DescriptionsProps;

const Descriptions: React.FC<DescriptionsProps> = (props) => {
  const {
    title,
    tooltip,
    extra,
    bordered,
    column,
    size,
    layout,
    colon,
    columns,
    items,
    actions,
    dataSource,
    data,
    callback,
  } = {
    ...defaultProps,
    ...props,
  };

  const parseColumns = (columns: any) => {
    columns.forEach((item: any, key: any) => {
      if (item.valueType === 'text') {
        item.render = (text: any, row: any) => {
          if (typeof text === 'string' || typeof text === 'number') {
            return <Render body={text} data={row} callback={callback} />;
          }
          return text;
        };
      }
      columns[key] = item;
    });
    return columns;
  };

  return (
    <>
      <ProDescriptions
        title={title}
        tooltip={tooltip}
        extra={extra}
        bordered={bordered}
        column={column}
        size={size}
        layout={layout}
        colon={colon}
        columns={columns && parseColumns(columns)}
        dataSource={dataSource}
      />
      {actions?.length > 0 && (
        <>
          <Divider style={{ marginTop: 0 }} />
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
            <Space>
              {actions?.map((action: any, index: number) => {
                return (
                  <Action
                    {...action}
                    key={index}
                    data={{ ...data, ...dataSource }}
                    callback={callback}
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
