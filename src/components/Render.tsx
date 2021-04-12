import React from 'react';
import Page from '@/components/Layout/Page';
import Container from '@/components/Layout/Container';
import PageContainer from '@/components/Layout/PageContainer';
import Layout from '@/components/Layout';
import Card from '@/components/Layout/Card';
import Row from '@/components/Layout/Row';
import Col from '@/components/Layout/Col';
import Login from '@/components/Login';
import Form from '@/components/Form/Form';
import { parseTemplate } from '@/utils/template';

const Render: React.FC<any> = (props:any) => {

  // 注册组件
  const registerComponent = (body:any, data:any) => {
    return [
      {
        key: 'page',
        component: <Page {...body} />
      },
      {
        key: 'layout',
        component: <Layout {...body} data={data} />
      },
      {
        key: 'container',
        component: <Container {...body} data={data} />
      },
      {
        key: 'pageContainer',
        component: <PageContainer {...body} data={data} />
      },
      {
        key: 'card',
        component: <Card {...body} data={data} />
      },
      {
        key: 'row',
        component: <Row {...body} data={data} />
      },
      {
        key: 'col',
        component: <Col {...body} data={data} />
      },
      {
        key: 'form',
        component: <Form {...body} data={data} />
      },
      {
        key: 'login',
        component: <Login {...body} data={data} />
      }
    ];
  }

  // 渲染组件
  const componentRender = () => {

    if(props.body === null || props.body === undefined) {
      return null;
    }

    if(typeof props.body === 'string' || typeof props.body === 'number') {
      let body = props.body;
      if(props.hasOwnProperty('data')) {
        // 解析数据
        body = parseTemplate(props.body,props.data);
      }
      return body;
    }

    let component:any = null;
    if(props.body.hasOwnProperty('type')) {
      registerComponent(props.body,props.data).map((item:any) => {
        if(item.key === props.body.type) {
          component = item.component;
        }
      });
    } else {
      component = (
        props.body.map((item:any) => {
          return registerComponent(item,props.data).map((componentItem:any) => {
            if(componentItem.key === item.type) {
              return componentItem.component;
            }
          });
        })
      );
    }

    return component;
  }

  return (
    componentRender()
  );
}

export default Render;