import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { stringify } from 'qs';
import { history } from 'umi';
import { get } from '@/services/action';
import {
  Popover,
  Button
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

const Engine: React.FC<{}> = () => {
  const [container, setContainerState] = useState({
    title: ' ',
    subTitle: null,
    content: null
  });

  useEffect(() => {
    getContainer();
  }, [history.location.query.api]);

  // 渲染column
  const columnRender = (column:any, text:any) => {
    let columnComponent = null;

    if(column.link) {
      columnComponent = <a href={text.link}>{text.title}</a>
    } else {
      columnComponent = text;
    }

    if(column.image) {
      columnComponent = <img src={text} width={column.image.width} height={column.image.height} />
    }

    if(column.qrcode) {
      let img:any = <img src={columnComponent} width={column.qrcode.width} height={column.qrcode.height} />;
      columnComponent = 
      <Popover placement="left" content={img}>
        <QrcodeOutlined style={{cursor:'pointer',fontSize:'18px'}} />
      </Popover>
    }

    if(column.actions) {
      columnComponent = parseActions(text);
    }

    return columnComponent;
  }

  // 执行行为
  const executeAction = async (api:string) => {
    const result = await get({
      actionUrl: api
    });

    return result;
  }

  // 解析actions
  const parseActions = (actions:any) => {
    let actionComponent:any = null;
    actionComponent = (
      actions.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'aStyleAction':
            component = <a href={item.href} target={item.target} style={item.style} onClick={()=>{executeAction(item.api)}}>
                          {item.name}
                        </a>
            break;

          case 'buttonStyleAction':
            component = <Button
                          type={item.type}
                          href={item.href}
                          target={item.target}
                          style={item.style}
                        >
                          {item.name}
                        </Button>
            break;
        
          default:
            break;
        }
        return component;
      })
    )
    return actionComponent;
  }

  // 解析column
  const parseColumns = (columns:any) => {
    columns.map((item:any,key:any) => {
      item.render = (text:any, row:any) => (
        <>
          {columnRender(item, text)}
        </>
      );
      columns[key] = item;
    })
    return columns;
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
            headerTitle={content.headerTitle}
            columns={parseColumns(content.columns)}
            search={content.search}
            request={async (params, sorter, filter,) => {
              let query = {};
              query['api'] = history.location.query.api;
              query['page'] = params.current;
              query['pageSize'] = params.pageSize;
  
              delete params['current'];
              delete params['pageSize'];
  
              query['search'] = params;
              query['sorter'] = sorter;
              query['filter'] = filter;
  
              history.push(history.location.pathname+'?'+stringify(query));

              const datasource = await getTableDatasource(content.key);

              return Promise.resolve({
                data: datasource,
                success: true,
              });
            }}
            pagination={content.pagination}
            dateFormatter="string"
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

  const findComponent:any = (data:any,key:string) => {
    if(data.key === key) {
      return data;
    }

    if(data.hasOwnProperty('content')) {
      return findComponent(data.content,key);
    }
  
    let conmpontent = [];

    if(data.hasOwnProperty(0)) {
      conmpontent = (data.map((item:any) => {
        return findComponent(item,key);
      }));
    }

    return conmpontent
  }

  const getContainer = async () =>  {
    const result = await get({
      actionUrl: history.location.query.api,
      ...history.location.query
    });
    setContainerState(result.data)
  }

  const getTableDatasource:any = async (key:string) =>  {
    const result = await get({
      actionUrl: history.location.query.api,
      ...history.location.query
    });
    const table = findComponent(result.data,key);
    return table.datasource;
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