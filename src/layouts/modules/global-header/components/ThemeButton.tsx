import { openThemeDrawer } from '@/layouts/appStore';

const ThemeButton = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(openThemeDrawer());
  }

  return (
    <ButtonIcon
      triggerParent
      className="px-12px"
      icon="majesticons:color-swatch-line"
      tooltipContent={t('icon.themeConfig')}
      onClick={handleClick}
    />
  );
});

export default ThemeButton;
