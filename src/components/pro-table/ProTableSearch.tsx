interface ProTableSearchProps {
  defaultCollapsed?: boolean;
  exportApi?: string;
  exportText?: string;
  items?: any;
  resetText?: string;
  searchText?: string;
}

const ProTableSearch = (props: ProTableSearchProps) => {
  const { t } = useTranslation();
  const {
    defaultCollapsed = true,
    exportApi,
    exportText = t('common.export'),
    items,
    resetText = t('common.reset'),
    searchText = t('common.search')
  } = props;

  return (
    <ACollapse
      bordered={false}
      className="card-wrapper"
      defaultActiveKey={defaultCollapsed ? ['1'] : undefined}
    >
      <ACollapse.Panel
        header={<span className="text-size-16px font-600">{searchText}</span>}
        key="1"
      >
        <AForm layout="inline">
          <ASpace>
            {items.map((item: any) => (
              <ProFormField
                component={item.component}
                fieldProps={{ ...item }}
                key={item.componentkey}
                label={item.label}
                name={item.name}
                rules={item.rules}
              />
            ))}
          </ASpace>
          <ASpace>
            <AButton>{resetText}</AButton>
            <AButton type="primary">{searchText}</AButton>
            {exportApi && <AButton type="primary">{exportText}</AButton>}
          </ASpace>
        </AForm>
      </ACollapse.Panel>
    </ACollapse>
  );
};

export default ProTableSearch;
