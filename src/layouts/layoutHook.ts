import { useThemeSettings } from '@/features/theme';

import { getReloadFlag, setReloadFlag } from './appStore';

/**
 * Reload page
 *
 * @param duration Duration time
 */
export function useReloadPage(duration = 300) {
  const dispatch = useAppDispatch();

  const isReload = useAppSelector(getReloadFlag);

  const themeSettings = useThemeSettings();

  async function reloadPage() {
    dispatch(setReloadFlag(true));

    const d = themeSettings.page.animate ? duration : 40;

    await new Promise(resolve => {
      setTimeout(resolve, d);
    });

    dispatch(setReloadFlag(false));
  }

  return {
    isReload,
    reloadPage
  };
}
