import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
  block?: boolean;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  ghost?: boolean;
  icon?: string;
  label?: string;
  loading?: boolean;
  modal?: any;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Modal = (props: Props) => {
  const { block, danger, data, disabled, ghost, icon, label, loading, modal, shape, size, target, type } = props;
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <AModal
        closable={{ 'aria-label': 'Close Button' }}
        {...modal}
        open={open}
        footer={
          <ASpace>
            {modal?.actions?.map((action: any) => (
              <Action
                key={action.componentkey}
                {...action}
              />
            ))}
          </ASpace>
        }
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Render body={modal.body} />
      </AModal>
      <AButton
        block={block}
        danger={danger}
        disabled={disabled}
        ghost={ghost}
        loading={loading}
        shape={shape}
        size={size}
        target={target}
        type={type}
        icon={
          icon && (
            <SvgIcon
              className="text-icon"
              icon={icon}
            />
          )
        }
        onClick={showModal}
      >
        {tplEngine(label, data)}
      </AButton>
    </>
  );
};

export default Modal;
