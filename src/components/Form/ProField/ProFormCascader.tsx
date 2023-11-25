import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import Cascader from '../Field/Cascader';

export interface ProFormCascaderProps {
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

const ProFormCascader: React.FC<ProFormCascaderProps> = ({
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
      <Cascader
        api={fieldProps.api}
        size={fieldProps.size}
        options={fieldProps.options}
        style={fieldProps.style}
        placeholder={fieldProps.placeholder}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormCascader;
