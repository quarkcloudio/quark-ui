import React, { useState, useRef, useEffect } from 'react';
import { Descriptions, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Info from './Info';
import Goods from './Goods';
import Status from './Status';

export interface OrderProps {
  title?: string;
}

const defaultProps = {
  title: '订单详情',
} as OrderProps;

const LogoSvg = () => (
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
  const { title } = {
    ...defaultProps,
    ...props,
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '订单信息',
      children: <Info />,
    },
    {
      key: '2',
      label: '商品信息',
      children: <Goods />,
    },
    {
      key: '3',
      label: '订单记录',
      children: <Status />,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space size="middle">
        <LogoSvg />
        <Descriptions column={2}>
          <Descriptions.Item label="订单号">
            401100405624274944
          </Descriptions.Item>
          <Descriptions.Item label="订单类型">普通订单</Descriptions.Item>
        </Descriptions>
      </Space>
      <Descriptions layout="vertical" colon={false} column={5}>
        <Descriptions.Item label="订单状态">已退款</Descriptions.Item>
        <Descriptions.Item label="实际支付">￥4.25</Descriptions.Item>
        <Descriptions.Item label="实际退款">￥0.0</Descriptions.Item>
        <Descriptions.Item label="支付方式">余额</Descriptions.Item>
        <Descriptions.Item label="支付时间">
          2025-01-11 19:49:5
        </Descriptions.Item>
      </Descriptions>
      <Tabs defaultActiveKey="1" items={items} />
    </Space>
  );
};

export default Index;
