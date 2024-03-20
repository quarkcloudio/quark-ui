import React, { useState } from 'react';
import { PageContainer as AntPageContainer, PageHeader } from '@ant-design/pro-components';
import { useLocation, history } from '@umijs/max';
import qs from 'query-string';
import Render from '@/components/Render';
import { get } from '@/services/action';
import { setObjToUrlParams } from '@/utils/url';

const PageContainer: React.FC<any> = (props: any) => {
  const location = useLocation();
  const query = qs.parse(location.search);
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
      data.forEach((item: any) => {
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
      url: query.api,
      data: query,
    });
    const pageContainer = findComponent(result, key);
    setPageContainer(pageContainer);
  };

  const onTabChange = (key: any) => {
    let getQuery: any = {};
    getQuery['api'] = query.api;
    getQuery['tabKey'] = key;
    history.push({ pathname: history.location.pathname, search: setObjToUrlParams('', getQuery)  });
    getPageContainer(props.componentkey);
  };

  return (
    <AntPageContainer
      {...props}
      header={
        props.header && (
          {
            ...props.header,
            onBack: () => {
              history.go(-1);
            },
            children: props.header.body && (
              <Render
                body={props.header.body}
                data={props.data}
                callback={props.callback}
              />
            ),
            extra: props.header.extra && (
              <Render
                body={props.header.extra}
                data={props.data}
                callback={props.callback}
              />
            ),
          }
        )
      }
      content={
        props.content ? (
          <Render
            body={props.content}
            data={props.data}
            callback={props.callback}
          />
        ) : undefined
      }
      extraContent={
        props.extraContent ? (
          <Render
            body={props.extraContent}
            data={props.data}
            callback={props.callback}
          />
        ) : undefined
      }
      tabActiveKey={query?.tabKey ?? props.tabActiveKey}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      <Render
        body={pageContainerProps.body}
        data={props.data}
        callback={props.callback}
      />
    </AntPageContainer>
  );
};

export default PageContainer;
