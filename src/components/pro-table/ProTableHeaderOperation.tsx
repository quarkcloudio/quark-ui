import { Button, Space } from 'antd';
import type { SpaceProps } from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';

import DragContent from './ProTableDragContent';

interface Props {
  columns: AntDesign.TableColumnCheck[];
  itemAlign?: SpaceProps['align'];
  loading?: boolean;
  refresh: () => void;
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
}

const ProTableHeaderOperation: FC<Props> = ({ columns, itemAlign, loading, refresh, setColumnChecks }) => {
  const { t } = useTranslation();

  return (
    <Space
      wrap
      align={itemAlign}
      className="lt-sm:w-200px"
    >
      <Button
        icon={<IconAntDesignReloadOutlined className={classNames('text-icon', { 'animate-spin': loading })} />}
        size="small"
        onClick={refresh}
      >
        {t('common.refresh')}
      </Button>

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
        <Button
          icon={<IconAntDesignSettingOutlined />}
          size="small"
        >
          {t('common.columnSetting')}
        </Button>
      </APopover>
    </Space>
  );
};

export default ProTableHeaderOperation;
