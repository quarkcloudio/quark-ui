import React, { useState, useRef, useEffect } from 'react';
import { Descriptions, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Detail from './Detail';
import Table from './Table';

export interface OrderProps {
  initApi?: string;
  icon?: string;
  orderNoText?: string;
  orderDetailText?: string;
  orderItemText?: string;
  orderStatusText?: string;
  orderNo?: string;
  info?: any;
  detailInfo?: any;
  itemInfo?: any;
  statusInfo?: any;
  data?: any;
}

const defaultProps = {
  orderNoText: '订单号',
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
        key: 'total_price',
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
        key: 'createtime',
        label: '支付时间',
      },
    ],
  },
  detailInfo: {
    descriptions: [
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
    dataSource: [],
  },
  itemInfo: {
    columns: [
      {
        title: '商品信息',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '支付价格',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '购买数量',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    dataSource: [],
  },
  statusInfo: {
    columns: [
      {
        title: '订单ID',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作记录',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作时间',
        dataIndex: 'address',
        key: 'address',
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
    orderDetailText,
    orderItemText,
    orderStatusText,
    orderNo,
    info,
    detailInfo,
    itemInfo,
    statusInfo,
    data,
  } = {
    ...defaultProps,
    ...props,
  };

  const items: TabsProps['items'] = [
    {
      key: 'orderDetail',
      label: orderDetailText,
      children: (
        <Detail
          infoItems={detailInfo?.descriptions}
          dataSource={detailInfo?.dataSource}
        />
      ),
    },
    {
      key: 'orderItem',
      label: orderItemText,
      children: (
        <Table columns={itemInfo?.columns} dataSource={itemInfo?.dataSource} />
      ),
    },
    {
      key: 'orderStatus',
      label: orderStatusText,
      children: (
        <Table
          columns={statusInfo?.columns}
          dataSource={statusInfo?.dataSource}
        />
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space size="middle">
        {icon ? <img src="icon" /> : <IconSvg />}
        <Descriptions column={5}>
          <Descriptions.Item label={orderNoText}>{orderNo}</Descriptions.Item>
        </Descriptions>
      </Space>
      <Descriptions
        layout={info?.layout}
        colon={info?.colon}
        column={info?.column}
        items={info?.items?.map((item: any) => {
          return {
            ...item,
            children: info?.dataSource?.[item.key]
              ? info?.dataSource[item.key]
              : '-',
          };
        })}
      />
      <Tabs defaultActiveKey="orderInfo" items={items} />
    </Space>
  );
};

export default Index;
