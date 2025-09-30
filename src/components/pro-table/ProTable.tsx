import type { TableProps } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useEngine } from '@/features/engine';
import { fetchTableData } from '@/service/api';

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
}

const ProTable = (props: ProTableProps) => {
  const { columns, headerTitle, rowKey, search, toolBar } = props;
  const [datasource, setDatasource] = useState<any>(props.datasource || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { engineApi } = useEngine();

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

  /** 解析后的列 */
  const parsedColumns = useMemo(() => {
    const columnMap = new Map<string, any>();
    columns.forEach(column => {
      if (column.dataIndex) columnMap.set(column.dataIndex as string, column);
    });

    return columnChecks
      ?.filter(item => item.checked)
      .map(check => {
        const col = { ...columnMap.get(check.key) };
        if (col.filters) {
          col.filters = col?.fieldProps?.options?.map((option: any) => ({
            text: option.label,
            value: option.value
          }));
        }
        col.render = (value: any, record: any) => {
          if (col.valueType === 'radio' || col.valueType === 'select') {
            return col.valueEnum[value];
          }
          if (col.valueType === 'option') {
            return col?.actions?.map((action: any) => (
              <Action
                key={action.component}
                {...action}
                data={record}
              />
            ));
          }
          return <Render body={value} />;
        };
        return col;
      });
  }, [columns, columnChecks]);

  /** 请求数据 */
  const onRequest = useCallback(
    async (params = queryParams) => {
      setLoading(true);
      try {
        const { data }: any = await fetchTableData(engineApi, {
          filters: JSON.stringify(params.filters),
          search: JSON.stringify({ ...params.search, ...params.pagination }),
          sorter: JSON.stringify(params.sorter)
        });

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

  /** 重置 */
  const onReset = () => {
    setQueryParams({
      filters: {},
      pagination: { current: 1, pageSize: pagination.pageSize },
      search: {},
      sorter: {}
    });
  };

  /** 导出（可以改成真正的导出逻辑） */
  const onExport = async () => {
    await onRequest();
  };

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
              loading={loading}
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
          onChange={handleTableChange}
        />
      </ACard>
    </>
  );
};

export default ProTable;
