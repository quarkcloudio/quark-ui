import React, { useState, useEffect } from 'react';
import { message, InputProps } from 'antd';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { get } from '@/services/action';

export interface SmsCaptchaProps {
  value?: any;
  captchaSize?: any;
  captchaText?: any;
  captchaUrl?: any;
  captchaIdUrl?: any;
  sendSmsUrl?: any;
  phoneLabel?: any;
  phoneTooltip?: any;
  phoneRules?: any;
  phoneHelp?: any;
  phoneExtra?: any;
  phoneRequired?: any;
  phoneAddonAfter?: any;
  phoneAddonBefore?: any;
  phoneWrapperCol?: any;
  phoneColProps?: any;
  phonePlaceholder?: any;
  phoneStyle?: any;
  phoneWidth?: any;
  phoneSize?: any;
  phoneMaxLength?: any;
  phonePrefix?: any;
  codeLabel?: any;
  codeTooltip?: any;
  codeRules?: any;
  codeHelp?: any;
  codeExtra?: any;
  codeRequired?: any;
  codeAddonAfter?: any;
  codeAddonBefore?: any;
  codeWrapperCol?: any;
  codeColProps?: any;
  codePlaceholder?: any;
  codeStyle?: any;
  codeWidth?: any;
  codeSize?: any;
  codeMaxLength?: any;
  codePrefix?: any;
  onChange?: (value: any) => void;
}

const SmsCaptcha: React.FC<InputProps & SmsCaptchaProps> = (props) => {
  const {
    value,
    captchaSize,
    captchaText,
    sendSmsUrl,
    phoneLabel,
    phoneTooltip,
    phoneRules,
    phoneHelp,
    phoneExtra,
    phoneRequired,
    phoneAddonAfter,
    phoneAddonBefore,
    phoneWrapperCol,
    phoneColProps,
    phonePlaceholder,
    phoneStyle,
    phoneWidth,
    phoneSize,
    phoneMaxLength,
    phonePrefix,
    codeLabel,
    codeTooltip,
    codeRules,
    codeHelp,
    codeExtra,
    codeRequired,
    codeAddonAfter,
    codeAddonBefore,
    codeWrapperCol,
    codeColProps,
    codePlaceholder,
    codeStyle,
    codeWidth,
    codeSize,
    codeMaxLength,
    codePrefix,
    onChange,
  } = { ...props };
  const [phone, setPhone] = useState('');

  const triggerChange = (changedValue: { phone?: string; code?: any }) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onPhoneChange = (e: any) => {
    setPhone(e.target.value);
    triggerChange({ phone: e.target.value });
  };

  const onCodeChange = (e: any) => {
    triggerChange({ code: e.target.value });
  };

  return (
    <>
      <ProFormText
        label={phoneLabel}
        tooltip={phoneTooltip}
        rules={phoneRules}
        help={phoneHelp}
        extra={phoneExtra}
        required={phoneRequired}
        addonAfter={phoneAddonAfter}
        addonBefore={phoneAddonBefore}
        wrapperCol={phoneWrapperCol}
        colProps={phoneColProps}
        placeholder={phonePlaceholder}
        fieldProps={{
          style: phoneStyle,
          width: phoneWidth,
          size: phoneSize,
          maxLength: phoneMaxLength,
          prefix: phonePrefix,
          onChange: onPhoneChange,
        }}
      />
      <ProFormCaptcha
        label={codeLabel}
        tooltip={codeTooltip}
        rules={codeRules}
        help={codeHelp}
        extra={codeExtra}
        required={codeRequired}
        addonAfter={codeAddonAfter}
        addonBefore={codeAddonBefore}
        wrapperCol={codeWrapperCol}
        colProps={codeColProps}
        placeholder={codePlaceholder}
        fieldProps={{
          style: codeStyle,
          width: codeWidth,
          size: codeSize,
          maxLength: codeMaxLength,
          prefix: codePrefix,
          onChange: onCodeChange,
        }}
        captchaProps={{
          size: captchaSize,
        }}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${captchaText}`;
          }
          return captchaText;
        }}
        onGetCaptcha={async () => {
          const result = await get({
            url: sendSmsUrl,
            data: {
              phone: phone,
            },
          });
          if (result.type === 'error') {
            message.error(result.content);
            return;
          }
          message.success(result.content);
        }}
      />
    </>
  );
};

export default SmsCaptcha;
