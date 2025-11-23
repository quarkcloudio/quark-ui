import { Cascader as AntCascader, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { fetchCascaderOptions } from '@/service/api';

export interface CascaderProps {
  allowClear?: any;
  api?: any;
  onChange?: (value: any) => void;
  options?: any;
  placeholder?: any;
  size?: any;
  style?: any;
  value?: any;
}

const Cascader: React.FC<CascaderProps> = ({
  allowClear = false,
  api = null,
  onChange,
  options = [],
  placeholder = null,
  size = undefined,
  style = [],
  value = null
}) => {
  const [selectOptions, setSelectOptions] = useState(options);
  const [level, setLevel] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const [random, setRandom] = useState(0);

  const loadOptions = async (newLevel: any = 0) => {
    const result = await fetchCascaderOptions(api, {
      level: newLevel,
      search: newLevel === 0 ? 0 : value[newLevel - 1]
    });

    const data = result.data;
    setLevel(newLevel);
    if (!value) {
      return data;
    }
    if (newLevel >= value.length) {
      return [];
    }

    await Promise.all(
      data?.map(async (item: any) => {
        if (item.value === value[newLevel]) {
          const children = await loadOptions(newLevel + 1);
          if (children?.length > 0) {
            item.children = children;
            return item;
          }
        }
        return undefined;
      })
    );

    return data;
  };

  const initOptions = async () => {
    setSpinning(true);
    if (api) {
      const getOptions = await loadOptions();
      setSelectOptions(getOptions);
    }
    setSpinning(false);
  };

  const initValueOptions = async () => {
    setSpinning(true);
    if (api && value && level < value.length - 1) {
      const getOptions = await loadOptions();
      setSelectOptions(getOptions);
    }
    setSpinning(false);
  };

  useEffect(() => {
    initOptions();
  }, []);

  useEffect(() => {
    initValueOptions();
  }, [value]);

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (changedValue: any) => {
    triggerChange(changedValue);
  };

  const loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(async () => {
      targetOption.loading = false;
      const result = await fetchCascaderOptions(api, {
        level: selectedOptions.length,
        search: targetOption.value
      });

      targetOption.children = result.data;
      setSelectOptions([...selectOptions]);
      setRandom(Math.random);
      console.log(random);
    }, 300);
  };

  const getSelectOptions = selectOptions || options;

  if (api) {
    return (
      <Spin
        size="small"
        spinning={spinning}
        style={{ background: 'rgba(255,255,255,0.8)', ...style }}
      >
        <AntCascader
          changeOnSelect
          allowClear={allowClear}
          loadData={loadData}
          options={getSelectOptions}
          placeholder={placeholder}
          size={size}
          style={style}
          value={value}
          onChange={onSelectChange}
        />
      </Spin>
    );
  }
  return (
    <AntCascader
      allowClear={allowClear}
      options={getSelectOptions}
      placeholder={placeholder}
      size={size}
      style={style}
      value={value}
      onChange={onSelectChange}
    />
  );
};

export default Cascader;
