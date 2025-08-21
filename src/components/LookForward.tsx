import type { PropsWithChildren } from 'react';

import SvgIcon from './SvgIcon';

const LookForward = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  return (
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="expectation" />
      </div>

      {children || <h3 className="text-28px text-primary font-500">{t('common.lookForward')}</h3>}
    </div>
  );
};

export default LookForward;
