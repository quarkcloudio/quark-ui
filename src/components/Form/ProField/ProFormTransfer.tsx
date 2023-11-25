import React from 'react';
import { Col } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import Transfer from '../Field/Transfer';

export interface ProFormTransferProps {
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

const ProFormTransfer: React.FC<ProFormTransferProps> = ({
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
      <Transfer
        api={fieldProps.api}
        dataSource={fieldProps.dataSource}
        disabled={fieldProps.disabled}
        selectionsIcon={fieldProps.selectionsIcon}
        filterOption={fieldProps.filterOption}
        footer={fieldProps.footer}
        listStyle={fieldProps.listStyle}
        locale={fieldProps.locale}
        oneWay={fieldProps.oneWay}
        operations={fieldProps.operations}
        operationStyle={fieldProps.operationStyle}
        pagination={fieldProps.pagination}
        selectAllLabels={fieldProps.selectAllLabels}
        selectedKeys={fieldProps.selectedKeys}
        showSearch={fieldProps.showSearch}
        showSelectAll={fieldProps.showSelectAll}
        status={fieldProps.status}
        targetKeys={fieldProps.targetKeys}
        titles={fieldProps.titles}
      />
    </ProFormItem>
  );

  if (colProps) {
    component = <Col {...colProps}>{component}</Col>;
  }

  return component;
};

export default ProFormTransfer;
