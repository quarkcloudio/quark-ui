declare namespace Page {
  type FormInstance = import('antd').FormInstance;

  interface SearchProps {
    form: FormInstance;
    reset: () => void;
    search: () => void;
    searchParams: Record<string, any>;
  }

  interface OperateDrawerProps {
    form: FormInstance;
    handleSubmit: () => void;
    onClose: () => void;
    open: boolean;
    operateType: AntDesign.TableOperateType;
  }
}
