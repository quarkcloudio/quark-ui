import React, { useEffect, useState, useRef } from 'react';
import { Space, Divider, Spin } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import { get } from '@/services/action';
import Action from '@/components/Action';
import Render from '@/components/Render';
import tplEngine from '@/utils/template';

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
  initApi?: any;
  items?: any;
  actions?: any;
  dataSource?: any;
  data?: any;
  callback?: any;
}

const defaultProps = {
  column: 2,
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
    initApi,
    data,
    callback,
  } = {
    ...defaultProps,
    ...props,
  };
  const [spinning, setLoading] = useState(false);
  const [random, setRandom] = useState(0); // hack
  const [dataSource, setDataSource] = useState(props.dataSource); // 初始化表单数据

  useEffect(() => {
    setInitialValues();
  }, [columns, initApi, items]);

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

  const setInitialValues = async () => {
    setLoading(true);
    // 从接口获取初始值
    if (initApi) {
      let result = await get({
        url: tplEngine(initApi, data),
      });
      setDataSource(result.data);
    }
    // 更新组件状态
    setRandom(Math.random);
    setLoading(false);
  };

  return (
    <Spin spinning={spinning}>
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
        dataSource={{ ...data, ...dataSource }}
      >
        {items?.map((item: any, index: number) => {
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
                data={{ ...data, ...dataSource }}
              />
            </ProDescriptions.Item>
          );
        })}
      </ProDescriptions>
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
    </Spin>
  );
};

export default Descriptions;
