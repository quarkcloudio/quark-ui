interface ProFormDependencyProps {
  children?: (values: any) => React.ReactNode;
  name?: string[];
}

const ProFormDependency = (props: ProFormDependencyProps) => {
  const { children, name } = props;
  const { getEngineFormRef } = useEngine();
  return children?.(getEngineFormRef()?.getFieldsValue(name));
};

export default ProFormDependency;
