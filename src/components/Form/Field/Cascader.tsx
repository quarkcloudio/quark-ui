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
      setSpinning(false);
    }
  };

  const loadOptions = async (level: any = 0) => {
    const result = await get({
      url: api,
      data: {
        search: level === 0 ? 0 : value[level - 1],
        level: level,
      },
    });

    let data = result.data;
    if(!value) {
      return data
    }
    if (level >= value.length) {
      return []
    }

    await Promise.all(
      data?.map(async (item: any) => {
        if (item.value === value[level]) {
          let children = await loadOptions(level + 1);
          if (children.length > 0) {
            return (item.children = children);
          }
        }
      }),
    );

    return data
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
        url: api,
        data: {
          search: targetOption.value,
          level: selectedOptions.length,
        }
      });

      targetOption.children = result.data;
      setSelectOptions([...selectOptions]);
      setRandom(Math.random);
    }, 300);
  };

  let getSelectOptions = selectOptions || options;

  if (api) {
    return (
      <Spin style={{background: "rgba(255,255,255,0.8)", ...style}} spinning={spinning} size="small">
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
