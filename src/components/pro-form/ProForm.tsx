import { useFormRules } from '@/features/form';
import { useRouter } from '@/features/router';

type FormValues = {
  code: string;
  phone: string;
};

const ProForm = () => {
  const [form] = AForm.useForm<FormValues>();

  const { getCaptcha, isCounting, label, loading } = useCaptcha();

  const { t } = useTranslation();

  const { formRules } = useFormRules();

  const { navigateUp } = useRouter();

  function handleSubmit(params: FormValues) {
    console.log(params);

    // request to reset password
    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  function sendCaptcha() {
    getCaptcha('17260711111');
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
      <AForm.Item
        name="phone"
        rules={formRules.phone}
      >
        <AInput
          placeholder={t('page.login.common.phonePlaceholder')}
          size="large"
        />
      </AForm.Item>

      <AForm.Item
        name="code"
        rules={formRules.code}
      >
        <div className="w-full flex-y-center gap-16px">
          <AInput
            placeholder={t('page.login.common.codePlaceholder')}
            size="large"
          />
          <AButton
            disabled={isCounting}
            loading={loading}
            size="large"
            onClick={sendCaptcha}
          >
            {label}
          </AButton>
        </div>
      </AForm.Item>
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
