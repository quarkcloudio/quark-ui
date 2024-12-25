import React, { useState } from 'react';
import { Select, Button, Switch } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
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
    id: (Date.now() + index).toString(),
    color: `黄色${index}`,
    chicun: '1米',
    isPatchAction: index === 0,
  };
});

const Index: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => {
      return item.id;
    }),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '颜色',
      dataIndex: 'color',
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
      dataIndex: 'chicun',
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
            name="attributes"
            label="商品规格"
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
          >
            <ProFormText
              style={{ padding: 0 }}
              width="md"
              name="name"
              label="规格名"
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
                <ProFormText allowClear={false} width="xs" name={['name']} />
              </ProFormList>
            </ProForm.Item>
          </ProFormList>
          <ProForm.Item style={{ marginBlockEnd: 0 }} label="商品属性">
            <EditableProTable<DataSourceType>
              columns={columns}
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
                      <Button key="1" type="link" size="small">
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
