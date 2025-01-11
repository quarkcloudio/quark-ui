import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Modal, Row, Col, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export interface OrderProps {
  title?: string;
}

const defaultProps = {
  title: '订单详情',
} as OrderProps;

const Index: React.FC<OrderProps> = (props) => {
  const { title } = {
    ...defaultProps,
    ...props,
  };

  return <>order</>;
};

export default Index;
