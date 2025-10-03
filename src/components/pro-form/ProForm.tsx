import { useEngine } from '@/hooks/common/engine';

interface Props {
  actions?: any[];
  api?: string;
  body?: any;
  buttonWrapperCol?: any;
  colon?: boolean;
  componentkey: string;
  data?: any;
  disabled?: boolean;
  hideRquiredMark?: boolean;
  initApi?: string;
  initialValues?: any;
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
    api,
    body,
    buttonWrapperCol,
    colon,
    componentkey,
    data,
    disabled,
    hideRquiredMark,
    initialValues,
    labelAlign,
    labelCol,
    labelWrap,
    layout,
    name,
    scrollToFirstError,
    wrapperCol
  } = props;
  const [form] = AForm.useForm<any>();
  const { setEngineFormApi, setEngineFormRef } = useEngine();
  useEffect(() => {
    if (api) {
      setEngineFormApi(api);
    }
    setEngineFormRef(form);
  }, [api, form, setEngineFormApi, setEngineFormRef]);
  return (
    <AForm
      colon={colon}
      disabled={disabled}
      form={form}
      hideRequiredMark={hideRquiredMark}
      initialValues={{ ...initialValues, ...data }}
      key={componentkey}
      labelAlign={labelAlign}
      labelCol={labelCol}
      labelWrap={labelWrap}
      layout={layout}
      name={name}
      scrollToFirstError={scrollToFirstError}
      wrapperCol={wrapperCol}
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
