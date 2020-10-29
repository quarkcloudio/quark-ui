import React, { useState } from 'react';
import { Select } from 'antd';
import { get } from '@/services/action';

export interface Search {
  api?:any;
  size?: any;
  mode?: any;
  value?: any;
  placeholder?:any;
  style?:any;
  options?:any;
  allowClear?:any;
  onChange?:(value: any) => void;
}

const Search: React.FC<Search> = ({ api=null, mode=undefined, size=undefined, value=null, placeholder=null, style=[], options=[],allowClear=false, onChange }) => {
  const [selectOptions, setSelectOptions] = useState(undefined);
  
  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange({...value, ...changedValue });
    }
  };

  const onSelectChange = (value:any) => {
    triggerChange({ ...value });
  };

  const onInputSearch = (value: any) => {
    let timeout: any = null;

    if (value) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      timeout = setTimeout(async function() {
        const result = await get({
          actionUrl: api,
          search: value,
        });
        setSelectOptions(result.data)
      }, 300);
    }
  };

  let  getSelectOptions = selectOptions||options;

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      mode={mode}
      size={size}
      filterOption={false}
      onSearch={(value: any) => onInputSearch(value)}
      placeholder={placeholder}
      style={style}
      allowClear={allowClear}
      onChange={onSelectChange}
    >
      {!!getSelectOptions &&
        getSelectOptions.map((option: any) => {
          return (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          );
        })}
    </Select>
  );
}

export default Search;