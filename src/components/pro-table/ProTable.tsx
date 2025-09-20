import type { TableRowSelection } from 'antd/es/table/interface';

import { useEngine } from '@/features/engine';
import { fetchEngineComponent } from '@/service/api';

import ProTableHeaderOperation from './ProTableHeaderOperation';
import ProTableToolBar from './ProTableToolBar';

interface ProTableProps {
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
  toolBar?: any;
}

const ProTable = (props: ProTableProps) => {
  const { columns, headerTitle, search, toolBar } = props;
  const [datasource, setDatasource] = useState<any>(props.datasource || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { engineApi } = useEngine();

  const getColumnChecks = () => {
    const checks: AntDesign.TableColumnCheck[] = [];
    columns.forEach(column => {
      if (column.dataIndex) {
        checks.push({
          checked: true,
          key: column.dataIndex as string,
          title: column.title as string
        });
      }
    });
    return checks;
  };
  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>(getColumnChecks());

  const getColumns = useCallback(() => {
    const columnMap = new Map<string, any>();

    columns.forEach(column => {
      if (column.dataIndex) {
        columnMap.set(column.dataIndex as string, column);
      }
    });

    const filteredColumns = columnChecks?.filter(item => item.checked).map(check => columnMap.get(check.key));

    return filteredColumns.map(item => {
      const column: any = { ...item };

      // 解析筛选项
      if (column.filters) {
        column.filters = column?.fieldProps?.options?.map((option: any) => ({
          text: option.label,
          value: option.value
        }));
      }

      // 解析渲染
      column.render = (value: any, record: any) => {
        if (column.valueType === 'radio' || column.valueType === 'select') {
          return column.valueEnum[value];
        }
        if (column.valueType === 'option') {
          return column?.actions?.map((action: any) => {
            return (
              <Action
                key={action.component}
                {...action}
                data={record}
              />
            );
          });
        }
        return <Render body={value} />;
      };

      return column;
    });
  }, [columns, columnChecks]); // 添加依赖项

  const [parsedColumns, setParsedColumns] = useState<any[]>(getColumns());

  useEffect(() => {
    setParsedColumns(getColumns());
  }, [getColumns]);

  const onRequest = async () => {
    setLoading(true);
    if (engineApi) {
      const { data }: any = await fetchEngineComponent(engineApi);
      setDatasource(data?.datasource || []);
    }
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    onChange: onSelectChange,
    selectedRowKeys
  };

  return (
    <>
      {search && <ProTableSearch {...search} />}
      <ACard
        className="mt-16px"
        title={headerTitle}
        extra={
          <div className="flex items-center gap-x-12px py-12px">
            <ProTableToolBar actions={toolBar?.actions} />
            <ProTableHeaderOperation
              columns={columnChecks}
              loading={loading}
              refresh={onRequest}
              setColumnChecks={setColumnChecks}
            />
          </div>
        }
      >
        <ATable<any>
          columns={parsedColumns}
          dataSource={datasource}
          loading={loading}
          rowSelection={rowSelection}
        />
      </ACard>
    </>
  );
};

export default ProTable;
