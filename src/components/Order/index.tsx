import React, { useState, useEffect } from 'react';
import { Descriptions, Space, Tabs, Table, Spin, Image } from 'antd';
import type { TabsProps } from 'antd';
import { get } from '@/services/action';
import tplEngine from '@/utils/template';
import Render from '@/components/Render';

export interface OrderProps {
  initApi?: string;
  icon?: string;
  orderNoText?: string;
  orderNoName: string;
  orderDetailText?: string;
  orderItemText?: string;
  orderStatusText?: string;
  info?: any;
  detailInfo?: any;
  itemInfo?: any;
  statusInfo?: any;
  data?: any;
}

const defaultProps = {
  orderNoText: '订单号',
  orderNoName: 'order_no',
  orderDetailText: '订单信息',
  orderItemText: '商品信息',
  orderStatusText: '订单记录',
  info: {
    column: 5,
    layout: 'vertical',
    colon: false,
    items: [
      {
        key: 'status',
        label: '订单状态',
      },
      {
        key: 'pay_price',
        label: '实际支付',
      },
      {
        key: 'refund_price',
        label: '实际退款',
      },
      {
        key: 'pay_type',
        label: '支付方式',
      },
      {
        key: 'created_at',
        label: '支付时间',
      },
    ],
    dataSource: {},
  },
  detailInfo: [
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
      dataSource: {},
    },
    {
      title: '订单信息',
      column: 4,
      layout: 'horizontal',
      colon: true,
      items: [
        {
          key: 'created_at',
          label: '创建时间',
        },
        {
          key: 'pay_num',
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
      dataSource: {},
    },
  ],
  itemInfo: {
    columns: [
      {
        title: '商品信息',
        dataIndex: 'name',
      },
      {
        title: '支付价格',
        dataIndex: 'pay_price',
      },
      {
        title: '购买数量',
        dataIndex: 'pay_num',
      },
    ],
    dataSource: [],
  },
  statusInfo: {
    columns: [
      {
        title: '订单ID',
        dataIndex: 'id',
      },
      {
        title: '操作记录',
        dataIndex: 'change_message',
      },
      {
        title: '操作时间',
        dataIndex: 'created_at',
      },
    ],
    dataSource: [],
  },
} as OrderProps;

const IconSvg = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 82.000000 82.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,82.000000) scale(0.100000,-0.100000)"
      fill="rgb(22, 119, 255)"
      stroke="none"
    >
      <path
        d="M98 759 c-16 -6 -31 -22 -37 -41 -15 -42 -15 -574 0 -616 7 -20 21
      -34 41 -41 42 -15 574 -15 616 0 20 7 34 21 41 41 15 42 15 574 0 616 -7 20
      -21 34 -41 41 -39 14 -582 13 -620 0z m376 -164 c30 -30 9 -46 -58 -43 -50 2
      -61 6 -64 22 -2 10 2 22 10 27 22 14 95 10 112 -6z m-139 -34 c14 -45 165 -41
      165 4 0 10 11 15 33 15 58 0 58 -1 55 -186 l-3 -169 -170 0 -170 0 -3 165 c-1
      90 0 170 2 177 3 8 22 13 45 13 30 0 41 -5 46 -19z"
      />
      <path
        d="M320 470 c0 -6 38 -10 95 -10 57 0 95 4 95 10 0 6 -38 10 -95 10 -57
      0 -95 -4 -95 -10z"
      />
      <path
        d="M325 400 c-4 -6 28 -10 90 -10 62 0 94 4 90 10 -3 6 -44 10 -90 10
      -46 0 -87 -4 -90 -10z"
      />
      <path
        d="M320 330 c0 -6 39 -10 96 -10 61 0 93 4 89 10 -3 6 -46 10 -96 10
      -53 0 -89 -4 -89 -10z"
      />
    </g>
  </svg>
);

const Index: React.FC<OrderProps> = (props) => {
  const {
    initApi,
    icon,
    orderNoText,
    orderNoName,
    orderDetailText,
    orderItemText,
    orderStatusText,
    info,
    detailInfo,
    itemInfo,
    statusInfo,
    data,
  } = {
    ...defaultProps,
    ...props,
  };
  const [initValues, setInitValues] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInitValues();
  }, [initApi, data]);

  const getInitValues = async () => {
    if (!initApi) {
      return;
    }
    setLoading(true);
    let result = await get({
      url: tplEngine(initApi, data),
    });
    setInitValues(result.data);
    setLoading(false);
  };

  // 渲染column
  const columnRender = (column: any, row: any, text: any) => {
    switch (column.valueType) {
      case 'image':
        if (typeof text === 'string') {
          text = <Image src={text} />;
        }
        break;
      case 'text':
        if (typeof text === 'string' || typeof text === 'number') {
          text = <Render body={text} data={{ ...row }} />;
        }
        break;
    }
    return text;
  };

  // 解析column
  const parseColumns = (columns: any) => {
    return columns.map((column: any) => {
      column = {
        ...column,
        render: (text: any, row: any) => columnRender(column, row, text),
      };
      return column;
    });
  };

  const items: TabsProps['items'] = [
    {
      key: 'orderDetail',
      label: orderDetailText,
      children: (
        <Space
          direction="vertical"
          size="large"
          style={{ display: 'flex', marginTop: 5 }}
        >
          {detailInfo?.map((info: any, index: any) => {
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
                    {info?.title}
                  </div>
                }
                column={info?.column}
                layout={info?.layout}
                colon={info?.colon}
                items={info?.items?.map((item: any) => {
                  const dataSource =
                    initValues?.[info.dataIndex] || info?.dataSource;
                  return {
                    ...item,
                    children: dataSource?.[item.key]
                      ? dataSource[item.key]
                      : '-',
                  };
                })}
              />
            );
          })}
        </Space>
      ),
    },
    {
      key: 'orderItem',
      label: orderItemText,
      children: (
        <Table<any>
          columns={itemInfo?.columns && parseColumns(itemInfo?.columns)}
          dataSource={initValues?.[itemInfo.dataIndex] || itemInfo?.dataSource}
          pagination={false}
        />
      ),
    },
    {
      key: 'orderStatus',
      label: orderStatusText,
      children: (
        <Table<any>
          columns={statusInfo?.columns && parseColumns(statusInfo?.columns)}
          dataSource={
            initValues?.[statusInfo.dataIndex] || statusInfo?.dataSource
          }
          pagination={false}
        />
      ),
    },
  ];

  return (
    <Spin size="small" spinning={loading}>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space size="middle">
          {icon ? <img src="icon" /> : <IconSvg />}
          <Descriptions column={5}>
            <Descriptions.Item label={orderNoText}>
              {data[orderNoName]}
            </Descriptions.Item>
          </Descriptions>
        </Space>
        <Descriptions
          layout={info?.layout}
          colon={info?.colon}
          column={info?.column}
          items={info?.items?.map((item: any) => {
            const dataSource = initValues?.[info.dataIndex] || info?.dataSource;
            return {
              ...item,
              children: dataSource?.[item.key] ? dataSource[item.key] : '-',
            };
          })}
        />
        <Tabs defaultActiveKey="orderInfo" items={items} />
      </Space>
    </Spin>
  );
};

export default Index;
