interface ProFormIconProps {
  onChange?: (val: any) => void;
  value?: any;
}

const ProFormFile = (props: ProFormIconProps) => {
  const { onChange } = props;

  /** 更新值 */
  const updateValue = (newValue: any) => {
    onChange?.(newValue);
  };

  return <div onChange={updateValue} />;
};

export default ProFormFile;
