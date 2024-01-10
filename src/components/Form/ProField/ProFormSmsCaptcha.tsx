import React from 'react';
import { ProFormCaptcha, ProFormDependency } from '@ant-design/pro-components';
import { message } from 'antd';
import { get } from '@/services/action';

export interface ProFormSmsCaptchaProps {
  name?: any;
  dependency?: any;
  captchaProps?: any;
  captchaUrl?: any;
  captchaIdUrl?: any;
  label?: any;
  tooltip?: any;
  rules?: any;
  help?: any;
  extra?: any;
  addonAfter?: any;
  addonBefore?: any;
  wrapperCol?: any;
  colProps?: any;
  secondary?: any;
  fieldProps?: any;
  onChange?: (value: any) => void;
}

const ProFormSmsCaptcha: React.FC<ProFormSmsCaptchaProps> = ({
  name,
  dependency = 'phone',
  captchaProps,
  label = null,
  tooltip = undefined,
  rules = undefined,
  help = undefined,
  extra = undefined,
  addonAfter = undefined,
  addonBefore = undefined,
  wrapperCol = undefined,
  colProps = undefined,
  secondary = undefined,
  fieldProps = undefined,
  onChange,
}) => {
  return (
    <ProFormDependency name={[dependency]}>
      {({ phone }) => {
        return (
          <ProFormCaptcha
            label={label}
            name={name}
            tooltip={tooltip}
            rules={rules}
            help={help}
            extra={extra}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            wrapperCol={wrapperCol}
            fieldProps={fieldProps}
            colProps={colProps}
            captchaProps={captchaProps}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${captchaProps.text}`;
              }
              return captchaProps.text;
            }}
            onGetCaptcha={async () => {
              const result = await get({
                url: captchaProps.url,
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
        );
      }}
    </ProFormDependency>
  );
};

export default ProFormSmsCaptcha;
