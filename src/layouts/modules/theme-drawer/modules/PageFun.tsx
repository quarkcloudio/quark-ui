import { InputNumber, Select, Switch } from 'antd';

import { themePageAnimationModeOptions, themeScrollModeOptions, themeTabModeOptions } from '@/constants/app';
import {
  getThemeSettings,
  setFixedHeaderAndTab,
  setFooter,
  setHeader,
  setLayoutScrollMode,
  setPage,
  setSider,
  setTab,
  setWatermark
} from '@/features/theme';

import SettingItem from '../components/SettingItem';

const PageFun = memo(() => {
  const { t } = useTranslation();

  const themeSetting = useAppSelector(getThemeSettings);

  const dispatch = useAppDispatch();

  const isWrapperScrollMode = themeSetting.layout.scrollMode === 'wrapper';

  const isPageAnimate = themeSetting.page.animate;

  const layoutMode = themeSetting.layout.mode;

  const isMixLayoutMode = layoutMode.includes('mix');

  const isVertical = layoutMode === 'vertical';

  return (
    <div className="relative flex-col-stretch gap-12px">
      <SettingItem label={t('theme.scrollMode.title')}>
        <Select
          className="w-120px"
          value={themeSetting.layout.scrollMode}
          options={themeScrollModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setLayoutScrollMode(value))}
        />
      </SettingItem>
      <SettingItem label={t('theme.page.animate')}>
        <Switch
          checked={isPageAnimate}
          onChange={value => dispatch(setPage({ animate: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.page.mode.title')}
        show={isPageAnimate}
      >
        <Select
          className="w-120px"
          value={themeSetting.page.animateMode}
          options={themePageAnimationModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setPage({ animateMode: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.fixedHeaderAndTab')}
        show={isWrapperScrollMode}
      >
        <Switch
          checked={themeSetting.fixedHeaderAndTab}
          onChange={value => dispatch(setFixedHeaderAndTab(value))}
        />
      </SettingItem>

      <SettingItem label={t('theme.header.height')}>
        <InputNumber
          className="w-120px"
          value={themeSetting.header.height}
          onChange={value => dispatch(setHeader({ height: value ?? 0 }))}
        />
      </SettingItem>
      <SettingItem label={t('theme.header.breadcrumb.visible')}>
        <Switch
          value={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { visible: value } }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.header.breadcrumb.showIcon')}
        show={themeSetting.header.breadcrumb.visible}
      >
        <Switch
          value={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { showIcon: value } }))}
        />
      </SettingItem>

      <SettingItem label={t('theme.tab.visible')}>
        <Switch
          value={themeSetting.tab.visible}
          onChange={value => dispatch(setTab({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.tab.height')}
        show={themeSetting.tab.visible}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.tab.height}
          onChange={value => dispatch(setTab({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.tab.mode.title')}
        show={themeSetting.tab.visible}
      >
        <Select
          className="w-120px"
          value={themeSetting.tab.mode}
          options={themeTabModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setTab({ mode: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.width')}
        show={isVertical}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.sider.width}
          onChange={value => dispatch(setSider({ width: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.collapsedWidth')}
        show={isVertical}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.sider.collapsedWidth}
          onChange={value => dispatch(setSider({ collapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixWidth')}
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.sider.mixWidth}
          onChange={value => dispatch(setSider({ mixWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixCollapsedWidth')}
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.sider.mixCollapsedWidth}
          onChange={value => dispatch(setSider({ mixCollapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixChildMenuWidth')}
        show={layoutMode === 'vertical-mix'}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.sider.mixChildMenuWidth}
          onChange={value => dispatch(setSider({ mixChildMenuWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem label={t('theme.footer.visible')}>
        <Switch
          value={themeSetting.footer.visible}
          onChange={value => dispatch(setFooter({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.fixed')}
        show={Boolean(themeSetting.footer.visible && isWrapperScrollMode)}
      >
        <Switch
          value={themeSetting.footer.fixed}
          onChange={value => dispatch(setFooter({ fixed: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.height')}
        show={themeSetting.footer.visible}
      >
        <InputNumber
          className="w-120px"
          value={themeSetting.footer.height}
          onChange={value => dispatch(setFooter({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.right')}
        show={Boolean(themeSetting.footer.visible && layoutMode === 'horizontal-mix')}
      >
        <Switch
          value={themeSetting.footer.right}
          onChange={value => dispatch(setFooter({ right: value }))}
        />
      </SettingItem>

      <SettingItem label={t('theme.watermark.visible')}>
        <Switch
          value={themeSetting.watermark?.visible}
          onChange={value => dispatch(setWatermark({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.watermark.text')}
        show={Boolean(themeSetting.watermark.visible)}
      >
        <AInput
          allowClear
          className="w-120px"
          value={themeSetting.watermark.text}
          onChange={value => dispatch(setWatermark({ text: value.target.value || '' }))}
        />
      </SettingItem>
    </div>
  );
});

export default PageFun;
