import React, { useEffect } from 'react';
import type { TabsProps } from 'antd';
import { ProCard, ProCardTabsProps } from '@ant-design/pro-components';
import Render from '@/components/Render';
import { useModel } from '@umijs/max';

export interface TabsExtendProps {
  component?: string;
  componentkey?: string;
  tabPanes?: any;
  data?: any;
  callback?: any;
}

const Tabs: React.FC<TabsExtendProps & ProCardTabsProps> = (props) => {
  const {
    centered,
    defaultActiveKey,
    size,
    style,
    tabBarGutter,
    tabBarStyle,
    tabPosition,
    type,
    tabBarExtraContent,
    tabPanes,
    data,
    callback,
  } = { ...props };

  const { tabs, setTabs } = useModel('tabs');

  useEffect(() => {
    setTabs({
      itemNum: tabPanes.length,
      activeKey: 0,
    });
  }, [props]);

  const items: TabsProps['items'] = tabPanes.map((tab: any, index: number) => {
    return {
      key: index,
      label: tab.title,
      children: <Render body={tab.body} data={data} callback={callback} />,
    };
  });

  return (
    <ProCard
      tabs={{
        centered: centered,
        defaultActiveKey: defaultActiveKey,
        activeKey: tabs.activeKey,
        size: size,
        style: style,
        tabBarGutter: tabBarGutter,
        tabBarStyle: tabBarStyle,
        tabPosition: tabPosition,
        type: type,
        tabBarExtraContent: tabBarExtraContent && (
          <Render body={tabBarExtraContent} data={data} callback={callback} />
        ),
        items: items,
        onChange: (key) => {
          setTabs({
            itemNum: tabPanes.length,
            activeKey: key,
          });
        },
      }}
    />
  );
};

export default Tabs;
