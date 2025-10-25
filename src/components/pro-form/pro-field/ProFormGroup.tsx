interface ProFormGroupProps {
  children?: any;
}

const ProFormGroup = (props: ProFormGroupProps) => {
  const { children } = props;

  return (
    <div>
      <ASpace size={[32, 0]}>{children}</ASpace>
    </div>
  );
};

export default ProFormGroup;
