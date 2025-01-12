import React from 'react';
import { Table } from 'antd';

export interface GoodsProps {
  columns?: any;
  dataSource?: any;
}

const defaultProps = {
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
} as GoodsProps;

const Goods: React.FC<GoodsProps> = (props) => {
  const { columns, dataSource } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Table<any> columns={columns} dataSource={dataSource} pagination={false} />
  );
};

export default Goods;
