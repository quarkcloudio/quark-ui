import React, { useState, useRef, useContext, useEffect } from 'react';
import { Table, Form, Select, Button, Switch, Input, Space } from 'antd';
import { useModel } from '@umijs/max';
import type { FormListActionType } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-components';

// 可编辑table行组件
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

// 可编辑table单元格组件
interface EditableCellProps {
  title: React.ReactNode;
  editable: any;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any, dataSource: any) => void;
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
  const { dataSource } = useModel('dataSource');

  const save = async (e: any) => {
    const values = await editableForm.getFieldsValue();
    handleSave({ ...record, ...values }, dataSource);
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

// 商品SKU组件
export interface ProSkuProps {
  label?: any;
  name?: any;
  tooltip?: any;
  rules?: any;
  help?: any;
  extra?: any;
  addonAfter?: any;
  addonBefore?: any;
  wrapperCol?: any;
  colProps?: any;
  secondary?: any;
  fieldProps?: any;
  columns?: any;
  checkedColumn?: {
    title?: any;
    valueType?: string;
    width?: number;
    fixed?: string;
    checkedChildren?: string;
    unCheckedChildren?: string;
  };
  optionColumn?: {
    title?: any;
    valueType?: string;
    width?: number;
    fixed?: string;
    checkedChildren?: string;
    unCheckedChildren?: string;
  };
  patchRowChangeButtonText?: any;
  patchRowClearButtonText?: any;
  dataSource?: any;
  onChange?: (value: any) => void;
}

const defaultProps = {
  columns: [
    {
      title: '图片',
      dataIndex: 'tupian',
      width: 120,
    },
    {
      title: '售价',
      dataIndex: 'shoujia',
      width: 120,
    },
    {
      title: '成本价',
      dataIndex: 'chengbenjia',
      width: 120,
    },
    {
      title: '划线价',
      dataIndex: 'huaxianj',
      width: 120,
    },
    {
      title: '库存',
      dataIndex: 'kucun',
      width: 120,
    },
  ],
  checkedColumn: {
    title: '默认选中规格',
    dataIndex: 'default',
    width: 120,
    fixed: 'right',
  },
  optionColumn: {
    title: '操作',
    dataIndex: 'show',
    width: 150,
    fixed: 'right',
    checkedChildren: '显示',
    unCheckedChildren: '隐藏',
  },
  patchRowChangeButtonText: '批量修改',
  patchRowClearButtonText: '清空',
} as ProSkuProps;

const Sku: React.FC<ProSkuProps> = (props) => {
  const {
    columns,
    checkedColumn,
    optionColumn,
    patchRowChangeButtonText,
    patchRowClearButtonText,
  } = {
    ...defaultProps,
    ...props,
  };
  const [itemColumns, setItemColumns] = useState<any[]>(() => []);
  const { dataSource, setDataSource } = useModel('dataSource');

  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();

  function transformColumns(data: any) {
    // 存储最终结果
    const result: any = [];
    // 遍历当前属性的所有可选值
    data.forEach((attr: any, index: any) => {
      const item: any = {
        title: attr.name,
        dataIndex: attr.name,
        width: 150,
        fixed: 'left',
        renderFormItem: (record: any, form: any) => {
          if (record.entity.isPatchAction) {
            let options: any = [];
            actionRef.current?.getList()?.forEach((attr: any) => {
              if (attr.name === record.dataIndex) {
                attr?.items?.forEach((attrItem: any) => {
                  options.push({ value: attrItem.name, label: attrItem.name });
                });
              }
            });
            return (
              <Select allowClear style={{ width: 120 }} options={options} />
            );
          }
          return <>{record.entity[record.dataIndex]}</>;
        },
      };
      result.push(item);
    });
    return result;
  }

  const handleSave = (row: any, dataSource: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item: any) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log('key', index);
    console.log(newData);
    setDataSource(newData);
  };

  const parseItemColumns: any = (specifications: any[], columns: any[]) => {
    let getColumns = transformColumns(specifications);
    columns.forEach((column) => {
      getColumns.push({
        ...column,
        onCell: (record: any) => ({
          record,
          editable: true,
          dataIndex: column.dataIndex,
          title: column.title,
          handleSave: handleSave,
        }),
      });
    });

    getColumns.push({
      ...checkedColumn,
      render: (text: any, row: any) => {
        if (row.isPatchAction) {
          return null;
        }
        return (
          <Switch
            checkedChildren={checkedColumn?.checkedChildren}
            unCheckedChildren={checkedColumn?.unCheckedChildren}
          />
        );
      },
    });
    getColumns.push({
      ...optionColumn,
      render: (text: any, row: any) => {
        if (row.isPatchAction) {
          return (
            <Space>
              <Button key="1" type="link" size="small">
                {patchRowChangeButtonText}
              </Button>
              ,
              <Button key="2" type="link" size="small">
                {patchRowClearButtonText}
              </Button>
            </Space>
          );
        }
        return (
          <Switch
            key="1"
            checkedChildren={optionColumn?.checkedChildren}
            unCheckedChildren={optionColumn?.unCheckedChildren}
          />
        );
      },
    });
    return getColumns;
  };

  const changeItemColumns: any = () => {
    const specifications = actionRef.current?.getList();
    const getItemColumns = parseItemColumns(specifications, columns);
    setItemColumns(getItemColumns);
  };

  function transformAttributes(data: any) {
    const result: any = [];

    // 获取所有属性项（例如，颜色、尺寸等）的名字
    const attributes = data.map((attr: any) => attr.name);

    // 递归生成所有属性组合
    function generateCombinations(items: any, index = 0, current: any = {}) {
      if (index === attributes.length) {
        // 当所有属性都组合完成时，加入到结果中
        const suk = attributes
          .map((attribute: any) => current[attribute])
          .join(',');
        result.push({ ...current, suk });
        return;
      }

      // 获取当前属性名称
      const attribute = attributes[index];

      // 遍历当前属性的所有可选值
      items.forEach((attr: any) => {
        if (attr.name === attribute) {
          attr.items.forEach((item: any) => {
            // 深拷贝当前状态并设置属性
            const newCurrent = { ...current, [attribute]: item.name };
            generateCombinations(items, index + 1, newCurrent); // 递归处理下一个属性
          });
        }
      });
    }

    // 从第一个属性开始递归生成所有组合
    generateCombinations(data);

    // 为每个组合加上一个唯一的 id
    return result.map((item: any, index: any) => ({
      id: index + 1,
      ...item,
    }));
  }

  const parseAttributes: any = (specifications: any[], columns: any[]) => {
    let getAttributes = transformAttributes(specifications);
    return getAttributes;
  };

  const changeDataSource: any = () => {
    const specifications = actionRef.current?.getList();
    const getAttributes = parseAttributes(specifications, columns);
    setDataSource(getAttributes);
    console.log(dataSource);
  };

  return (
    <>
      <ProFormList
        name="specifications"
        label="商品规格"
        actionRef={actionRef}
        creatorButtonProps={{
          creatorButtonText: '添加规格项',
        }}
        copyIconProps={false}
        itemRender={({ listDom, action }, { index }) => (
          <ProCard
            bordered
            style={{ marginBlockEnd: 8 }}
            title={`规格${index + 1}`}
            extra={action}
            bodyStyle={{ paddingBlockEnd: 0 }}
          >
            {listDom}
          </ProCard>
        )}
        creatorRecord={{ name: '', items: [{ name: '' }] }}
        onAfterRemove={() => {
          changeDataSource();
          changeItemColumns();
        }}
      >
        <ProFormText
          style={{ padding: 0 }}
          width="md"
          name="name"
          label="规格名"
          fieldProps={{
            onPressEnter: () => {
              changeDataSource();
              changeItemColumns();
            },
            onBlur: () => {
              changeDataSource();
              changeItemColumns();
            },
          }}
        />
        <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="规格值">
          <ProFormList
            name="items"
            creatorButtonProps={{
              creatorButtonText: '新建',
              icon: false,
              type: 'link',
              style: { width: 'unset' },
            }}
            min={1}
            copyIconProps={false}
            deleteIconProps={{ tooltipText: '删除' }}
            onAfterRemove={() => {
              changeItemColumns();
              changeDataSource();
            }}
            itemRender={({ listDom, action }) => (
              <div
                style={{
                  display: 'inline-flex',
                  marginInlineEnd: 25,
                }}
              >
                {listDom}
                {action}
              </div>
            )}
          >
            <ProFormText
              allowClear={false}
              width="xs"
              name={['name']}
              fieldProps={{
                onPressEnter: () => {
                  changeItemColumns();
                  changeDataSource();
                },
                onBlur: () => {
                  changeItemColumns();
                  changeDataSource();
                },
              }}
            />
          </ProFormList>
        </ProForm.Item>
      </ProFormList>
      <ProForm.Item name="attrs" style={{ marginBlockEnd: 0 }} label="商品属性">
        <Table
          columns={itemColumns}
          rowKey="id"
          scroll={{
            x: 960,
          }}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          dataSource={dataSource}
          pagination={false}
        />
      </ProForm.Item>
    </>
  );
};

export default Sku;
