import ProTableHeaderOperation from './ProTableHeaderOperation';

interface ProTableProps {
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
}

const ProTable = (props: ProTableProps) => {
  const { columns, datasource, headerTitle, search } = props;
  const parsedColumns = columns.map(item => {
    const column: any = item;

    // 解析筛选项
    if (column.filters) {
      column.filters = column?.fieldProps?.options?.map((option: any) => ({
        text: option.label,
        value: option.value
      }));
    }

    // 解析渲染
    column.render = (value: any) => {
      if (column.valueType === 'radio' || column.valueType === 'select') {
        return column.valueEnum[value];
      }
      if (column.valueType === 'option') {
        return value;
      }
      return <Render body={value} />;
    };
    return column;
  });

  return (
    <>
      {search && <ProTableSearch {...search} />}
      <ACard
        className="mt-16px"
        title={headerTitle}
        extra={
          <ProTableHeaderOperation
            columns={[]}
            refresh={() => {
              throw new Error('Function not implemented.');
            }}
            setColumnChecks={(): void => {
              throw new Error('Function not implemented.');
            }}
          />
        }
      >
        <ATable<any>
          columns={parsedColumns}
          dataSource={datasource}
        />
      </ACard>
    </>
  );
};

export default ProTable;
