interface Props {
  body?: any;
  componentkey: string;
  data?: any;
  extra?: any[];
  title?: string;
}

const ProCard = (props: Props) => {
  const { body, componentkey, data, extra, title } = props;

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
      <Render
        body={body}
        data={data}
      />
    </ACard>
  );
};

export default ProCard;
