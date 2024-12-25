import React, { useState, useRef } from 'react';
import { Select, Button, Switch } from 'antd';
import type {
  ProColumns,
  FormListActionType,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-components';
import styles from './index.less';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(4).fill(1).map((_, index) => {
  return {
    id: index,
    颜色: `黄色${index}`,
    尺寸: '1米',
    isPatchAction: index === 0,
  };
});

export interface ProSKUProps {
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
    defaultChecked?: boolean;
  };
  patchRowChangeButtonText?: any;
  patchRowClearButtonText?: any;
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
    width: 120,
    fixed: 'right',
  },
  optionColumn: {
    title: '操作',
    valueType: 'option',
    width: 150,
    fixed: 'right',
    checkedChildren: '显示',
    unCheckedChildren: '隐藏',
  },
  patchRowChangeButtonText: '批量修改',
  patchRowClearButtonText: '清空',
} as ProSKUProps;

const Index: React.FC<ProSKUProps> = (props) => {
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
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => {
      return item.id;
    }),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();

  function transformAttributes(data: any) {
    // 存储最终结果
    const result: any = [];

    // 获取所有属性项（例如，颜色、尺寸等）的名字
    const attributes = data.map((attr: any) => attr.name);

    // 递归生成所有属性组合
    function generateCombinations(items: any, index = 0, current = {}) {
      if (index === attributes.length) {
        // 当所有属性都组合完成时，加入到结果中
        result.push(current);
        return;
      }

      // 获取当前属性名称
      const attribute = attributes[index];

      // 遍历当前属性的所有可选值
      data.forEach((attr: any) => {
        if (attr.name === attribute) {
          attr.items.forEach((item: any) => {
            // 深拷贝当前状态并设置属性
            const newCurrent = { ...current, [attribute]: item.name };
            generateCombinations(data, index + 1, newCurrent); // 递归处理下一个属性
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

  const parseItemColumns: any = (specifications: any[], columns: any[]) => {
    const getAttributes = transformAttributes(specifications);
    console.log(getAttributes);
    return columns.map((column) => {
      return column;
    });
  };

  const changeItemColumns: any = () => {
    const specifications = actionRef.current?.getList();
    const getItemColumns = parseItemColumns(specifications, columns);
    setItemColumns(getItemColumns);
  };

  const demoColumns: ProColumns<DataSourceType>[] = [
    {
      title: '颜色',
      dataIndex: '颜色',
      width: 150,
      fixed: 'left',
      renderFormItem: (item: any, form) => {
        if (item.entity.isPatchAction) {
          return (
            <Select
              allowClear
              style={{ width: 120 }}
              options={[{ value: 'lucy', label: 'Lucy' }]}
            />
          );
        }
        return <>{item.entity[item.dataIndex]}</>;
      },
    },
    {
      title: '尺寸',
      dataIndex: '尺寸',
      width: 150,
      fixed: 'left',
      renderFormItem: (item: any, form) => {
        if (item.entity.isPatchAction) {
          return (
            <Select
              allowClear
              style={{ width: 120 }}
              options={[{ value: 'lucy', label: 'Lucy' }]}
            />
          );
        }
        return <>{item.entity[item.dataIndex]}</>;
      },
    },
    {
      title: '图片',
      dataIndex: '图片',
      width: 120,
    },
    {
      title: '售价',
      dataIndex: '售价',
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
    {
      title: '默认选中规格',
      width: 120,
      fixed: 'right',
      renderFormItem: (item: any, form) => {
        if (item.entity.isPatchAction) {
          return null;
        }
        return <Switch />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
    },
  ];

  return (
    <PageContainer title="测试页">
      <ProCard>
        <ProForm layout="horizontal">
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
            onAfterRemove={() => changeItemColumns()}
          >
            <ProFormText
              style={{ padding: 0 }}
              width="md"
              name="name"
              label="规格名"
              fieldProps={{
                onChange: () => changeItemColumns(),
              }}
            />
            <ProForm.Item
              isListField
              style={{ marginBlockEnd: 0 }}
              label="规格值"
            >
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
                onAfterRemove={() => changeItemColumns()}
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
                    onChange: () => changeItemColumns(),
                  }}
                />
              </ProFormList>
            </ProForm.Item>
          </ProFormList>
          <ProForm.Item style={{ marginBlockEnd: 0 }} label="商品属性">
            <EditableProTable<DataSourceType>
              columns={demoColumns}
              rowKey="id"
              scroll={{
                x: 960,
              }}
              value={dataSource}
              onChange={setDataSource}
              recordCreatorProps={false}
              editable={{
                type: 'multiple',
                editableKeys,
                actionRender: (row: any, config, defaultDoms) => {
                  if (row.isPatchAction) {
                    return [
                      <Button key="1" type="link" size="small">
                        批量修改
                      </Button>,
                      <Button key="2" type="link" size="small">
                        清空
                      </Button>,
                    ];
                  }
                  return [
                    <Switch
                      key="1"
                      checkedChildren="显示"
                      unCheckedChildren="隐藏"
                      defaultChecked
                    />,
                  ];
                },
                onValuesChange: (record, recordList) => {
                  setDataSource(recordList);
                },
                onChange: setEditableRowKeys,
              }}
            />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
