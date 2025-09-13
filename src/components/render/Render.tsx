interface RenderProps {
  component?: string;
}

const Render = (props: RenderProps) => {
  const { component } = props;

  return <div className="h-full">{component}</div>;
};

export default Render;
