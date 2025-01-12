import React from 'react';
import { Table } from 'antd';

export interface StatusProps {
  columns?: any;
  dataSource?: any;
}

const defaultProps = {
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
} as StatusProps;

const Status: React.FC<StatusProps> = (props) => {
  const { columns, dataSource } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Table<any> columns={columns} dataSource={dataSource} pagination={false} />
  );
};

export default Status;
