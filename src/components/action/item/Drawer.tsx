import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
  block?: boolean;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  drawer?: any;
  ghost?: boolean;
  icon?: string;
  label?: string;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Drawer = (props: Props) => {
  const { block, danger, data, disabled, drawer, ghost, icon, label, shape, size, target, type } = props;
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
        {...drawer}
        open={open}
        footer={
          <ASpace>
            {drawer?.actions?.map((action: any) => (
              <Action
                key={action.componentkey}
                {...action}
                onClick={onClose}
              />
            ))}
          </ASpace>
        }
        onClose={onClose}
      >
        <Render body={drawer.body} />
      </ADrawer>
      <AButton
        block={block}
        danger={danger}
        disabled={disabled}
        ghost={ghost}
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
