import { getThemeSettings } from '@/features/theme';

export function useThemeSettings() {
  const themeSettings = useAppSelector(getThemeSettings);

  return themeSettings;
}
