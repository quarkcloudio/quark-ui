import React from 'react';
import { Col } from 'antd';
import Icon from '../Field/Icon';

export interface ProFormIconProps {
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
}

const ProFormIcon: React.FC<ProFormIconProps> = ({
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
  onChange,
}) => {
  let component = (
    <Icon
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
    />
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormIcon;
