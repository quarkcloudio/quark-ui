import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import ImageUploader from '../Field/ImageUploader';

export interface ProFormImageUploaderProps {
  label?: any;
  name?: any;
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
  disabled?: boolean;
}

const ProFormImageUploader: React.FC<ProFormImageUploaderProps> = ({
  label = null,
  name = undefined,
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
  disabled = false,
  onChange,
}) => {
  let component = (
    <ProFormItem
      label={label}
      name={name}
      tooltip={tooltip}
      rules={rules}
      help={help}
      extra={extra}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      wrapperCol={wrapperCol}
    >
      <ImageUploader
        key={name}
        mode={fieldProps.mode}
        button={fieldProps.button}
        limitType={fieldProps.limitType}
        limitSize={fieldProps.limitSize}
        limitNum={fieldProps.limitNum}
        limitWH={fieldProps.limitWH}
        action={fieldProps.api}
        disabled={disabled}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormImageUploader;
