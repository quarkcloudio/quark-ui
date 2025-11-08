import type { InputProps } from 'antd';

import { fetchLoginCaptcha } from '@/service/api';

interface ProFormImageCaptchaProps {
  captchaUrl: string;
  onChange?: (val: { uuid?: string; value?: string }) => void;
  prefix?: any;
  suffix?: any;
  value?: {
    uuid?: string;
    value?: string;
  };
}

const ProFormImageCaptcha = (props: ProFormImageCaptchaProps & InputProps) => {
  const {
    addonAfter,
    addonBefore,
    allowClear,
    captchaUrl,
    defaultValue,
    disabled,
    id,
    maxLength,
    onChange,
    placeholder,
    prefix,
    showCount,
    size,
    status,
    suffix,
    type,
    value
  } = props;
  const [captcha, setCaptcha] = useState<Api.Auth.LoginCaptcha>({
    captchaEnabled: false,
    img: '',
    uuid: ''
  });

  /** 刷新验证码 */
  const refreshCaptcha = async () => {
    const { data, error } = await fetchLoginCaptcha(captchaUrl);
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
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        placeholder={placeholder}
        showCount={showCount}
        size={size}
        status={status}
        style={{ width: '60%' }}
        type={type}
        value={value?.value}
        prefix={
          typeof prefix === 'object' ? (
            <SvgIcon
              icon={prefix?.type}
              {...prefix}
            />
          ) : (
            prefix
          )
        }
        suffix={
          typeof suffix === 'object' ? (
            <SvgIcon
              icon={suffix?.type}
              {...suffix}
            />
          ) : (
            suffix
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
