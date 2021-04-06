import React from 'react';
import Page from '@/components/Layout/Page';
import Container from '@/components/Layout/Container';

const Render: React.FC<any> = (props:any) => {

  // 渲染组件
  const renderComponents = (body:any) => {

    if(body === null || body === undefined) {
      return null;
    }

    if(typeof body === 'string' || typeof body === 'number') {
      return body;
    }

    // 注册组件
    const components:any = [
      {
        key: 'page',
        component: <Page {...body} />
      },
      {
        key: 'container',
        component: <Container {...body} />
      }
    ]

    let component:any = null;

    components.map((item:any,key:any) => {
      if(item.key === body.type) {
        component = item.component;
      }
    });

    return component;
  }

  return (
    renderComponents(props.body)
  );
}

export default Render;