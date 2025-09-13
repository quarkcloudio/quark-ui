interface EngineProps {
  api: string;
}

const Engine = (props: EngineProps) => {
  const { api } = props;

  return <div className="h-full">{api}</div>;
};

export default Engine;
