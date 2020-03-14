import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';

const EditableContext = React.createContext<any>();

const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef:any = useRef();
  const form:any = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async (e:any) => {
    try {
      const values = await form.validateFields();
      console.log('Save failed:', values);

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export interface TablePageProps {
  api:string;
  search:[];
  content:{
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      table:{
        title:string,
        columns:any,
        dataSource:any,
        pagination:any,
        actions:any,
        batchActions:any,
        extendActions:any,
        rowActions:any,
        disableSearch:any,
        disableAdvancedSearch:any,
        search:any
      }
    }
  };
  routes:any;
  loading:boolean;
  dispatch:Dispatch<any>;
}

const TablePage: React.SFC<TablePageProps> = props => {

  const icolumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
  ];

  const state = {
    dataSource: [
      {
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      },
      {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      },
    ],
    count: 2,
  };

  const handleSave = (row:any) => {
    const newData = [...state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
  };

  const { dataSource } = state;
  const components:any = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = icolumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record:any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    searchExpand,
    loading,
  } = state.table;

  return {
    content,
    routes,
    searchExpand,
    loading,
  };
}

export default connect(mapStateToProps)(TablePage);