import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import Sku from '../Field/Sku';

export interface ProFormSkuProps {
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

const ProFormSku: React.FC<ProFormSkuProps> = ({
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
      <Sku
        key={name}
        attributesName={fieldProps.attributesName}
        attributesLabel={fieldProps.attributesLabel}
        dataSourceLabel={fieldProps.dataSourceLabel}
        attrNameLabel={fieldProps.attrNameLabel}
        attrValueLabel={fieldProps.attrValueLabel}
        createAttrButtonText={fieldProps.createAttrButtonText}
        createAttrValueButtonText={fieldProps.createAttrValueButtonText}
        patchChangeButtonText={fieldProps.patchChangeButtonText}
        patchClearButtonText={fieldProps.patchClearButtonText}
        items={fieldProps.items}
        checkedItem={fieldProps.checkedItem}
        optionItem={fieldProps.optionItem}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormSku;
