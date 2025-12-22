import type { TableProps, TreeProps } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useEngine } from '@/hooks/common/engine';
import { fetchTableData, fetchTableEditableAction } from '@/service/api';

import ProTableHeaderOperation from './ProTableHeaderOperation';
import ProTableToolBar from './ProTableToolBar';

interface ProTableProps {
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  pagination?: any;
  rowKey: string;
  search?: any;
  toolBar?: any;
  treeBar?: any;
}

const ProTable = (props: ProTableProps) => {
  const { columns, headerTitle, rowKey, search, toolBar, treeBar } = props;
  const [datasource, setDatasource] = useState<any>(props.datasource || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [treeBarSearchValue, setTreeBarSearchValue] = useState('');
  const { getEngineApi } = useEngine();

  const [pagination, setPagination] = useState<any>({
    current: props.pagination?.current || 1,
    pageSize: props.pagination?.pageSize || 10,
    total: props.pagination?.total || 0
  });

  const [queryParams, setQueryParams] = useState<any>({
    filters: {},
    pagination: {
      current: props.pagination?.current || 1,
      pageSize: props.pagination?.pageSize || 10
    },
    search: {},
    sorter: {}
  });

  /** 重置 */
  const onReset = useCallback(() => {
    setQueryParams({
      filters: {},
      pagination: { current: 1, pageSize: pagination.pageSize },
      search: {},
      sorter: {}
    });
  }, [pagination.pageSize]);

  /** 初始化列显示配置 */
  const getColumnChecks = () => {
    return columns
      .filter(column => column.dataIndex)
      .map(col => ({
        checked: true,
        key: col.dataIndex as string,
        title: col.title as string
      }));
  };
  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>(getColumnChecks());

  // 获取 value 对应的 label
  const getValueLabel = (options: any[], value: any) => {
    const option = options.find(item => item.value === value);
    return option ? option.label : value;
  };

  /** 请求数据 */
  const engineApi = getEngineApi();
  const onRequest = useCallback(
    async (params = queryParams) => {
      setLoading(true);
      try {
        const queryData: any = {};
        queryData[treeBar?.name || ''] = JSON.stringify(params[treeBar?.name || '']);
        queryData.filters = JSON.stringify(params.filters);
        queryData.sorter = JSON.stringify(params.sorter);
        queryData.search = JSON.stringify(params.search);
        queryData.pagination = JSON.stringify(params.pagination);

        const { data }: any = await fetchTableData(engineApi, queryData);

        setDatasource(data?.datasource || []);
        setSelectedRowKeys([]);
        setPagination({ ...data.pagination, current: params.pagination.current });
        return data;
      } catch (e) {
        console.error('fetch table data error', e);
        return { datasource: [], pagination: {} };
      } finally {
        setLoading(false);
      }
    },
    [engineApi, queryParams]
  );

  // 行内编辑
  const editableSave = async (record: any, value: any, editable: any) => {
    const res = await fetchTableEditableAction(editable.action, { id: record.id, ...value });
    if (!res.error) {
      onRequest();
    }
  };

  /** 解析后的列 */
  const parsedColumns = useMemo(() => {
    const columnMap = new Map<string, any>();
    columns.forEach(column => {
      if (column.dataIndex) columnMap.set(column.dataIndex as string, column);
    });

    return columnChecks
      ?.filter(item => item.checked)
      .map(check => {
        let col = { ...columnMap.get(check.key) };

        // 解析筛选项
        if (col.filters) {
          col.filters = Object.entries(col.valueEnum || {}).map(([key, value]) => ({
            text: value,
            value: key
          }));
        }

        // 自定义渲染
        col.render = (value: any, record: any) => {
          if (col.valueEnum?.[value]) {
            return col.valueEnum?.[value];
          }
          switch (col.valueType) {
            case 'radio':
              return getValueLabel(col?.fieldProps?.options || [], value);
            case 'checkbox':
              return getValueLabel(col?.fieldProps?.options || [], value);
            case 'select':
              return getValueLabel(col?.fieldProps?.options || [], value);
            case 'option':
              return col?.actions?.map((action: any, index: number) => (
                <Action
                  key={index}
                  {...action}
                  data={record}
                  onClick={() => onReset()}
                />
              ));
            default:
              return <Render body={value} />;
          }
        };

        // 可编辑
        if (col.editable) {
          col = {
            ...col,
            onCell: (record: any) => ({
              dataIndex: col.dataIndex,
              editable: col.editable,
              handleSave: editableSave,
              record,
              title: col.title
            })
          };
        }

        return col;
      });
  }, [columns, columnChecks, onReset]);

  /** queryParams 改变时自动请求 */
  useEffect(() => {
    onRequest(queryParams);
  }, [queryParams, onRequest]);

  /** 行选择 */
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    onChange: onSelectChange,
    selectedRowKeys
  };

  /** 表格排序/分页/过滤 */
  const handleTableChange: TableProps['onChange'] = (page, filters, sorter) => {
    setQueryParams((prev: any) => ({
      ...prev,
      filters,
      pagination: page,
      sorter
    }));
  };

  /** 搜索 */
  const onSearch = (values: any) => {
    setQueryParams((prev: any) => ({
      ...prev,
      pagination: { current: 1, pageSize: pagination.pageSize },
      search: values
    }));
  };

  /** 导出（可以改成真正的导出逻辑） */
  const onExport = async () => {
    await onRequest();
  };

  const onTreeBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTreeBarSearchValue(value);
  };

  const onTreeBarSelect: TreeProps['onSelect'] = newSelectedKeys => {
    const data: any = {};
    data[treeBar?.name || ''] = newSelectedKeys;
    setQueryParams((prev: any) => ({
      ...prev,
      pagination: { current: 1, pageSize: pagination.pageSize },
      ...data
    }));
  };

  const treeData = useMemo(() => {
    const loop = (data: any): any =>
      data?.reduce((acc: any, item: any) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(treeBarSearchValue);

        // 如果title中包含searchValue，保留节点
        if (index > -1) {
          acc.push({ ...item });
        } else if (item.children) {
          // 递归过滤子节点
          const filteredChildren = loop(item.children);
          if (filteredChildren.length > 0) {
            // 如果有子节点包含searchValue，保留该节点并更新children
            acc.push({ ...item, children: filteredChildren });
          }
        }
        return acc;
      }, []);

    return loop(treeBar?.treeData);
  }, [treeBarSearchValue]);

  const tableComponent = (
    <ACard
      className="mt-16px"
      title={headerTitle}
      extra={
        <div className="flex items-center gap-x-12px py-12px">
          <ProTableToolBar
            actions={toolBar?.actions}
            refresh={() => onRequest()}
            selectedRowKeys={selectedRowKeys}
          />
          <ProTableHeaderOperation
            columns={columnChecks}
            refresh={() => onRequest()}
            setColumnChecks={setColumnChecks}
          />
        </div>
      }
    >
      <ATable<any>
        columns={parsedColumns}
        dataSource={datasource}
        loading={loading}
        pagination={pagination}
        rowKey={rowKey}
        rowSelection={rowSelection}
        components={{
          body: {
            cell: EditableCell,
            row: EditableRow
          }
        }}
        onChange={handleTableChange}
      />
    </ACard>
  );
  if (treeBar?.treeData) {
    return (
      <ARow gutter={16}>
        <ACol span={4}>
          <ACard className="h-full w-full">
            <AInput.Search
              allowClear={true}
              placeholder={treeBar?.placeholder}
              style={{ marginBottom: 8 }}
              onChange={onTreeBarChange}
            />
            <ATree
              defaultExpandAll={treeBar?.defaultExpandAll}
              showLine={treeBar?.showLine}
              treeData={treeData}
              onSelect={onTreeBarSelect}
            />
          </ACard>
        </ACol>
        <ACol span={20}>
          {search && (
            <ProTableSearch
              {...search}
              onExport={onExport}
              onReset={onReset}
              onSearch={onSearch}
            />
          )}
          {tableComponent}
        </ACol>
      </ARow>
    );
  }

  return (
    <>
      {search && (
        <ProTableSearch
          {...search}
          onExport={onExport}
          onReset={onReset}
          onSearch={onSearch}
        />
      )}
      {tableComponent}
    </>
  );
};

export default ProTable;
