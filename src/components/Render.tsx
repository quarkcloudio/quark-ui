import React from 'react';
import Page from '@/components/Layout/Page';
import Container from '@/components/Layout/Container';
import PageContainer from '@/components/Layout/PageContainer';
import Layout from '@/components/Layout';
import Row from '@/components/Layout/Row';
import Col from '@/components/Layout/Col';
import Divider from '@/components/Layout/Divider';
import When from '@/components/Layout/When';
import ProCard from '@ant-design/pro-card';
import Form from '@/components/Form/Form';
import Field from '@/components/Form/Field';
import Tabs from '@/components/Display/Tabs';
import StatisticCard from '@/components/Display/StatisticCard';
import Statistic from '@/components/Display/Statistic';
import Descriptions from '@/components/Display/Descriptions';
import List from '@/components/Display/List';
import Table from '@/components/Table/Table';
import Action from '@/components/Action/Action';
import Login from '@/components/Login';
import Typography from '@/components/Typography';
import Paragraph from '@/components/Typography/Paragraph';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Space } from 'antd';
import { MicroApp } from 'umi';
import { tplEngine } from '@/utils/template';
import Line from '@/components/Chart/Line';

const Render: React.FC<any> = (props:any) => {

  // 注册组件
  const registerComponent = (body:any, data:any, callback:any) => {

    return [
      {
        key: 'page',
        component: <Page {...body} />
      },
      {
        key: 'layout',
        component: <Layout {...body} callback={callback} data={data} />
      },
      {
        key: 'container',
        component: <Container {...body} callback={callback} data={data} />
      },
      {
        key: 'pageContainer',
        component: <PageContainer {...body} callback={callback} data={data} />
      },
      {
        key: 'card',
        component: <ProCard {...body} extra={ componentRender(body.extra, data, callback) } callback={callback} data={data} >{ componentRender(body.body, data, callback) }</ProCard>
      },
      {
        key: 'row',
        component: <Row {...body} callback={callback} data={data} />
      },
      {
        key: 'col',
        component: <Col {...body} callback={callback} data={data} />
      },
      {
        key: 'space',
        component: <Space {...body}>{ componentRender(body.body, data, callback) }</Space>
      },
      {
        key: 'tabs',
        component: <Tabs {...body} callback={callback} data={data} />
      },
      {
        key: 'statisticCard',
        component: <StatisticCard {...body} callback={callback} data={data} />
      },
      {
        key: 'statistic',
        component: <Statistic {...body} callback={callback} data={data} />
      },
      {
        key: 'descriptions',
        component: <Descriptions {...body} callback={callback} data={data} />
      },
      {
        key: 'typography',
        component: <Typography {...body} callback={callback} data={data} />
      },
      {
        key: 'paragraph',
        component: <Paragraph {...body} callback={callback} data={data} />
      },
      {
        key: 'title',
        component: <Title {...body} callback={callback} data={data} />
      },
      {
        key: 'text',
        component: <Text {...body} callback={callback} data={data} />
      },
      {
        key: 'divider',
        component: <Divider {...body} callback={callback} data={data} />
      },
      {
        key: 'form',
        component: <Form formKey={body.key} callback={callback} {...body} data={data} />
      },
      // 注册表单项组件
      {
        key: "textField|passwordField|textAreaField|inputNumberField|\
        iconField|hiddenField|checkboxField|radioField|imageField|\
        fileField|switchField|selectField|treeField|cascaderField|\
        dateField|weekField|monthField|quarterField|yearField|datetimeField|\
        dateRangeField|datetimeRangeField|timeField|timeRangeField|displayField|\
        editorField|searchField|mapField|geofenceField|",
        component: <Field {...body} callback={callback} data={data} />
      },
      {
        key: 'table',
        component: <Table {...body} callback={callback} tableKey={body.key} data={data} />
      },
      {
        key: 'action',
        component: <Action {...body} callback={callback} data={data} />
      },
      {
        key: 'login',
        component: <Login {...body} callback={callback} data={data} />
      },
      {
        key: 'microApp',
        component: <MicroApp {...body} callback={callback} data={data} />
      },
      {
        key: 'when',
        component: <When {...body} callback={callback} data={data} />
      },
      {
        key: 'tpl',
        component: <span {...body}>{ tplEngine(body.body, data) }</span>
      },
      {
        key: 'list',
        component: <List {...body} callback={callback} listKey={body.key} data={data} />
      },
      {
        key: 'line',
        component: <Line {...body} callback={callback} />
      },
    ];
  }

  // 渲染组件
  const componentRender = (body:any, data:any, callback:any) => {

    if(body === null || body === undefined) {
      return null;
    }

    if(typeof body === 'string' || typeof body === 'number') {
      if(props.hasOwnProperty('data')) {
        // 解析数据
        body = tplEngine(body, data);
      }

      return body;
    }

    let component:any = null;
    if(body.hasOwnProperty('component')) {
      registerComponent(body, data, callback).map((item:any) => {
        if(item.key.indexOf(body.component + '|') != -1) {
          component = item.component;
        } else {
          if(item.key === body.component) {
            component = item.component;
          }
        }
      });
    } else {
      component = (
        body.map((item:any) => {
          return registerComponent(item, data, callback).map((componentItem:any) => {
            if(componentItem.key.indexOf(item.component + '|') != -1) {
              return componentItem.component;
            } else {
              if(componentItem.key === item.component) {
                return componentItem.component;
              }
            }
          });
        })
      );
    }

    return component;
  }

  const component = componentRender(props.body, props.data, props.callback);

  return (typeof component === 'string') ? <span dangerouslySetInnerHTML={{__html: component}} /> : component
}

export default Render;