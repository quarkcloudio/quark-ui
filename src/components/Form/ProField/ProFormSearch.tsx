import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import Search from '../Field/Search';

export interface ProFormSearchProps {
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

const ProFormSearch: React.FC<ProFormSearchProps> = ({
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
      <Search
        mode={fieldProps.mode}
        size={fieldProps.size}
        placeholder={fieldProps.placeholder}
        style={fieldProps.style}
        options={fieldProps.options}
        api={fieldProps.api}
        allowClear={fieldProps.allowClear}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormSearch;
