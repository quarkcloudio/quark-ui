import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './Editable.less';

import { Switch, Form, Select, Input } from 'antd';

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
  const inputRef: any = useRef();
  const editableForm: any = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    editableForm.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async (e: any) => {
    try {
      const values = await editableForm.getFieldsValue();
      let value = null;

      switch (editable.name) {
        case 'text':
          toggleEdit();
          value = values[dataIndex];
          break;

        case 'switch':
          value = values[dataIndex];
          editableForm.setFieldsValue({ [dataIndex]: record[dataIndex] });
          break;

        case 'select':
          value = values[dataIndex];
          editableForm.setFieldsValue({
            [dataIndex]: record[dataIndex].toString(),
          });
          break;

        default:
          toggleEdit();
          value = values[dataIndex];
          break;
      }

      let getValues: any = [];
      getValues[dataIndex] = value;
      handleSave({ id: record.id, values: getValues, editable: editable });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    switch (editable.name) {
      case 'textField':
        childNode = editing ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        ) : (
          <div
            className={styles.editableCellValueWrap}
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
        break;

      case 'inputNumberField':
        childNode = editing ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        ) : (
          <div
            className={styles.editableCellValueWrap}
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
        break;

      case 'switchField':
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Switch
              ref={inputRef}
              onChange={save}
              checkedChildren={editable.options.on}
              unCheckedChildren={editable.options.off}
              checked={record[dataIndex] == 1 ? true : false}
            />
          </Form.Item>
        );
        break;

      case 'selectField':
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Select ref={inputRef} onChange={save} bordered={false}>
              {!!editable.options &&
                editable.options.map((option: any) => {
                  return (
                    <Select.Option value={option.value.toString()}>
                      {option.label}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
        );
        editableForm.setFieldsValue({
          [dataIndex]: record[dataIndex].toString(),
        });
        break;

      default:
        childNode = editing ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        ) : (
          <div
            className={styles.editableCellValueWrap}
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
        break;
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export { EditableRow, EditableCell };
