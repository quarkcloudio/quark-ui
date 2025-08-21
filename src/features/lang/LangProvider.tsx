import type { FC, PropsWithChildren } from 'react';

import { globalConfig } from '@/config';
import { setLng } from '@/locales';
import { localStg } from '@/utils/storage';

import { LangContext } from './langContext';

const LangProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<App.I18n.LangType>(globalConfig.defaultLang);

  function changeLocale(lang: App.I18n.LangType) {
    setLng(lang);

    setLocale(lang);

    localStg.set('lang', lang);
  }

  return (
    <LangContext
      value={{
        locale,
        localeOptions: globalConfig.defaultLangOptions,
        setLocale: changeLocale
      }}
    >
      {children}
    </LangContext>
  );
};

export default LangProvider;
