import { Form, Input, InputNumber, Select, Switch } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditableContext = React.createContext<any>(null);
const EditableRow: React.FC<any> = ({ _index, ...props }) => {
  const [editableForm] = Form.useForm();
  return (
    <Form
      component={false}
      form={editableForm}
    >
      <EditableContext.Provider value={editableForm}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  alwaysEditing?: boolean;
  children: React.ReactNode;
  dataIndex: string;
  editable: any;
  handleSave: (record: any, value?: any, editable?: any) => void;
  record: any;
  title: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  alwaysEditing,
  children,
  dataIndex,
  editable,
  handleSave,
  record,
  title: _title,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef: any = useRef(null);
  const editableForm: any = useContext(EditableContext);

  useEffect(() => {
    if (dataIndex && record) {
      editableForm?.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  }, [record, dataIndex, editableForm]);

  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (!alwaysEditing) {
      setEditing(!editing);
      editableForm.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  // 保存数据
  const save = async (_e: any) => {
    const values = await editableForm.getFieldsValue();
    let value = null;
    switch (editable.name) {
      case 'textField':
        toggleEdit();
        value = values[dataIndex];
        break;
      case 'switchField':
        value = values[dataIndex];
        break;
      case 'selectField':
        value = values[dataIndex];
        break;
      case 'imagePickerField':
        value = values[dataIndex];
        break;
      default:
        toggleEdit();
        value = values[dataIndex];
        break;
    }

    handleSave({ ...record, ...values }, { [dataIndex]: value }, editable);
  };

  // 渲染组件
  const cellRender = () => {
    let childNode = children;
    if (editable) {
      switch (editable.name) {
        case 'textField':
          childNode =
            alwaysEditing || editing ? (
              <Form.Item
                initialValue={editable?.defaultValue}
                name={dataIndex}
                style={{ margin: 0 }}
              >
                <Input
                  ref={inputRef}
                  onBlur={save}
                  onPressEnter={save}
                />
              </Form.Item>
            ) : (
              <div
                className="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
              >
                {children}
              </div>
            );
          break;
        case 'inputNumberField':
          childNode =
            alwaysEditing || editing ? (
              <Form.Item
                initialValue={editable?.defaultValue}
                name={dataIndex}
                style={{ margin: 0 }}
              >
                <InputNumber
                  ref={inputRef}
                  onBlur={save}
                  onPressEnter={save}
                />
              </Form.Item>
            ) : (
              <div
                className="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
              >
                {children}
              </div>
            );
          break;
        case 'switchField':
          childNode = (
            <Form.Item
              initialValue={editable?.defaultValue}
              name={dataIndex}
              style={{ margin: 0 }}
            >
              <Switch
                checked={Boolean(record[dataIndex] === 1 || record[dataIndex] === true)}
                checkedChildren={editable.options[1]}
                ref={inputRef}
                unCheckedChildren={editable.options[0]}
                onChange={save}
              />
            </Form.Item>
          );
          break;
        case 'selectField':
          childNode = (
            <Form.Item
              initialValue={editable?.defaultValue}
              name={dataIndex}
              style={{ margin: 0 }}
            >
              <Select
                bordered={false}
                options={editable.options}
                ref={inputRef}
                onChange={save}
              />
            </Form.Item>
          );
          break;
        case 'imagePickerField':
          childNode = (
            <Form.Item
              initialValue={editable?.defaultValue}
              name={dataIndex}
              style={{ margin: 0 }}
            >
              <ProFormImagePicker
                size="small"
                onChange={save}
              />
            </Form.Item>
          );
          break;
        default:
          childNode =
            alwaysEditing || editing ? (
              <Form.Item
                initialValue={editable?.defaultValue}
                name={dataIndex}
                style={{ margin: 0 }}
              >
                <Input
                  ref={inputRef}
                  onBlur={save}
                  onPressEnter={save}
                />
              </Form.Item>
            ) : (
              <div
                className="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
              >
                {children}
              </div>
            );
          break;
      }
    }
    return childNode;
  };

  return <td {...restProps}>{cellRender()}</td>;
};

export { EditableCell, EditableRow };
