import type { ThemeModeType } from 'ahooks/lib/useTheme';
import { createContext } from 'react';

import { globalConfig } from '@/config';
import { DARK_CLASS } from '@/constants/common';

export type ThemeContextType = {
  darkMode: boolean;
  setThemeScheme: (themeScheme: ThemeModeType) => void;
  themeScheme: ThemeModeType;
  toggleThemeScheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: globalConfig.defaultDarkMode,
  setThemeScheme: globalConfig.noop,
  themeScheme: 'light',
  toggleThemeScheme: globalConfig.noop
});

export const icons: Record<ThemeModeType, string> = {
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny',
  system: 'material-symbols:hdr-auto'
};

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const htmlElementClassList = document.documentElement.classList;

  if (darkMode) {
    htmlElementClassList.add(DARK_CLASS);
  } else {
    htmlElementClassList.remove(DARK_CLASS);
  }
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}
