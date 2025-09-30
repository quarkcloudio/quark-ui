interface ProTableSearchProps {
  defaultCollapsed?: boolean;
  exportApi?: string;
  exportText?: string;
  items?: any;
  onExport?: (values: any) => void;
  onReset?: () => void;
  onSearch?: (values: any) => void;
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
    onExport,
    onReset,
    onSearch,
    resetText = t('common.reset'),
    searchText = t('common.search')
  } = props;

  const [form] = AForm.useForm();

  const onHandleSearch = () => {
    const values = form.getFieldsValue();
    onSearch?.(values);
  };

  const onHandleReset = () => {
    form.resetFields();
    onReset?.();
  };

  const onHandleExport = () => {
    const values = form.getFieldsValue();
    onExport?.(values);
  };

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
          form={form}
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
                  <AButton
                    icon={<IconAntDesignReloadOutlined />}
                    onClick={onHandleReset}
                  >
                    {resetText}
                  </AButton>
                  <AButton
                    ghost
                    icon={<IconAntDesignSearchOutlined />}
                    type="primary"
                    onClick={onHandleSearch}
                  >
                    {searchText}
                  </AButton>
                  {exportApi && (
                    <AButton
                      ghost
                      icon={<IconAntDesignDownloadOutlined />}
                      type="primary"
                      onClick={onHandleExport}
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
