import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { stringify } from 'qs';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import RowAction from '@/pages/Quark/components/RowAction';
import {
  Popover,
  Button
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

export interface Table {
  key: number;
  table: any;
}

const Table: React.FC<Table> = (props) => {
  const actionRef = useRef<any>(undefined);

  // 渲染column
  const columnRender = (column:any, text:any) => {
    let columnComponent = null;

    if(column.link) {
      if(text.target === '_blank') {
        columnComponent = <a href={text.href} target={text.target}>{text.title}</a>
      } else {
        columnComponent =
        <Link
          to={text.href}
        >
          {text.title}
        </Link>
      }
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
      columnComponent = <RowAction key={column.key} actions={text} current={actionRef.current} />;
    }

    return columnComponent;
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

  const getTableDatasource:any = async (key:string) =>  {
    const result = await get({
      actionUrl: history.location.query.api,
      ...history.location.query
    });
    const table = findComponent(result.data,key);
    return table.datasource;
  }

  return (
    <ProTable
      key={props.table.key}
      actionRef={actionRef}
      rowKey={props.table.rowKey}
      headerTitle={props.table.headerTitle}
      columns={parseColumns(props.table.columns)}
      search={props.table.search}
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

        const datasource = await getTableDatasource(props.table.key);

        return Promise.resolve({
          data: datasource,
          success: true,
        });
      }}
      pagination={props.table.pagination}
      dateFormatter="string"
      toolBarRender={() => [
        <Button>
          导出数据
        </Button>,
        <Button type="primary">创建应用</Button>,
      ]}
    />
  );
}

export default Table;