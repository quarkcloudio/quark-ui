import tplEngine from '@/utils/template';

import Back from './item/Back';

interface ActionProps {
  actionType?: string;
  block?: boolean;
  componentkey: string;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  drawer?: any;
  ghost?: boolean;
  href?: string;
  htmlType?: 'button' | 'reset' | 'submit';
  icon?: string;
  label?: string;
  loading?: boolean;
  modal?: any;
  onClick?: () => void;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Action = (props: ActionProps) => {
  const {
    actionType,
    block,
    componentkey,
    danger,
    data,
    disabled,
    drawer,
    ghost,
    href,
    icon,
    label,
    loading,
    modal,
    onClick,
    shape,
    size,
    target,
    type
  } = props;

  const { pathname } = useLocation();

  switch (actionType) {
    case 'back':
      return (
        <Back
          block={block}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          loading={loading}
          shape={shape}
          size={size}
          target={target}
          type={type}
        />
      );

    case 'cancel':
      return (
        <Cancel
          block={block}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          loading={loading}
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
        />
      );
    case 'link':
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
        >
          {tplEngine(label, data)}
        </AButton>
      );

    case 'modal':
      return (
        <Modal
          block={block}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          loading={loading}
          modal={modal}
          shape={shape}
          size={size}
          target={target}
          type={type}
        />
      );

    case 'drawer':
      return (
        <Drawer
          block={block}
          danger={danger}
          data={data}
          disabled={disabled}
          drawer={drawer}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          loading={loading}
          shape={shape}
          size={size}
          target={target}
          type={type}
        />
      );

    default:
      return (
        <AButton
          block={block}
          danger={danger}
          disabled={disabled}
          ghost={ghost}
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
  }
};

export default Action;
