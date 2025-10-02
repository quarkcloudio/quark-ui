import { ExclamationCircleFilled } from '@ant-design/icons';

import { useEngine } from '@/hooks/common/engine';
import { fetchPostForm } from '@/service/api';
import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
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

const Submit = (props: Props) => {
  const {
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
  const { getEngineFormApi, getEngineFormRef } = useEngine();

  const showConfirm = () => {
    AModal.confirm({
      content: confirmText,
      icon: <ExclamationCircleFilled />,
      async onOk() {
        if (getEngineFormApi()) {
          setLoading(true);
          const values = getEngineFormRef()?.getFieldsValue();
          console.log(values);
          const res = await fetchPostForm(tplEngine(getEngineFormApi(), data), values);
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
    if (getEngineFormApi()) {
      setLoading(true);
      const values = getEngineFormRef()?.getFieldsValue();
      console.log(values);
      const res = await fetchPostForm(tplEngine(getEngineFormApi(), data), values);
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

export default Submit;
