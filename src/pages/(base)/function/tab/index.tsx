import { useRouter } from '@/features/router';
import type { LocationQueryRaw } from '@/features/router/query';
import { useTabActions, useTabLabel } from '@/features/tab/tabHooks';

const Tab = () => {
  const { t } = useTranslation();

  const { resetTabLabel, setTabLabel } = useTabLabel();

  const { removeActiveTab, removeTabById } = useTabActions();

  const { navigate, push } = useRouter();

  function changeTabLabel(value: string) {
    setTabLabel(value);
  }

  function resetLabel() {
    resetTabLabel();
  }

  function goMultiTab(query?: LocationQueryRaw) {
    push('/function/multi-tab', query);
  }

  function removeAboutTab() {
    removeTabById('/about');
  }

  function goAbout() {
    navigate('/about');
  }

  function goProjects() {
    navigate('/projects/123');
  }

  function goProjectsEdit() {
    navigate('/projects/123/edit/456');
  }

  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={16}
    >
      <ACard
        className='"card-wrapper'
        size="small"
        title={t('page.function.tab.tabOperate.title')}
        variant="borderless"
      >
        <ADivider orientation="left">{t('page.function.tab.tabOperate.addTab')}</ADivider>
        <AButton onClick={goAbout}>{t('page.function.tab.tabOperate.addTabDesc')}</AButton>

        <ADivider orientation="left">{t('page.function.tab.tabOperate.closeTab')}</ADivider>
        <ASpace size={16}>
          <AButton onClick={removeActiveTab}>{t('page.function.tab.tabOperate.closeCurrentTab')}</AButton>

          <AButton onClick={removeAboutTab}>{t('page.function.tab.tabOperate.closeAboutTab')}</AButton>
        </ASpace>

        <ADivider orientation="left">跳转多级动态路由</ADivider>
        <ASpace
          wrap
          className="m-0!"
          size={16}
        >
          <AButton onClick={goProjects}>跳转一级动态路由</AButton>

          <AButton onClick={goProjectsEdit}>跳转级动态路由</AButton>
        </ASpace>

        <ADivider orientation="left">{t('page.function.tab.tabOperate.addMultiTab')}</ADivider>
        <ASpace
          wrap
          className="m-0!"
          size={16}
        >
          <AButton onClick={() => goMultiTab()}>{t('page.function.tab.tabOperate.addMultiTabDesc1')}</AButton>

          <AButton
            onClick={() => {
              goMultiTab({ a: '1' });
            }}
          >
            {t('page.function.tab.tabOperate.addMultiTabDesc2')}
          </AButton>
        </ASpace>
      </ACard>

      <ACard
        className='"card-wrapper'
        size="small"
        title={t('page.function.tab.tabTitle.title')}
        variant="borderless"
      >
        <ADivider orientation="left">{t('page.function.tab.tabTitle.changeTitle')}</ADivider>

        <AInput.Search
          allowClear
          className="max-w-240px"
          enterButton={t('page.function.tab.tabTitle.change')}
          onSearch={changeTabLabel}
        />

        <ADivider orientation="left">{t('page.function.tab.tabTitle.resetTitle')}</ADivider>
        <AButton onClick={resetLabel}>{t('page.function.tab.tabTitle.reset')}</AButton>
      </ACard>
    </ASpace>
  );
};

export default Tab;
