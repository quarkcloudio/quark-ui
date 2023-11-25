import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import Editor from '../Field/Editor';

export interface ProFormEditorProps {
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

const ProFormEditor: React.FC<ProFormEditorProps> = ({
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
      <Editor
        key={name}
        height={fieldProps?.style?.height}
        width={fieldProps?.style?.width}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormEditor;
