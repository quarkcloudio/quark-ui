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
        header={<span className="text-size-16px">{searchText}</span>}
        key="1"
      >
        <AForm
          labelCol={{
            md: 7,
            span: 5
          }}
        >
          <ARow
            wrap
            gutter={[16, 16]}
          >
            {items.map((item: any, index: number) => (
              <ACol
                key={index}
                lg={6}
                md={12}
                span={24}
              >
                <ProFormField
                  component={item.component}
                  fieldProps={{ ...item }}
                  key={item.componentkey}
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                />
              </ACol>
            ))}
            <div className="flex-1">
              <AForm.Item className="m-0">
                <AFlex
                  align="center"
                  gap={12}
                  justify="end"
                >
                  <AButton icon={<IconAntDesignReloadOutlined />}>{resetText}</AButton>
                  <AButton
                    ghost
                    icon={<IconAntDesignSearchOutlined />}
                    type="primary"
                  >
                    {searchText}
                  </AButton>
                  {exportApi && (
                    <AButton
                      ghost
                      icon={<IconAntDesignDownloadOutlined />}
                      type="primary"
                    >
                      {exportText}
                    </AButton>
                  )}
                </AFlex>
              </AForm.Item>
            </div>
          </ARow>
        </AForm>
      </ACollapse.Panel>
    </ACollapse>
  );
};

export default ProTableSearch;
