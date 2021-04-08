import React, { useState } from 'react';
import { Cascader as AntCascader } from 'antd';
import { get } from '@/services/action';

export interface Search {
  api?:any;
  size?: any;
  value?: any;
  placeholder?:any;
  style?:any;
  options?:any;
  allowClear?:any;
  onChange?:(value: any) => void;
}

const Cascader: React.FC<Search> = ({ api=null, size=undefined, value=null, placeholder=null, style=[], options=[],allowClear=false, onChange }) => {
  const [selectOptions, setSelectOptions] = useState(options);
  //hack
  const [random, setRandom] = useState(0);
  
  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (value:any) => {
    triggerChange(value);
  };

  const loadData = (selectedOptions:any) => {
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
      setSelectOptions(selectOptions);
      setRandom(Math.random);
    }, 300);
  };

  let getSelectOptions = selectOptions || options;

  if(api) {
    return (
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
}

export default Cascader;