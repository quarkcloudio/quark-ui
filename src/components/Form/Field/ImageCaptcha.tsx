import React, { useState, useEffect } from 'react';
import { Input, InputProps, message } from 'antd';
import { get } from '@/services/action';

export interface ImageCaptchaProps {
  value?: any;
  captchaUrl?: any;
  captchaIdUrl?: any;
  onChange?: (value: any) => void;
}

const ImageCaptcha: React.FC<InputProps & ImageCaptchaProps> = (props) => {
  const {
    value,
    captchaIdUrl,
    captchaUrl,
    placeholder,
    style,
    width,
    size,
    maxLength,
    prefix,
    onChange,
  } = { ...props };
  const [innerCaptchaUrl, setInnerCaptchaUrl] = useState(captchaUrl);
  const [captchaId, setCaptchaId] = useState('');

  useEffect(() => {
    refreshCaptcha();
  }, [captchaUrl]);

  // 刷新图形验证码
  const refreshCaptcha = async () => {
    let captchaId = '';
    const result = await get({
      url: captchaIdUrl,
    });
    if (result.type === 'error') {
      message.error(result.content);
      return;
    }
    captchaId = result.data['captchaId'];
    setCaptchaId(captchaId);
    let getCaptchaUrl = captchaUrl
      .replace(/:id/g, captchaId)
      .replace('${id}', captchaId);
    setInnerCaptchaUrl(getCaptchaUrl);
  };

  const triggerChange = (changedValue: { id?: string; value?: any }) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onInputChange = (e: any) => {
    triggerChange({ id: captchaId, value: e.target.value });
  };

  return (
    <Input
      width={width}
      size={size}
      maxLength={maxLength}
      placeholder={placeholder}
      addonAfter={
        <img
          src={innerCaptchaUrl}
          onClick={() => {
            refreshCaptcha();
          }}
          style={{ cursor: 'pointer', width: 110 }}
        />
      }
      style={style}
      prefix={prefix}
      onChange={onInputChange}
    />
  );
};

export default ImageCaptcha;
