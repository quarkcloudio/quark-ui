import React from 'react';
import Page from '@/components/Layout/Page';
import Container from '@/components/Layout/Container';
import PageContainer from '@/components/Layout/PageContainer';
import Layout from '@/components/Layout';
import Login from '@/components/Login';
import { parseTemplate } from '@/utils/template';

const Render: React.FC<any> = (props:any) => {

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

    // 注册组件
    const components:any = [
      {
        key: 'page',
        component: <Page {...props.body} />
      },
      {
        key: 'layout',
        component: <Layout {...props.body} data={props.data} />
      },
      {
        key: 'container',
        component: <Container {...props.body} data={props.data} />
      },
      {
        key: 'pageContainer',
        component: <PageContainer {...props.body} data={props.data} />
      },
      {
        key: 'login',
        component: <Login {...props.body} data={props.data} />
      }
    ]

    let component:any = null;
    components.map((item:any) => {
      if(item.key === props.body.type) {
        component = item.component;
      }
    });

    return component;
  }

  return (
    componentRender()
  );
}

export default Render;