import { fetchLoginCaptcha } from '@/service/api';

interface ProFormImageCaptchaProps {
  fieldProps?: any;
  onChange?: (val: { uuid?: string; value?: string }) => void;
  value?: {
    uuid?: string;
    value?: string;
  };
}

const ProFormImageCaptcha = (props: ProFormImageCaptchaProps) => {
  const { fieldProps, onChange, value } = props;
  const [captcha, setCaptcha] = useState<Api.Auth.LoginCaptcha>({
    captchaEnabled: false,
    img: '',
    uuid: ''
  });

  /** 刷新验证码 */
  const refreshCaptcha = async () => {
    const { data, error } = await fetchLoginCaptcha(fieldProps?.captchaUrl);
    if (!error) {
      setCaptcha(data);
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  /** 更新值 */
  const updateValue = (val: string) => {
    onChange?.({
      uuid: captcha.uuid,
      value: val
    });
  };

  return (
    <ASpace.Compact className="w-full">
      <AInput
        {...fieldProps}
        style={{ width: '60%' }}
        value={value?.value}
        prefix={
          typeof fieldProps?.prefix === 'object' ? (
            <SvgIcon
              icon={fieldProps?.prefix?.type}
              {...fieldProps?.prefix}
            />
          ) : (
            fieldProps?.prefix
          )
        }
        onChange={e => updateValue(e.target.value)}
      />
      <AButton
        ghost
        size="large"
        style={{ borderColor: 'rgb(229, 231, 235)', padding: 0, width: '40%' }}
        type="primary"
        onClick={refreshCaptcha}
      >
        {captcha.captchaEnabled && (
          <img
            alt="captcha"
            src={`data:image/png;base64,${captcha.img}`}
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </AButton>
    </ASpace.Compact>
  );
};

export default ProFormImageCaptcha;
