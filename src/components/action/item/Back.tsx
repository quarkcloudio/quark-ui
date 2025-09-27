import { useRouter } from '@/features/router';
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
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Back = (props: Props) => {
  const { block, danger, data, disabled, ghost, icon, label, shape, size, target, type } = props;
  const { go } = useRouter();

  const onClick = () => {
    go(-1);
  };
  return (
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
      onClick={onClick}
    >
      {tplEngine(label, data)}
    </AButton>
  );
};

export default Back;
