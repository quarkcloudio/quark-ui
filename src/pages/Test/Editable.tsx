import React, { useContext, useState, useEffect, useRef } from 'react';
import { Switch, Form, Select, Input } from 'antd';
import { useModel } from '@umijs/max';

const EditableContext = React.createContext<any>(null);
const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [editableForm] = Form.useForm();
  return (
    <Form form={editableForm} component={false}>
      <EditableContext.Provider value={editableForm}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: any;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any,dataSource:any) => void;
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
  const inputRef: any = useRef();
  const editableForm: any = useContext(EditableContext);
  const { dataSource, setDataSource } = useModel('dataSource');

  const save = async (e: any) => {
    const values = await editableForm.getFieldsValue();
    handleSave({ ...record, ...values },dataSource);
  };

  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export { EditableRow, EditableCell };
