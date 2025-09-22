import { useRouter } from '@/features/router';

type FormValues = {
  code: string;
  phone: string;
};

interface Props {
  body?: any;
  component: string;
  componentkey?: string;
}

const ProForm = (props: Props) => {
  const { body } = props;
  const [form] = AForm.useForm<FormValues>();

  const { t } = useTranslation();

  const { navigateUp } = useRouter();

  function handleSubmit(params: FormValues) {
    console.log(params);

    // request to reset password
    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  useKeyPress('enter', () => {
    form.submit();
  });

  return (
    <AForm
      className="pt-24px"
      form={form}
      onFinish={handleSubmit}
    >
      {body.map((item: any) => (
        <ProFormField
          component={item.component}
          fieldProps={{ ...item }}
          key={item.componentkey}
          label={item.label}
          name={item.name}
          rules={item.rules}
        />
      ))}
      <ASpace
        className="w-full"
        direction="vertical"
        size={18}
      >
        <AButton
          block
          htmlType="submit"
          shape="round"
          size="large"
          type="primary"
        >
          {t('common.confirm')}
        </AButton>

        <AButton
          block
          shape="round"
          size="large"
          onClick={navigateUp}
        >
          {t('page.login.common.back')}
        </AButton>
      </ASpace>
    </AForm>
  );
};

export default ProForm;
