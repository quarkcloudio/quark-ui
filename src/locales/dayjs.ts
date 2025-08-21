import { locale } from 'dayjs';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { globalConfig } from '@/config';

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale() {
  const localMap = {
    'en-US': 'en',
    'zh-CN': 'zh-cn'
  } satisfies Record<App.I18n.LangType, string>;

  locale(localMap[globalConfig.defaultLang]);
}
