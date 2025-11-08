import type { SelectProps } from 'antd';

interface ProFormIconProps {
  onChange?: (val: any) => void;
  opttions?: string[];
  value?: any;
}

const ProFormIcon = (props: ProFormIconProps & SelectProps) => {
  const { allowClear, defaultValue, disabled, onChange, options, placeholder, showSearch, size, style, value } = props;

  /** 更新值 */
  const updateValue = (newValue: any) => {
    onChange?.(newValue);
  };

  return (
    <ASelect
      allowClear={allowClear}
      defaultValue={defaultValue}
      disabled={disabled}
      options={undefined}
      placeholder={placeholder}
      showSearch={showSearch}
      size={size}
      style={style}
      value={value}
      onChange={updateValue}
    >
      {options?.map?.((item: any) => {
        return (
          <ASelect.Option
            key={item}
            value={item}
          >
            <div className="flex items-center gap-2">
              <SvgIcon icon={item} /> {item.replace('ant-design:', '').replace('-outlined', '')}
            </div>
          </ASelect.Option>
        );
      })}
    </ASelect>
  );
};

export default ProFormIcon;
