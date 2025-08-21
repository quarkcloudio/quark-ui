import ButtonIcon from '@/components/ButtonIcon';

import { useLang } from './langContext';

interface Props {
  className?: string;
  /** Show tooltip */
  showTooltip?: boolean;
}

const LangSwitch: FC<Props> = memo(({ className, showTooltip = true }) => {
  const { t } = useTranslation();

  const { locale, localeOptions, setLocale } = useLang();

  const tooltipContent = showTooltip ? t('icon.lang') : '';

  function changeLocales({ key }: { key: string }) {
    setLocale(key as App.I18n.LangType);
  }

  return (
    <ADropdown menu={{ items: localeOptions, onClick: changeLocales, selectedKeys: [locale] }}>
      <div>
        <ButtonIcon
          className={className}
          icon="heroicons:language"
          tooltipContent={tooltipContent}
          tooltipPlacement="left"
        />
      </div>
    </ADropdown>
  );
});

export default LangSwitch;
