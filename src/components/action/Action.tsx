import tplEngine from '@/utils/template';

interface ActionProps {
  block?: boolean;
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
  const { block, danger, data, disabled, ghost, href, label, loading, onClick, shape, size, target, type } = props;

  return (
    <AButton
      block={block}
      danger={danger}
      disabled={disabled}
      ghost={ghost}
      href={href}
      loading={loading}
      shape={shape}
      size={size}
      target={target}
      type={type}
      onClick={onClick}
    >
      {tplEngine(label, data)}
    </AButton>
  );
};

export default Action;
