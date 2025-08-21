import clsx from 'clsx';

import style from './footer.module.scss';

const SearchFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <ADivider className="my-2px" />
      <div className="h-44px flex-center gap-14px">
        <span className="flex-y-center">
          <IconMdiKeyboardReturn className={clsx(style['operate-shadow'], style['operate-item'])} />
          <span>{t('common.confirm')}</span>
        </span>
        <span className="flex-y-center">
          <IconMdiArrowUpThin className={clsx(style['operate-shadow'], style['operate-item'])} />
          <IconMdiArrowDownThin className={clsx(style['operate-shadow'], style['operate-item'])} />
          <span>{t('common.switch')}</span>
        </span>
        <span className="flex-y-center">
          <IconMdiKeyboardEsc className={clsx(['operate-shadow'], style['operate-item'])} />
          <span>{t('common.close')}</span>
        </span>
      </div>
    </>
  );
};

export default memo(SearchFooter);
