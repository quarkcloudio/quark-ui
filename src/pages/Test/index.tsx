import React, { useState } from 'react';
import { Space, Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
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
    title: `活动名称${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
  };
});

const Index: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
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
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.delete];
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
