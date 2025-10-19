interface ProFormDependencyProps {
  children?: (values: any) => React.ReactNode;
  name?: string[];
}

const ProFormDependency = (props: ProFormDependencyProps) => {
  const { children, name } = props;
  const { getEngineFormRef } = useEngine();
  const [formValues, setFormValues] = useState<any>({});

  useEffect(() => {
    setFormValues(getEngineFormRef()?.getFieldsValue(name));
  }, []);

  return children?.(formValues);
};

export default ProFormDependency;
