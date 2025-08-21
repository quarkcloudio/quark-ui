import { Switch } from 'antd';

import {
  ThemeSchemaSegmented,
  getThemeSettings,
  setColourWeakness,
  setGrayscale,
  setIsOnlyExpandCurrentParentMenu
} from '@/features/theme';

import SettingItem from '../components/SettingItem';
import '@/styles/css/darkMode.css';

const DarkMode = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const themeSettings = useAppSelector(getThemeSettings);

  function handleGrayscaleChange(value: boolean) {
    dispatch(setGrayscale(value));
  }

  function handleAuxiliaryColorChange(value: boolean) {
    dispatch(setColourWeakness(value));
  }

  function handleIsOnlyExpandCurrentParentMenuChange(value: boolean) {
    dispatch(setIsOnlyExpandCurrentParentMenu(value));
  }
  return (
    <div className="flex-col-stretch gap-16px">
      <div className="i-flex-center">
        <ThemeSchemaSegmented />
      </div>

      <SettingItem label={t('theme.grayscale')}>
        <Switch
          checked={themeSettings.grayscale}
          onChange={handleGrayscaleChange}
        />
      </SettingItem>

      <SettingItem label={t('theme.colourWeakness')}>
        <Switch
          checked={themeSettings.colourWeakness}
          onChange={handleAuxiliaryColorChange}
        />
      </SettingItem>

      <SettingItem label={t('theme.isOnlyExpandCurrentParentMenu')}>
        <Switch
          checked={themeSettings.isOnlyExpandCurrentParentMenu}
          onChange={handleIsOnlyExpandCurrentParentMenuChange}
        />
      </SettingItem>
    </div>
  );
};

export default DarkMode;
