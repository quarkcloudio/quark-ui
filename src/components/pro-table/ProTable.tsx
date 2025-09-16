interface ProTableProps {
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
}

const ProTable = (props: ProTableProps) => {
  const { columns, datasource, headerTitle, search } = props;
  const parsedColumns = columns.map((item: any) => {
    const column: any = {};
    column.key = item.dataIndex;
    column.dataIndex = item.dataIndex;
    column.title = item.title;
    return column;
  });

  return (
    <>
      {search && <ProTableSearch {...search} />}
      <ACard
        className="mt-16px"
        title={headerTitle}
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
