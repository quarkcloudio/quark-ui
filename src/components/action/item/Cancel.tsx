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
  onClick?: () => void;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Cancel = (props: Props) => {
  const { block, danger, data, disabled, ghost, icon, label, loading, onClick, shape, size, target, type } = props;

  const onClickHandler = () => {
    onClick?.();
  };
  return (
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
      onClick={onClickHandler}
    >
      {tplEngine(label, data)}
    </AButton>
  );
};

export default Cancel;
