import tplEngine from '@/utils/template';

interface ActionProps {
  block?: boolean;
  componentkey: string;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  htmlType?: 'button' | 'reset' | 'submit';
  icon?: string;
  label?: string;
  loading?: boolean;
  onClick?: () => void;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Action = (props: ActionProps) => {
  const {
    block,
    componentkey,
    danger,
    data,
    disabled,
    ghost,
    href,
    icon,
    label,
    loading,
    onClick,
    shape,
    size,
    target,
    type
  } = props;

  const { pathname } = useLocation();

  return (
    <AButton
      block={block}
      danger={danger}
      disabled={disabled}
      ghost={ghost}
      href={tplEngine(href, { ...data, enginePath: pathname })}
      key={componentkey}
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
      onClick={onClick}
    >
      {tplEngine(label, data)}
    </AButton>
  );
};

export default Action;
