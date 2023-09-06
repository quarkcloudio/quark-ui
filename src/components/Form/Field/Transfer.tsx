import React, { useState, useEffect } from 'react';
import { Transfer as AntdTransfer } from 'antd';
import { get } from '@/services/action';

export interface TransferProps {
  api?: any;
  value?: any;
  dataSource?: any;
  disabled?: any;
  selectionsIcon?: any;
  filterOption?: any;
  footer?: any;
  listStyle?: any;
  locale?: any;
  oneWay?: any;
  operations?: any;
  operationStyle?: any;
  pagination?: any;
  selectAllLabels?: any;
  selectedKeys?: any;
  showSearch?: any;
  showSelectAll?: any;
  status?: any;
  targetKeys?: any;
  titles?: any;
  onChange?: (value: any) => void;
}

const Transfer: React.FC<TransferProps> = ({
  api = null,
  dataSource = undefined,
  disabled = undefined,
  selectionsIcon = undefined,
  filterOption = undefined,
  footer = undefined,
  listStyle = undefined,
  locale = undefined,
  oneWay = undefined,
  operations = undefined,
  operationStyle = undefined,
  pagination = undefined,
  selectAllLabels = undefined,
  selectedKeys = undefined,
  showSearch = undefined,
  showSelectAll = undefined,
  status = undefined,
  targetKeys = undefined,
  titles = undefined,
  value = null,
  onChange,
}) => {
  useEffect(() => {}, [value]);

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (value: any) => {
    triggerChange(value);
  };

  return (
    <AntdTransfer
      onChange={onChange}
      onSelectChange={onSelectChange}
      dataSource={dataSource}
      disabled={disabled}
      selectionsIcon={selectionsIcon}
      filterOption={filterOption}
      footer={footer}
      listStyle={listStyle}
      locale={locale}
      oneWay={oneWay}
      operations={operations}
      operationStyle={operationStyle}
      pagination={pagination}
      selectAllLabels={selectAllLabels}
      selectedKeys={selectedKeys}
      showSearch={showSearch}
      showSelectAll={showSelectAll}
      status={status}
      targetKeys={targetKeys}
      titles={titles}
      render={(item) => item.title}
    />
  );
};

export default Transfer;
