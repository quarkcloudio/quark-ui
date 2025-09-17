import SystemLogo from '@/components/common/SystemLogo';
import { LangSwitch } from '@/features/lang';
import { ThemeSchemaSwitch } from '@/features/theme';

const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <header className="flex-y-center justify-between">
      <SystemLogo className="h-64px w-64px text-primary lt-sm:h-48px lt-sm:w-48px" />

      <h3 className="text-28px text-primary font-500 lt-sm:text-22px">{t('system.title')}</h3>

      <div className="i-flex-col">
        <ThemeSchemaSwitch
          className="text-20px lt-sm:text-18px"
          showTooltip={false}
        />
        <LangSwitch showTooltip={false} />
      </div>
    </header>
  );
});

export default Header;
