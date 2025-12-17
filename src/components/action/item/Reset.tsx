import { ExclamationCircleFilled } from '@ant-design/icons';

import { useEngine } from '@/hooks/common/engine';
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
    shape,
    size,
    target,
    type
  } = props;
  const { getEngineFormRef } = useEngine();

  const showConfirm = () => {
    AModal.confirm({
      content: confirmText,
      icon: <ExclamationCircleFilled />,
      async onOk() {
        getEngineFormRef()?.resetFields();
      },
      title: confirmTitle
    });
  };

  const onClickHandler = async () => {
    if (confirmType === 'modal') {
      showConfirm();
      return;
    }
    getEngineFormRef()?.resetFields();
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
