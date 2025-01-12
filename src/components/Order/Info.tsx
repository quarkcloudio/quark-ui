import React, { useState, useRef, useEffect } from 'react';
import { Descriptions, Space } from 'antd';

export interface InfoProps {
  title?: string;
}

const defaultProps = {
  title: '订单详情',
} as InfoProps;

const Info: React.FC<InfoProps> = (props) => {
  const { title } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: 'flex', marginTop: 5 }}
    >
      <Descriptions
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
            用户信息
          </div>
        }
        column={2}
      >
        <Descriptions.Item label="用户名">裴明</Descriptions.Item>
        <Descriptions.Item label="联系电话">17899999999</Descriptions.Item>
      </Descriptions>
      <Descriptions
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
            订单信息
          </div>
        }
        column={3}
      >
        <Descriptions.Item label="创建时间">
          2025-01-11 19:49:48
        </Descriptions.Item>
        <Descriptions.Item label="商品总数">3</Descriptions.Item>
        <Descriptions.Item label="商品总价">15.00</Descriptions.Item>
        <Descriptions.Item label="支付邮费">0.00</Descriptions.Item>
        <Descriptions.Item label="优惠券金额">0.00</Descriptions.Item>
        <Descriptions.Item label="积分抵扣">10.00</Descriptions.Item>
        <Descriptions.Item label="用户等级优惠">0.75</Descriptions.Item>
        <Descriptions.Item label="付费会员优惠">0.0</Descriptions.Item>
        <Descriptions.Item label="实际支付">4.25</Descriptions.Item>
      </Descriptions>
    </Space>
  );
};

export default Info;
