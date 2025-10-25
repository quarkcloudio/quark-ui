interface ProFormIconProps {
  fieldProps?: any;
  onChange?: (val: any) => void;
  value?: any;
}

const ProFormIcon = (props: ProFormIconProps) => {
  const { fieldProps, onChange, value } = props;

  /** 更新值 */
  const updateValue = (val: any) => {
    onChange?.(val);
  };

  return (
    <ASelect
      {...fieldProps}
      options={undefined}
      value={value?.value}
      onChange={e => updateValue(e.target.value)}
    >
      {fieldProps?.options?.map?.((item: any) => {
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
