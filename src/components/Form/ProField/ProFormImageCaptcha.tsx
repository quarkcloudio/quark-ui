import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import ImageCaptcha from '../Field/ImageCaptcha';

export interface ProFormImageCaptchaProps {
  name?: any;
  label?: any;
  tooltip?: any;
  rules?: any;
  extra?: any;
  required?: any;
  help?: any;
  placeholder?: any;
  disabled?: any;
  addonBefore?: any;
  wrapperCol?: any;
  colProps?: any;
  secondary?: any;
  fieldProps?: any;
  captchaUrl?: any;
  captchaIdUrl?: any;
  onChange?: (value: any) => void;
}

const ProFormImageCaptcha: React.FC<ProFormImageCaptchaProps> = ({
  label = null,
  name = undefined,
  tooltip = undefined,
  rules = undefined,
  extra = undefined,
  required = undefined,
  help = undefined,
  placeholder = undefined,
  disabled = undefined,
  addonBefore = undefined,
  wrapperCol = undefined,
  colProps = undefined,
  secondary = undefined,
  fieldProps = undefined,
  captchaUrl = undefined,
  captchaIdUrl = undefined,
  onChange,
}) => {
  let component = (
    <ProFormItem
      label={label}
      name={name}
      tooltip={tooltip}
      rules={[
        ...rules,
        {
          type: 'object',
          fields: {
            value: rules,
          },
        },
      ]}
      help={help}
      extra={extra}
      required={required}
      addonBefore={addonBefore}
      wrapperCol={wrapperCol}
    >
      <ImageCaptcha
        captchaUrl={captchaUrl}
        captchaIdUrl={captchaIdUrl}
        placeholder={placeholder}
        onChange={onChange}
        {...fieldProps}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormImageCaptcha;
