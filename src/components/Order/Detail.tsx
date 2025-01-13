import React from 'react';
import { Descriptions, Space } from 'antd';

export interface InfoProps {
  infoItems?: any[];
  dataSource?: any;
}

const defaultProps = {
  infoItems: [
    {
      title: '用户信息',
      column: 2,
      layout: 'horizontal',
      colon: true,
      items: [
        {
          key: 'username',
          label: '用户名',
        },
        {
          key: 'phone',
          label: '联系电话',
        },
      ],
    },
    {
      title: '订单信息',
      column: 4,
      layout: 'horizontal',
      colon: true,
      items: [
        {
          key: 'createtime',
          label: '创建时间',
        },
        {
          key: 'num',
          label: '商品总数',
        },
        {
          key: 'total_price',
          label: '商品总价',
        },
        {
          key: 'pay_price',
          label: '实际支付',
        },
      ],
    },
  ],
} as InfoProps;

const Info: React.FC<InfoProps> = (props) => {
  const { infoItems, dataSource } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: 'flex', marginTop: 5 }}
    >
      {infoItems?.map((infoItem: any, index) => {
        return (
          <Descriptions
            key={index}
            title={
              <div
                style={{
                  lineHeight: '16px',
                  borderLeftColor: 'rgb(22, 119, 255)',
                  borderLeftStyle: 'solid',
                  borderLeftWidth: '2.4px',
                  paddingLeft: '10px',
                }}
              >
                {infoItem?.title}
              </div>
            }
            column={infoItem?.column}
            layout={infoItem?.layout}
            colon={infoItem?.colon}
            items={infoItem?.items?.map((item: any) => {
              return {
                ...item,
                children: dataSource?.[item.key] ? dataSource[item.key] : '-',
              };
            })}
          />
        );
      })}
    </Space>
  );
};

export default Info;
