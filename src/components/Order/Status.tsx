import React, { useState, useRef, useEffect } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export interface StatusProps {
  title?: string;
}

const defaultProps = {
  title: '订单详情',
} as StatusProps;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
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

const Status: React.FC<StatusProps> = (props) => {
  const { title } = {
    ...defaultProps,
    ...props,
  };

  return <Table<any> columns={columns} dataSource={data} pagination={false} />;
};

export default Status;
