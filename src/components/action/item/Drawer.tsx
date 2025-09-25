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
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Drawer = (props: Props) => {
  const { block, danger, data, disabled, ghost, icon, label, loading, shape, size, target, type } = props;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ADrawer
        closable={{ 'aria-label': 'Close Button' }}
        open={open}
        title="Basic Drawer"
        onClose={onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ADrawer>
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
        onClick={showDrawer}
      >
        {tplEngine(label, data)}
      </AButton>
    </>
  );
};

export default Drawer;
