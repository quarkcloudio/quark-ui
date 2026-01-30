import type { InputProps } from 'antd';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import { fetchLoginCaptcha } from '@/service/api';

// 定义 ref 暴露的接口
export interface ProFormImageCaptchaRef {
  refreshCaptcha: () => Promise<void>;
}

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

const ProFormImageCaptcha = forwardRef<ProFormImageCaptchaRef, ProFormImageCaptchaProps & InputProps>(
  (props: ProFormImageCaptchaProps & InputProps, ref) => {
    const {
      addonAfter,
      addonBefore,
      allowClear,
      captchaUrl, // 这个仍需在组件内部访问
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
    const internalRefreshCaptcha = useCallback(async () => {
      const { data, error } = await fetchLoginCaptcha(captchaUrl);
      if (!error) {
        setCaptcha(data);
      }
    }, [captchaUrl]);

    // 通过 ref 暴露刷新方法
    useImperativeHandle(
      ref,
      () => ({
        refreshCaptcha: internalRefreshCaptcha
      }),
      [internalRefreshCaptcha]
    );

    useEffect(() => {
      internalRefreshCaptcha();
    }, [internalRefreshCaptcha]);

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
          onClick={internalRefreshCaptcha}
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
  }
);

ProFormImageCaptcha.displayName = 'ProFormImageCaptcha';

export default ProFormImageCaptcha;
