import React, { useState } from 'react';
import { history } from 'umi';
import Render from '@/components/Render';
import { PageContainer as AntPageContainer } from '@ant-design/pro-layout';
import { get } from '@/services/action';

const PageContainer: React.FC<any> = (props:any) => {
  const query: any = history.location.query;
  const [pageContainerProps, setPageContainer] = useState<any>(props);

  const findComponent: any = (data: any, key: string) => {
    let component: any = [];

    if (data.key === key) {
      return data;
    }

    // tab做特殊处理
    if (data.hasOwnProperty('tabPanes')) {
      return findComponent(data.tabPanes, key);
    }

    if (data.hasOwnProperty('body')) {
      return findComponent(data.body, key);
    }

    if (data.hasOwnProperty(0)) {
      data.map((item: any) => {
        let getComponent = findComponent(item, key);
        let getComponentKeys = Object.keys(getComponent);
        if (getComponentKeys.length > 0) {
          component = getComponent;
        }
      });
    }

    return component;
  };

  const getPageContainer: any = async (key: string) => {
    const result = await get({
      actionUrl: query.api,
      ...query,
    });

    const pageContainer = findComponent(result, key);

    setPageContainer(pageContainer);
  };

  const onTabChange = (key: any) => {
    let getQuery: any = {};

    getQuery['api'] = query.api;
    getQuery['tabKey'] = key;

    history.push({ pathname: history.location.pathname, query: getQuery });

    getPageContainer(props.componentKey);
  };

  return (
    <AntPageContainer
      {...props}
      content={props.content ? <Render body={props.content} data={props.data} callback={props.callback} /> : undefined}
      extraContent={props.extraContent ? <Render body={props.extraContent} data={props.data} callback={props.callback} /> : undefined}
      tabActiveKey={query?.tabKey ?? props.tabActiveKey}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      <Render body={pageContainerProps.body} data={props.data} callback={props.callback} />
    </AntPageContainer>
  );
}

export default PageContainer;