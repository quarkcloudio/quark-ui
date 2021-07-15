import React from 'react';
import ProCard from '@ant-design/pro-card';
import Render from '@/components/Render';

const Tabs: React.FC<any> = (props:any) => {
  return (
    <ProCard
      tabs={{
        ...props,
        tabBarExtraContent : <Render body={props.tabBarExtraContent} data={props.data} callback={props.callback}/>
      }}
    >
      {props.tabPanes.map((tab: any, index: any) => {
        return (
          <ProCard.TabPane key={(index + 1).toString()} tab={tab.title}>
            <Render body={tab.body} data={props.data} callback={props.callback}/>
          </ProCard.TabPane>
        );
      })}
    </ProCard>
  );
}

export default Tabs;