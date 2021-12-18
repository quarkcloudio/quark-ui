import React, { useState, useEffect } from 'react';
import { Cascader as AntCascader, Spin } from 'antd';
import { get } from '@/services/action';

export interface Search {
  api?: any;
  size?: any;
  value?: any;
  placeholder?: any;
  style?: any;
  options?: any;
  allowClear?: any;
  onChange?: (value: any) => void;
}

const Cascader: React.FC<Search> = ({
  api = null,
  size = undefined,
  value = null,
  placeholder = null,
  style = [],
  options = [],
  allowClear = false,
  onChange,
}) => {
  const [selectOptions, setSelectOptions] = useState(options);
  const [spinning, setSpinning] = useState(true);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    initOptions();
  }, []);

  const initOptions = async () => {
    if (api) {
      const getOptions = await loadOptions();
      setSelectOptions(getOptions);

      setTimeout(async () => {
        setSpinning(false);
      }, 3000);
    }
  };

  const loadOptions = async (level: any = 0) => {
    const result = await get({
      actionUrl: api,
      search: level === 0 ? 0 : value[level - 1],
      level: level,
    });

    if (value) {
      if (level < value.length) {
        result?.data?.map(async (item: any) => {
          if (item.value === value[level]) {
            return (item['children'] = await loadOptions(level + 1));
          }
        });
      }

      return result['data'];
    } else {
      return result['data'];
    }
  };

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (value: any) => {
    triggerChange(value);
  };

  const loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(async () => {
      targetOption.loading = false;
      const result = await get({
        actionUrl: api,
        search: targetOption.value,
        level: selectedOptions.length,
      });

      targetOption.children = result.data;
      setSelectOptions([...selectOptions]);
      setRandom(Math.random);
    }, 300);
  };

  let getSelectOptions = selectOptions || options;

  if (api) {
    return (
      <Spin spinning={spinning} size="small">
        <AntCascader
          size={size}
          loadData={loadData}
          placeholder={placeholder}
          style={style}
          allowClear={allowClear}
          onChange={onSelectChange}
          value={value}
          options={getSelectOptions}
          changeOnSelect
        />
      </Spin>
    );
  } else {
    return (
      <AntCascader
        size={size}
        placeholder={placeholder}
        style={style}
        allowClear={allowClear}
        onChange={onSelectChange}
        value={value}
        options={getSelectOptions}
      />
    );
  }
};

export default Cascader;
