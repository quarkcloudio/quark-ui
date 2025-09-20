import classNames from 'classnames';
import type { FC } from 'react';

import DragContent from './ProTableDragContent';

interface Props {
  columns: AntDesign.TableColumnCheck[];
  loading?: boolean;
  refresh: () => void;
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
}

const ProTableHeaderOperation: FC<Props> = ({ columns, loading, refresh, setColumnChecks }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
      <AButton
        icon={<IconAntDesignReloadOutlined className={classNames('text-icon', { 'animate-spin': loading })} />}
        size="small"
        onClick={refresh}
      >
        {t('common.refresh')}
      </AButton>

      <APopover
        placement="bottomRight"
        trigger="click"
        content={
          <DragContent
            columns={columns}
            setColumnChecks={setColumnChecks}
          />
        }
      >
        <AButton
          icon={<IconAntDesignSettingOutlined />}
          size="small"
        >
          {t('common.columnSetting')}
        </AButton>
      </APopover>
    </div>
  );
};

export default ProTableHeaderOperation;
