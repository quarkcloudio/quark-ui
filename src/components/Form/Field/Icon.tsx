import React, { useState, useEffect } from 'react';
import { Select, Col } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { ProFormItem } from '@ant-design/pro-components';

export interface IconProps {
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

const Icon: React.FC<IconProps> = ({
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
  const Option = Select.Option;
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (value: any) => {
    triggerChange(value);
  };

  return (
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
      <Select
        style={fieldProps.style}
        disabled={fieldProps.disabled}
        placeholder={fieldProps.placeholder}
        size={fieldProps.size}
        allowClear={fieldProps.allowClear}
        onChange={onSelectChange}
      >
        {fieldProps?.options?.map((item: any) => {
          if (!item) {
            return (
              <Option key={undefined} value={''}>
                无图标
              </Option>
            );
          }
          return (
            <Option key={item} value={item}>
              <IconFont type={item} /> {item}
            </Option>
          );
        })}
      </Select>
    </ProFormItem>
  );
};

export default Icon;
