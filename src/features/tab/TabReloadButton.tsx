import ButtonIcon from '@/components/custom/ButtonIcon';
import { useReloadPage } from '@/layouts/layoutHook';

const TabReloadButton = () => {
  const { t } = useTranslation();

  const { isReload, reloadPage } = useReloadPage();

  return (
    <ButtonIcon
      tooltipContent={t('icon.reload')}
      onClick={reloadPage}
    >
      <IconAntDesignReloadOutlined className={isReload ? 'animate-spin animate-duration-750' : ''} />
    </ButtonIcon>
  );
};

export default TabReloadButton;
