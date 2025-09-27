interface Props {
  actions?: any[];
  refresh?: () => void;
}

const ProTableToolBar = (props: Props) => {
  const { actions, refresh } = props;

  return (
    <div className="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
      {actions?.map(action => (
        <Action
          {...action}
          key={action.componentKey}
          onClick={refresh}
        />
      ))}
    </div>
  );
};

export default ProTableToolBar;
