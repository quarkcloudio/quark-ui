import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { get } from '@/services/action';

const getQueryString = (key: any) => {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}

const parseComponent = (content:any) => {
  let component = null;
  switch (content.component) {
    case 'card':
      component =
        <ProCard
          key={content.key}
          title={content.title}
          extra={content.extra}
          subTitle={content.subTitle}
          tip={content.tip}
          layout={content.layout}
          colSpan={content.colSpan}
          gutter={content.gutter}
          bordered={content.bordered}
          ghost={content.ghost}
          split={content.split}
          headerBordered={content.headerBordered}
          collapsible={content.collapsible}
          defaultCollapsed={content.defaultCollapsed}
          style={content.style}
        >
          {componentRender(content.content)}
        </ProCard>
      break;
    case 'table':
      component =
        <ProTable
          key={content.key}
          rowKey={content.rowKey}
          dateFormatter="string"
          headerTitle={content.headerTitle}
        />
      break;
    default:
      component = <span>无{component}组件</span>
      break;
  }
  return component;
}

const componentRender = (content:any) => {
  if(content === null) {
    return null;
  }

  if(typeof content === 'string' || typeof content === 'number') {
    return <span>{content}</span>;
  }

  if(content.hasOwnProperty('component')) {
    return parseComponent(content);
  }

  let component:any = null;
  if(content.hasOwnProperty(0)) {
    component = (
      content.map((item:any) => {
        return componentRender(item);
      })
    )
  }

  return component;
}

const Engine: React.FC<{}> = () => {
  const api = getQueryString('api');
  const [container, setContainerState] = useState({
    title: null,
    subTitle: null,
    content: null
  });

  useEffect(() => {
    getContainer();
  }, [api]);

  const getContainer = async () =>  {
    const result = await get({
      actionUrl: api
    });
    setContainerState(result.data)
  }

  return (
    <PageContainer
      title={container.title}
      subTitle={container.subTitle}
    >
      {componentRender(container.content)}
    </PageContainer>
  );
}

export default Engine;