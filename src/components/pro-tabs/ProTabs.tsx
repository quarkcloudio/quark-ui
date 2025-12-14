import type { TabsProps } from 'antd';
import { useMemo } from 'react';

interface Props {
  data?: any;
  tabBarExtraContent?: any;
  tabPanes?: any;
}

const ProTabs = (props: Props & TabsProps) => {
  const { data, defaultActiveKey, size, tabBarExtraContent, tabPanes, tabPosition, type } = props;

  const items: TabsProps['items'] = tabPanes.map((tab: any, index: number) => {
    return {
      children: (
        <Render
          body={tab.body}
          data={data}
        />
      ),
      key: index,
      label: tab.title
    };
  });

  const action = useMemo(() => {
    return tabBarExtraContent.map((item: any) => (
      <Action
        {...item}
        key={item.componentkey}
      />
    ));
  }, [tabBarExtraContent]);

  return (
    <ACard
      style={{ border: 'none' }}
      styles={{ body: { paddingTop: '10px' } }}
    >
      <ATabs
        defaultActiveKey={defaultActiveKey}
        items={items}
        size={size}
        tabBarExtraContent={{ right: action }}
        tabPosition={tabPosition}
        type={type}
      />
    </ACard>
  );
};

export default ProTabs;
