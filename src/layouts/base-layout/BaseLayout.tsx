import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import type { LayoutMode } from '@sa/materials';
import { configResponsive } from 'ahooks';
import { Suspense } from 'react';

import './index.scss';
import {
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_HORIZONTAL_MIX,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX
} from '@/constants/common';
import { useMixMenuContext } from '@/features/menu';
import GlobalTab from '@/features/tab/GlobalTab';
import { getThemeSettings, setLayoutMode } from '@/features/theme';

import { getFullContent, getMixSiderFixed, getSiderCollapse, setIsMobile, setSiderCollapse } from '../appStore';
import GlobalContent from '../modules/GlobalContent';
import GlobalFooter from '../modules/GlobalFooter';
import GlobalSider from '../modules/GlobalSider';
import GlobalHeader from '../modules/global-header/GlobalHeader';
import GlobalMenu from '../modules/global-menu';
import ThemeDrawer from '../modules/theme-drawer';

configResponsive({ sm: 640 });

const BaseLayout = () => {
  const dispatch = useAppDispatch();

  const themeSettings = useAppSelector(getThemeSettings);

  const siderCollapse = useAppSelector(getSiderCollapse);

  const fullContent = useAppSelector(getFullContent);

  const responsive = useResponsive();

  const mixSiderFixed = useAppSelector(getMixSiderFixed);

  const { childLevelMenus, isActiveFirstLevelMenuHasChildren } = useMixMenuContext();

  const siderVisible = themeSettings.layout.mode !== LAYOUT_MODE_HORIZONTAL;

  const isVerticalMix = themeSettings.layout.mode === LAYOUT_MODE_VERTICAL_MIX;

  const isHorizontalMix = themeSettings.layout.mode === LAYOUT_MODE_HORIZONTAL_MIX;

  const layoutMode = themeSettings.layout.mode.includes(LAYOUT_MODE_VERTICAL)
    ? LAYOUT_MODE_VERTICAL
    : LAYOUT_MODE_HORIZONTAL;

  const isMobile = !responsive.sm;

  function getSiderWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;

    const { mixChildMenuWidth, mixWidth, width } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? width : 0;
    }

    let w = isVerticalMix || isHorizontalMix ? mixWidth : width;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }

  const siderWidth = getSiderWidth();

  function getSiderCollapsedWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;
    const { collapsedWidth, mixChildMenuWidth, mixCollapsedWidth } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? collapsedWidth : 0;
    }

    let w = isVerticalMix || isHorizontalMix ? mixCollapsedWidth : collapsedWidth;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }
  const siderCollapsedWidth = getSiderCollapsedWidth();

  function updateSiderCollapse() {
    dispatch(setSiderCollapse(true));
  }

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode('vertical'));
    }
  }, [isMobile, dispatch]);

  return (
    <AdminLayout
      fixedFooter={themeSettings.footer.fixed}
      fixedTop={themeSettings.fixedHeaderAndTab}
      Footer={<GlobalFooter />}
      footerHeight={themeSettings.footer.height}
      footerVisible={themeSettings.footer.visible}
      fullContent={fullContent}
      headerHeight={themeSettings.header.height}
      isMobile={isMobile}
      mode={layoutMode as LayoutMode}
      rightFooter={themeSettings.footer.right}
      scrollElId={LAYOUT_SCROLL_EL_ID}
      scrollMode={themeSettings.layout.scrollMode}
      siderCollapse={siderCollapse}
      siderCollapsedWidth={siderCollapsedWidth}
      siderVisible={siderVisible}
      siderWidth={siderWidth}
      Tab={<GlobalTab />}
      tabHeight={themeSettings.tab.height}
      tabVisible={themeSettings.tab.visible}
      updateSiderCollapse={updateSiderCollapse}
      Header={
        <GlobalHeader
          isMobile={isMobile}
          mode={themeSettings.layout.mode}
          reverse={themeSettings.layout.reverseHorizontalMix}
          siderWidth={themeSettings.sider.width}
        />
      }
      Sider={
        <GlobalSider
          headerHeight={themeSettings.header.height}
          inverted={themeSettings.sider.inverted}
          isHorizontalMix={isHorizontalMix}
          isVerticalMix={isVerticalMix}
          siderCollapse={siderCollapse}
        />
      }
    >
      <GlobalContent />

      <GlobalMenu
        mode={themeSettings.layout.mode}
        reverse={themeSettings.layout.reverseHorizontalMix}
      />

      <Suspense fallback={null}>
        <ThemeDrawer />
      </Suspense>
    </AdminLayout>
  );
};

export default BaseLayout;
