interface ProFormDependencyProps {
  children?: (values: any) => React.ReactNode;
  name?: string[];
  onChange?: (val: any) => void;
}

const ProFormDependency = (props: ProFormDependencyProps) => {
  const { children, name } = props;
  const { getEngineFormRef } = useEngine();

  return (
    <AForm.Item
      noStyle={true}
      shouldUpdate={true}
    >
      {() => children?.(getEngineFormRef()?.getFieldsValue(name))}
    </AForm.Item>
  );
};

export default ProFormDependency;
