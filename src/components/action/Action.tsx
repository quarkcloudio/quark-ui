import tplEngine from '@/utils/template';

import Back from './item/Back';

interface ActionProps {
  actionType?: string;
  api?: string;
  block?: boolean;
  componentkey: string;
  confirmText?: string;
  confirmTitle?: string;
  confirmType?: string;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  drawer?: any;
  ghost?: boolean;
  href?: string;
  htmlType?: 'button' | 'reset' | 'submit';
  icon?: string;
  label?: string;
  modal?: any;
  onClick?: () => void;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
  checkedChildren?: string;
  unCheckedChildren?: string;
  fieldName?: string;
  fieldValue?: any;
}

const Action = (props: ActionProps) => {
  const {
    actionType,
    api,
    block,
    componentkey,
    confirmText,
    confirmTitle,
    confirmType,
    danger,
    data,
    disabled,
    drawer,
    ghost,
    href,
    icon,
    label,
    modal,
    onClick,
    shape,
    size,
    target,
    type,
    checkedChildren,
    unCheckedChildren,
    fieldName,
    fieldValue,
  } = props;

  const { pathname } = useLocation();

  switch (actionType) {
    case 'ajax':
      return (
        <Ajax
          api={api}
          block={block}
          confirmText={confirmText}
          confirmTitle={confirmTitle}
          confirmType={confirmType}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
        />
      );
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
          modal={modal}
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
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
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
        />
      );

    case 'submit':
      return (
        <Submit
          block={block}
          confirmText={confirmText}
          confirmTitle={confirmTitle}
          confirmType={confirmType}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
        />
      );

    case 'reset':
      return (
        <Reset
          block={block}
          confirmText={confirmText}
          confirmTitle={confirmTitle}
          confirmType={confirmType}
          danger={danger}
          data={data}
          disabled={disabled}
          ghost={ghost}
          icon={icon}
          key={componentkey}
          label={label}
          shape={shape}
          size={size}
          target={target}
          type={type}
          onClick={onClick}
        />
      );

      case 'switch':
        return (
          <Switch
            api={api}
            confirmText={confirmText}
            confirmTitle={confirmTitle}
            confirmType={confirmType}
            checkedChildren={checkedChildren}
            data={data}
            fieldName={fieldName}
            fieldValue={fieldValue}
            unCheckedChildren={unCheckedChildren}
            key={componentkey}
            size={size}
            onClick={onClick}
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
