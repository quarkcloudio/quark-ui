interface Props {
  actions?: any[];
}

const ProTableToolBar = (props: Props) => {
  const { actions } = props;

  return (
    <div className="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
      {actions?.map(action => (
        <Action
          {...action}
          key={action.component}
        />
      ))}
    </div>
  );
};

export default ProTableToolBar;
