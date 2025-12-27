import { useEngine } from '@/hooks/common/engine';
import { fetchFormData } from '@/service/api';
import tplEngine from '@/utils/template';

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
  style?: any;
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
    initApi,
    initialValues,
    labelAlign,
    labelCol,
    labelWrap,
    layout,
    name,
    scrollToFirstError,
    style,
    wrapperCol
  } = props;
  const [form] = AForm.useForm<any>();
  const { setEngineFormApi, setEngineFormRef } = useEngine();
  const model = useMemo(() => ({ ...initialValues, ...data }), [initialValues, data]);
  useEffect(() => {
    setEngineFormApi(tplEngine(api, model));
    setEngineFormRef(form);
    if (initApi) {
      fetchFormData(tplEngine(initApi, model)).then((res: any) => {
        form.setFieldsValue({ ...model, ...res.data });
      });
    }
  }, [api, initApi, model, form, setEngineFormApi, setEngineFormRef]);
  return (
    <AForm
      colon={colon}
      disabled={disabled}
      form={form}
      hideRequiredMark={hideRquiredMark}
      initialValues={model}
      key={componentkey}
      labelAlign={labelAlign}
      labelCol={labelCol}
      labelWrap={labelWrap}
      layout={layout}
      name={name}
      scrollToFirstError={scrollToFirstError}
      style={style}
      wrapperCol={wrapperCol}
    >
      <Render
        body={body}
        data={data}
      />
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
