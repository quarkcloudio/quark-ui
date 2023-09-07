import React, { useState, useEffect } from 'react';
import { Transfer as AntdTransfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
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
  showSearch = undefined,
  showSelectAll = undefined,
  status = undefined,
  titles = undefined,
  value = null,
  onChange,
}) => {
  useEffect(() => {
    setTargetKeys(value)
  }, [value]);

  const [targetKeys, setTargetKeys] = useState(value);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onTransferChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
    triggerChange(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  return (
    <AntdTransfer
      onChange={onTransferChange}
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
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      showSearch={showSearch}
      showSelectAll={showSelectAll}
      status={status}
      titles={titles}
      render={(item) => item.title}
    />
  );
};

export default Transfer;
