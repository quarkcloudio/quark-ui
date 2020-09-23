import React, { useState, useEffect } from 'react';
import { stringify } from 'qs';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { get } from '@/services/action';

const Engine: React.FC<{}> = () => {
  const query = history.location.query;
  const [container, setContainerState] = useState({
    title: ' ',
    subTitle: null,
    content: null
  });

  useEffect(() => {
    getContainer();
  }, [query.api]);

  const parseColumns = (columns:any) => {
    let getColumns: ProColumns<any>[] = [];
    columns.map((item:any,key:any) => {
      getColumns[key] = item;
    })
    return getColumns;
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
            request={(params, sorter, filter,) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
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

              return Promise.resolve({
                data: getTableDatasource(content.key),
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
    console.log(key);
    console.log(data.key);

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
      actionUrl: query.api,
      ...query
    });
    setContainerState(result.data)
  }

  const getTableDatasource:any = async (key:string) =>  {
    const result = await get({
      actionUrl: query.api,
      ...query
    });

    const table = findComponent(result,key);
    console.log(table);
    return [];
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