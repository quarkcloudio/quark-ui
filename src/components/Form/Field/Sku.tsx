import React, { useState, useRef, useEffect } from 'react';
import { Table, Select, Button, Switch, Space } from 'antd';
import type { FormListActionType } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-components';
import { EditableRow, EditableCell } from '@/components/Table/Editable';

// 商品SKU组件
export interface SkuProps {
  attributesName?: any;
  attributesLabel?: any;
  dataSourceLabel?: any;
  attrNameLabel?: any;
  attrValueLabel?: any;
  createAttrButtonText?: any;
  createAttrValueButtonText?: any;
  patchChangeButtonText?: any;
  patchClearButtonText?: any;
  columns?: any;
  checkedColumn?: {
    title?: any;
    dataIndex?: any;
    valueType?: string;
    width?: number;
    fixed?: string;
    checkedChildren?: string;
    unCheckedChildren?: string;
  };
  optionColumn?: {
    title?: any;
    dataIndex?: any;
    valueType?: string;
    width?: number;
    fixed?: string;
    checkedChildren?: string;
    unCheckedChildren?: string;
  };
  value?: any;
  onChange?: (value: any) => void;
}

const defaultProps = {
  attributesName: 'attributes',
  attributesLabel: '商品规格',
  dataSourceLabel: '商品属性',
  attrNameLabel: '规格名',
  attrValueLabel: '规格值',
  createAttrButtonText: '添加规格项',
  createAttrValueButtonText: '新建',
  patchChangeButtonText: '批量修改',
  patchClearButtonText: '清空',
  columns: [
    {
      title: '图片',
      dataIndex: 'image',
      width: 120,
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: 120,
    },
    {
      title: '成本价',
      dataIndex: 'cost',
      width: 120,
    },
    {
      title: '划线价',
      dataIndex: 'ot_price',
      width: 120,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: 120,
    },
  ],
  checkedColumn: {
    title: '默认选中规格',
    dataIndex: 'is_default',
    width: 120,
    fixed: 'right',
  },
  optionColumn: {
    title: '操作',
    dataIndex: 'is_show',
    width: 150,
    fixed: 'right',
    checkedChildren: '显示',
    unCheckedChildren: '隐藏',
  },
} as SkuProps;

const Sku: React.FC<SkuProps> = (props) => {
  const {
    attributesName,
    attributesLabel,
    dataSourceLabel,
    attrNameLabel,
    attrValueLabel,
    createAttrButtonText,
    createAttrValueButtonText,
    patchChangeButtonText,
    patchClearButtonText,
    columns,
    checkedColumn,
    optionColumn,
    value,
    onChange,
  } = {
    ...defaultProps,
    ...props,
  };
  const [itemColumns, setItemColumns] = useState<any[]>(() => []);
  const [dataSource, setDataSource] = useState<any>(() => value?.dataSource);

  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();

  useEffect(() => {
    changeItemColumns();
  }, [dataSource]);

  useEffect(() => {
    changeItemColumns();
    changeDataSource();
  }, [actionRef.current?.getList()]);

  const triggerChange = (changedValue: { dataSource?: any }) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onSkuChange = () => {
    triggerChange({ ...dataSource });
  };

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

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item: any) => row.suk === item.suk);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  // 更新 checkedColumn 状态并重置其他行
  const handleSwitchChange = (checked: boolean, row: any) => {
    const newData = dataSource.map((item: any) => {
      if (item.suk === row.suk) {
        // 如果当前行被选中，设置为选中状态
        return { ...item, [checkedColumn?.dataIndex]: checked };
      } else {
        // 否则，重置其他行为未选中状态
        return { ...item, [checkedColumn?.dataIndex]: false };
      }
    });
    setDataSource(newData);
  };

  // 解析表格columns
  const parseItemColumns: any = (attributes: any[], columns: any[]) => {
    if (!attributes?.length) {
      return [];
    }
    // 根据规格生成columns
    let getColumns = transformColumns(attributes);
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

    // 创建"默认选中规格"栏
    getColumns.push({
      ...checkedColumn,
      render: (_: any, row: any) => {
        if (row.isPatchAction) {
          return null;
        }
        return (
          <Switch
            checkedChildren={checkedColumn?.checkedChildren}
            unCheckedChildren={checkedColumn?.unCheckedChildren}
            checked={
              row[checkedColumn?.dataIndex] ||
              row[checkedColumn?.dataIndex] === 1
            }
            onChange={(checked: boolean) => {
              handleSwitchChange(checked, row);
            }}
          />
        );
      },
    });

    // 创建"操作"栏
    getColumns.push({
      ...optionColumn,
      render: (_: any, row: any) => {
        if (row.isPatchAction) {
          return (
            <Space>
              <Button type="link" size="small">
                {patchChangeButtonText}
              </Button>
              ,
              <Button type="link" size="small">
                {patchClearButtonText}
              </Button>
            </Space>
          );
        }
        return (
          <Switch
            checkedChildren={optionColumn?.checkedChildren}
            unCheckedChildren={optionColumn?.unCheckedChildren}
            checked={
              row[optionColumn?.dataIndex] || row[optionColumn?.dataIndex] === 1
            }
            onChange={(checked: boolean) => {
              handleSave({ ...row, [optionColumn?.dataIndex]: checked });
            }}
          />
        );
      },
    });
    return getColumns;
  };

  const changeItemColumns: any = () => {
    const attributes = actionRef.current?.getList();
    const getItemColumns = parseItemColumns(attributes, columns);
    setItemColumns(getItemColumns);
    onSkuChange();
  };

  // 生成表格dataSource
  function transformAttributes(data: any) {
    const result: any = [];

    // 获取所有属性项（例如，颜色、尺寸等）的名字
    const attributes = data?.map((attr: any) => attr.name);

    // 递归生成所有属性组合
    function generateCombinations(items: any, index = 0, current: any = {}) {
      if (index === attributes?.length) {
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
      items?.forEach((attr: any) => {
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

    return result;
  }

  const parseAttributes: any = (attributes: any[]) => {
    if (!attributes?.length) {
      return [];
    }
    let getAttributes = transformAttributes(attributes);

    // 合并 dataSource 中已经修改的属性
    getAttributes = getAttributes.map((attribute: any) => {
      const updatedItem = dataSource.find(
        (item: any) => item.suk === attribute.suk,
      );
      return updatedItem
        ? { [optionColumn?.dataIndex]: true, ...attribute, ...updatedItem }
        : attribute;
    });

    return getAttributes;
  };

  const changeDataSource: any = () => {
    const attributes = actionRef?.current?.getList();
    const getAttributes = parseAttributes(attributes);
    setDataSource(getAttributes);
  };

  return (
    <>
      <ProFormList
        name={attributesName}
        label={attributesLabel}
        actionRef={actionRef}
        creatorButtonProps={{
          creatorButtonText: createAttrButtonText,
        }}
        copyIconProps={false}
        itemRender={({ listDom, action }, { index }) => (
          <ProCard
            bordered
            style={{ marginBlockEnd: 8 }}
            title={`${index + 1}#`}
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
          label={attrNameLabel}
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
        <ProForm.Item
          isListField
          style={{ marginBlockEnd: 0 }}
          label={attrValueLabel}
        >
          <ProFormList
            name="items"
            creatorButtonProps={{
              creatorButtonText: createAttrValueButtonText,
              icon: false,
              type: 'link',
              style: { width: 'unset' },
            }}
            min={1}
            copyIconProps={false}
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
      <ProForm.Item
        name="dataSource"
        style={{ marginBlockEnd: 0 }}
        label={dataSourceLabel}
      >
        <Table
          columns={itemColumns}
          rowKey="suk"
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
