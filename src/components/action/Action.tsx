interface ActionProps {
  component: string;
}

const Action = (props: ActionProps) => {
  const { component } = props;

  return <div>{component}</div>;
};

export default Action;
