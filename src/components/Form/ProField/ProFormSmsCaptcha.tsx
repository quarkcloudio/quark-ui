import React from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import SmsCaptcha from '../Field/SmsCaptcha';

export interface ProFormSmsCaptchaProps {
  name?: any;
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

const ProFormSmsCaptcha: React.FC<ProFormSmsCaptchaProps> = ({
  name,
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
}) => {
  return (
    <ProFormItem name={name}>
      <SmsCaptcha
        captchaSize={captchaSize}
        captchaText={captchaText}
        sendSmsUrl={sendSmsUrl}
        phoneLabel={phoneLabel}
        phoneTooltip={phoneTooltip}
        phoneRules={phoneRules}
        phoneHelp={phoneHelp}
        phoneExtra={phoneExtra}
        phoneRequired={phoneRequired}
        phoneAddonAfter={phoneAddonAfter}
        phoneAddonBefore={phoneAddonBefore}
        phoneWrapperCol={phoneWrapperCol}
        phoneColProps={phoneColProps}
        phonePlaceholder={phonePlaceholder}
        phoneStyle={phoneStyle}
        phoneWidth={phoneWidth}
        phoneSize={phoneSize}
        phoneMaxLength={phoneMaxLength}
        phonePrefix={phonePrefix}
        codeLabel={codeLabel}
        codeTooltip={codeTooltip}
        codeRules={codeRules}
        codeHelp={codeHelp}
        codeExtra={codeExtra}
        codeRequired={codeRequired}
        codeAddonAfter={codeAddonAfter}
        codeAddonBefore={codeAddonBefore}
        codeWrapperCol={codeWrapperCol}
        codeColProps={codeColProps}
        codePlaceholder={codePlaceholder}
        codeStyle={codeStyle}
        codeWidth={codeWidth}
        codeSize={codeSize}
        codeMaxLength={codeMaxLength}
        codePrefix={codePrefix}
      />
    </ProFormItem>
  );
};

export default ProFormSmsCaptcha;
