import React, { useState, useRef, useEffect } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export interface GoodsProps {
  title?: string;
}

const defaultProps = {
  title: '订单详情',
} as GoodsProps;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
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
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const Goods: React.FC<GoodsProps> = (props) => {
  const { title } = {
    ...defaultProps,
    ...props,
  };

  return <Table<any> columns={columns} dataSource={data} pagination={false} />;
};

export default Goods;
