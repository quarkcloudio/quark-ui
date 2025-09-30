import { ExclamationCircleFilled } from '@ant-design/icons';

import { fetchAjaxAction } from '@/service/api';
import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
  api?: string;
  block?: boolean;
  confirmText?: string;
  confirmTitle?: string;
  confirmType?: string;
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
  const {
    api,
    block,
    confirmText,
    confirmTitle,
    confirmType,
    danger,
    data,
    disabled,
    ghost,
    icon,
    label,
    onClick,
    shape,
    size,
    target,
    type
  } = props;
  const [loading, setLoading] = useState(false);

  const showConfirm = () => {
    AModal.confirm({
      content: confirmText,
      icon: <ExclamationCircleFilled />,
      async onOk() {
        if (api) {
          setLoading(true);
          const res = await fetchAjaxAction(tplEngine(api, data));
          setLoading(false);
          if (!res.error) {
            onClick?.();
          }
        }
      },
      title: confirmTitle
    });
  };

  const onClickHandler = async () => {
    if (confirmType === 'modal') {
      showConfirm();
      return;
    }
    if (api) {
      setLoading(true);
      const res = await fetchAjaxAction(tplEngine(api, data));
      setLoading(false);
      if (!res.error) {
        onClick?.();
      }
    }
  };

  if (confirmType === 'pop') {
    return (
      <APopconfirm
        description={confirmText}
        title={confirmTitle}
        onConfirm={onClickHandler}
      >
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
        >
          {tplEngine(label, data)}
        </AButton>
      </APopconfirm>
    );
  }

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
