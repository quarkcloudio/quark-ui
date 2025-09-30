interface Props {
  actions?: any[];
  refresh?: () => void;
  selectedRowKeys?: any[];
}

const ProTableToolBar = (props: Props) => {
  const { actions, refresh, selectedRowKeys } = props;

  const batchActionDisabled = (action: any) => {
    if (!action.batch) {
      return false;
    }
    return selectedRowKeys?.length === 0;
  };

  return (
    <div className="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
      {actions?.map(action => (
        <Action
          {...action}
          data={{ id: selectedRowKeys }}
          disabled={batchActionDisabled(action)}
          key={action.componentKey}
          onClick={refresh}
        />
      ))}
    </div>
  );
};

export default ProTableToolBar;
