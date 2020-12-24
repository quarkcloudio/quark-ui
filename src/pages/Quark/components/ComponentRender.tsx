import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { history } from 'umi';
import { get } from '@/services/action';
import Table from '@/pages/Quark/components/Table';
import Form from '@/pages/Quark/components/Form';
import TabForm from '@/pages/Quark/components/TabForm';
import Show from '@/pages/Quark/components/Show';
import Upgrade from '@/pages/Quark/components/Upgrade';

import {
  Statistic,
} from 'antd';

const ComponentRender: React.FC<any> = (props:any) => {

  const [component, setComponentState] = useState({
    title: ' ',
    subTitle: null,
    content: null
  });

  useEffect(() => {
    getComponent();
  }, [history.location.query.api]);

  // Container返回按钮跳转方法
  const onBack = (backButton:string|boolean) => {
    if(backButton === true) {
      history.go(-1);
    } else {
      history.push(backButton);
    }
  }

  const parseComponent = (content:any) => {
    let component = null;
    switch (content.component) {
      case 'container':
        if(content.backButton) {
          component =
          <PageContainer
            title={content.title}
            subTitle={content.subTitle}
            onBack={() => onBack(content.backButton)}
          >
            {componentRender(content.content)}
          </PageContainer>
        } else {
          component =
          <PageContainer
            title={content.title}
            subTitle={content.subTitle}
          >
            {componentRender(content.content)}
          </PageContainer>
        }
        break;
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
          <Table
            key={content.key}
            table={content}
          />
        break;
      case 'form':
        component =
          <Form
            key={content.key}
            form={content}
          />
        break;
      case 'tabForm':
        component =
          <TabForm
            key={content.key}
            form={content}
          />
        break;
      case 'show':
        component =
          <Show
            key={content.key}
            show={content}
          />
        break;
      case 'statistic':
        component =
          <Statistic
            {...content}
          />
        break;
      case 'upgrade':
        component =
          <Upgrade
            {...content}
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

  const getComponent = async () => {
    const api = props.api ? props.api : history.location.query.api;
    if(api) {
      const result = await get({
        actionUrl: api,
        ...history.location.query
      });
      setComponentState(result.data)
    }
  }

  return (
    componentRender(component)
  );
}

export default ComponentRender;