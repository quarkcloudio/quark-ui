interface Props {
  actions?: any[];
  body?: any;
  buttonWrapperCol?: any;
  colon?: boolean;
  componentkey: string;
  disabled?: boolean;
  hideRquiredMark?: boolean;
  labelAlign?: 'left' | 'right';
  labelCol?: any;
  labelWrap?: boolean;
  layout?: 'horizontal' | 'inline' | 'vertical';
  name?: string;
  scrollToFirstError?: boolean;
  wrapperCol?: any;
}

const ProForm = (props: Props) => {
  const {
    actions,
    body,
    buttonWrapperCol,
    colon,
    componentkey,
    disabled,
    hideRquiredMark,
    labelAlign,
    labelCol,
    labelWrap,
    layout,
    name,
    scrollToFirstError
  } = props;
  const [form] = AForm.useForm<any>();

  function handleSubmit(params: any) {
    console.log(params);
  }

  useKeyPress('enter', () => {
    form.submit();
  });

  return (
    <AForm
      colon={colon}
      disabled={disabled}
      form={form}
      hideRequiredMark={hideRquiredMark}
      key={componentkey}
      labelAlign={labelAlign}
      labelCol={labelCol}
      labelWrap={labelWrap}
      layout={layout}
      name={name}
      scrollToFirstError={scrollToFirstError}
      onFinish={handleSubmit}
    >
      {body.map((item: any) => (
        <ProFormField
          component={item.component}
          fieldProps={{ ...item }}
          key={item.componentkey}
          label={item.label}
          name={item.name}
          rules={item.frontendRules}
        />
      ))}
      <AForm.Item wrapperCol={buttonWrapperCol}>
        <ASpace className="w-full">
          {actions?.map((item: any) => (
            <Action
              {...item}
              key={item.componentkey}
            />
          ))}
        </ASpace>
      </AForm.Item>
    </AForm>
  );
};

export default ProForm;
