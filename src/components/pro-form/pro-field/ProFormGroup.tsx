interface ProFormGroupProps {
  children?: any;
}

const ProFormGroup = (props: ProFormGroupProps) => {
  const { children } = props;

  return <ASpace>{children}</ASpace>;
};

export default ProFormGroup;
