import { ExclamationCircleFilled } from '@ant-design/icons';

import { fetchAjaxAction } from '@/service/api';
import tplEngine from '@/utils/template';

interface Props {
  actionType?: string;
  api?: string;
  checkedChildren?: string;
  confirmText?: string;
  confirmTitle?: string;
  confirmType?: string;
  data?: Record<string, any>;
  fieldName?: string;
  fieldValue: any;
  onClick?: () => void;
  size?: any;
  unCheckedChildren?: string;
}

const Switch = (props: Props) => {
  const {
    api,
    checkedChildren,
    confirmText,
    confirmTitle,
    confirmType,
    data,
    fieldName,
    fieldValue,
    onClick,
    size,
    unCheckedChildren
  } = props;
  const [loading, setLoading] = useState(false);

  const showConfirm = (checked: boolean) => {
    AModal.confirm({
      content: tplEngine(confirmText, data),
      icon: <ExclamationCircleFilled />,
      async onOk() {
        if (api) {
          setLoading(true);
          const res = await fetchAjaxAction(`${tplEngine(api, data)}&${fieldName}=${checked}`);
          setLoading(false);
          if (!res.error) {
            onClick?.();
          }
        }
      },
      title: tplEngine(confirmTitle, data)
    });
  };

  const onClickHandler = async (checked: boolean) => {
    if (confirmType === 'modal') {
      showConfirm(checked);
      return;
    }
    if (api) {
      setLoading(true);
      const res = await fetchAjaxAction(`${tplEngine(api, data)}&${fieldName}=${checked}`);
      setLoading(false);
      if (!res.error) {
        onClick?.();
      }
    }
  };

  return (
    <ASwitch
      checkedChildren={checkedChildren}
      loading={loading}
      size={size}
      unCheckedChildren={unCheckedChildren}
      checked={
        data?.[fieldName || ''] && fieldValue == data[fieldName || ''] // eslint-disable-line eqeqeq
      }
      onChange={(checked: boolean) => {
        onClickHandler(checked);
      }}
    />
  );
};

export default Switch;
