import { fetchAjaxAction } from '@/service/api';
import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
  api?: string;
  block?: boolean;
  danger?: boolean;
  data?: Record<string, any>;
  disabled?: boolean;
  ghost?: boolean;
  icon?: string;
  label?: string;
  onClick?: () => void;
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  target?: '_blank' | '_parent' | '_self' | '_top';
  type?: 'dashed' | 'default' | 'link' | 'primary' | 'text';
}

const Ajax = (props: Props) => {
  const { api, block, danger, data, disabled, ghost, icon, label, onClick, shape, size, target, type } = props;
  const [loading, setLoading] = useState(false);
  const onClickHandler = async () => {
    if (api) {
      setLoading(true);
      const res = await fetchAjaxAction(api);
      setLoading(false);
      if (!res.error) {
        console.log(res.data);
        onClick?.();
      }
    }
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

export default Ajax;
