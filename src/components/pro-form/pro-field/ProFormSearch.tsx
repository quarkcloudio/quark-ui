import { LoadingOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { fetchSearchOptions } from '@/service/api';

const antIcon = (
  <LoadingOutlined
    spin
    style={{ fontSize: 14 }}
  />
);

export interface SearchProps {
  allowClear?: any;
  api?: any;
  mode?: any;
  onChange?: (value: any) => void;
  options?: any;
  placeholder?: any;
  size?: any;
  style?: any;
  value?: any;
}

const Search: React.FC<SearchProps> = ({
  allowClear = false,
  api = null,
  mode = undefined,
  onChange,
  options = [],
  placeholder = null,
  size = undefined,
  style = [],
  value = null
}) => {
  const [selectOptions, setSelectOptions] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const getSelectOptions = selectOptions || options;

  const onInputSearch = (searchValue: any, type = 'label') => {
    let timeout: any = null;

    if (!api) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      setLoading(false);
      return;
    }

    if (searchValue) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      timeout = setTimeout(async function handleSearch() {
        const result: any = await fetchSearchOptions(api, {
          search: searchValue,
          type
        });
        setSelectOptions(result.data);
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (value && (getSelectOptions?.length === 0 || getSelectOptions === null)) {
      setLoading(true);
      onInputSearch(value, 'value');
    } else if (value && getSelectOptions?.length > 0) {
      if (!getSelectOptions.includes(value)) {
        setLoading(true);
        onInputSearch(value, 'value');
      }
    }
  }, [value]);

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (newValue: any) => {
    triggerChange(newValue);
  };

  return (
    <Spin
      indicator={antIcon}
      size="small"
      spinning={loading}
      style={style}
    >
      <Select
        showSearch
        allowClear={allowClear}
        defaultActiveFirstOption={false}
        filterOption={false}
        mode={mode}
        notFoundContent={null}
        placeholder={placeholder}
        showArrow={false}
        size={size}
        style={style}
        value={value || undefined}
        onChange={onSelectChange}
        onSearch={(searchValue: any) => onInputSearch(searchValue)}
      >
        {Boolean(getSelectOptions) &&
          getSelectOptions.map((option: any) => {
            return (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            );
          })}
      </Select>
    </Spin>
  );
};

export default Search;
