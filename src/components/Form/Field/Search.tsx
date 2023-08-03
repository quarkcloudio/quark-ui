import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from '@/services/action';

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

export interface SearchProps {
  api?: any;
  size?: any;
  mode?: any;
  value?: any;
  placeholder?: any;
  style?: any;
  options?: any;
  allowClear?: any;
  onChange?: (value: any) => void;
}

const Search: React.FC<SearchProps> = ({
  api = null,
  mode = undefined,
  size = undefined,
  value = null,
  placeholder = null,
  style = [],
  options = [],
  allowClear = false,
  onChange,
}) => {
  const [selectOptions, setSelectOptions] = useState(undefined);
  const [loading, setLoading] = useState(false);
  let getSelectOptions = selectOptions || options;

  useEffect(() => {
    if (
      value &&
      (getSelectOptions?.length === 0 || getSelectOptions === null)
    ) {
      setLoading(true);
      onInputSearch(value, 'value');
    } else if (value && getSelectOptions?.length > 0) {
      if (getSelectOptions.indexOf(value) === -1) {
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

  const onSelectChange = (value: any) => {
    triggerChange(value);
  };

  const onInputSearch = (value: any, type = 'label') => {
    let timeout: any = null;

    if(!api) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      setLoading(false);
      return;
    }

    if (value) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      timeout = setTimeout(async function () {
        const result = await get({
          url: api,
          data: {
            search: value,
            type: type,
          },
        });
        setSelectOptions(result.data);
        setLoading(false);
      }, 300);
    }
  };

  return (
    <Spin size="small" indicator={antIcon} style={style} spinning={loading}>
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        mode={mode}
        size={size}
        filterOption={false}
        onSearch={(value: any) => onInputSearch(value)}
        placeholder={placeholder}
        style={style}
        allowClear={allowClear}
        onChange={onSelectChange}
        value={value ? value : undefined}
        notFoundContent={null}
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
    </Spin>
  );
};

export default Search;
