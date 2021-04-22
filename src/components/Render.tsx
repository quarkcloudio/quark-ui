import React from 'react';
import Page from '@/components/Layout/Page';
import Container from '@/components/Layout/Container';
import PageContainer from '@/components/Layout/PageContainer';
import Layout from '@/components/Layout';
import Row from '@/components/Layout/Row';
import Col from '@/components/Layout/Col';
import ProCard from '@ant-design/pro-card';
import Form from '@/components/Form/Form';
import StatisticCard from '@/components/Display/StatisticCard';
import Descriptions from '@/components/Display/Descriptions';
import Login from '@/components/Login';
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
        component: <ProCard {...body} data={data} >{ componentRender(body.body,data) }</ProCard>
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
        key: 'statisticCard',
        component: <StatisticCard {...body} data={data} />
      },
      {
        key: 'descriptions',
        component: <Descriptions {...body} data={data} />
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
  const componentRender = (body:any,data:any) => {

    if(body === null || body === undefined) {
      return null;
    }

    if(typeof body === 'string' || typeof body === 'number') {
      if(props.hasOwnProperty('data')) {
        // 解析数据
        body = parseTemplate(body, data);
      }
      return body;
    }

    let component:any = null;
    if(body.hasOwnProperty('type')) {
      registerComponent(body,data).map((item:any) => {
        if(item.key === body.type) {
          component = item.component;
        }
      });
    } else {
      component = (
        body.map((item:any) => {
          return registerComponent(item,data).map((componentItem:any) => {
            if(componentItem.key === item.type) {
              return componentItem.component;
            }
          });
        })
      );
    }

    return component;
  }

  const component = componentRender(props.body,props.data);

  return (typeof component === 'string') ? <span dangerouslySetInnerHTML={{__html: component}} /> : component
}

export default Render;