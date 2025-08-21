import { createContext } from 'react';

import { globalConfig } from '@/config';

export type LangContextType = {
  locale: App.I18n.LangType;
  localeOptions: App.I18n.LangOption[];
  setLocale: (locale: App.I18n.LangType) => void;
};

export const LangContext = createContext<LangContextType>({
  locale: globalConfig.defaultLang,
  localeOptions: globalConfig.defaultLangOptions,
  setLocale: globalConfig.noop
});

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }

  return context;
}
