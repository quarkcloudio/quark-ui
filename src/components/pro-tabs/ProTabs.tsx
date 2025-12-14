interface Props {
  body?: any;
  componentkey: string;
  extra?: any[];
  title?: string;
}

const ProTabs = (props: Props) => {
  const { body, componentkey, extra, title } = props;

  return (
    <ACard
      key={componentkey}
      title={title}
      extra={extra?.map(item => (
        <Action
          {...item}
          key={item.component}
        />
      ))}
    >
      <Render body={body} />
    </ACard>
  );
};

export default ProTabs;
