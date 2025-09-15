import type { TableProps } from 'antd';

interface ProTableProps {
  api?: string;
}

interface DataType {
  address: string;
  age: number;
  key: string;
  name: string;
}

const ProTable = (props: ProTableProps) => {
  console.log(props);

  const columns: TableProps<DataType>['columns'] = [
    {
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
      title: 'Name'
    },
    {
      dataIndex: 'age',
      key: 'age',
      title: 'Age'
    },
    {
      dataIndex: 'address',
      key: 'address',
      title: 'Address'
    },
    {
      key: 'action',
      render: (_, record) => (
        <ASpace size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </ASpace>
      ),
      title: 'Action'
    }
  ];

  const data: DataType[] = [
    {
      address: 'New York No. 1 Lake Park',
      age: 32,
      key: '1',
      name: 'John Brown'
    },
    {
      address: 'London No. 1 Lake Park',
      age: 42,
      key: '2',
      name: 'Jim Green'
    },
    {
      address: 'Sydney No. 1 Lake Park',
      age: 32,
      key: '3',
      name: 'Joe Black'
    }
  ];

  return (
    <ATable<DataType>
      columns={columns}
      dataSource={data}
    />
  );
};

export default ProTable;
