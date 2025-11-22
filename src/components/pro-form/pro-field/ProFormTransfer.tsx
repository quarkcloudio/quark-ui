import { Transfer } from 'antd';
import type { TransferDirection, TransferItem } from 'antd/es/transfer';
import React, { useEffect, useState } from 'react';
import type { Key } from 'react';

export interface TransferProps {
  api?: any;
  dataSource?: TransferItem[];
  disabled?: boolean;
  filterOption?: any;
  footer?: any;
  listStyle?: any;
  locale?: any;
  onChange?: (value: Key[]) => void;
  oneWay?: boolean;
  operations?: string[];
  operationStyle?: any;
  pagination?: any;
  selectAllLabels?: any;
  selectedKeys?: Key[];
  selectionsIcon?: any;
  showSearch?: boolean;
  showSelectAll?: boolean;
  status?: any;
  targetKeys?: Key[];
  titles?: string[];
  value?: any;
}

const ProFormTransfer: React.FC<TransferProps> = ({
  dataSource = [],
  disabled = false,
  filterOption = undefined,
  footer = undefined,
  listStyle = undefined,
  locale = undefined,
  onChange,
  oneWay = false,
  operations = [],
  operationStyle = undefined,
  pagination = undefined,
  selectAllLabels = undefined,
  selectionsIcon = undefined,
  showSearch = false,
  showSelectAll = true,
  status = undefined,
  titles = ['', ''],
  value = []
}) => {
  const [targetKeys, setTargetKeys] = useState<Key[]>(value);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  useEffect(() => {
    setTargetKeys(value);
  }, [value]);

  const triggerChange = (changedValue: Key[]) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onTransferChange = (nextTargetKeys: Key[], direction: TransferDirection, moveKeys: Key[]) => {
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    triggerChange(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: Key[], targetSelectedKeys: Key[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={dataSource}
      disabled={disabled}
      filterOption={filterOption}
      footer={footer}
      listStyle={listStyle}
      locale={locale}
      oneWay={oneWay}
      operations={operations}
      operationStyle={operationStyle}
      pagination={pagination}
      render={item => item.title || ''}
      selectAllLabels={selectAllLabels}
      selectedKeys={selectedKeys}
      selectionsIcon={selectionsIcon}
      showSearch={showSearch}
      showSelectAll={showSelectAll}
      status={status}
      targetKeys={targetKeys}
      titles={titles}
      onChange={onTransferChange}
      onSelectChange={onSelectChange}
    />
  );
};

export default ProFormTransfer;
