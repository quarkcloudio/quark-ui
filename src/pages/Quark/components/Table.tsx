import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import RowAction from '@/pages/Quark/components/RowAction';
import QueryFilter from '@/pages/Quark/components/QueryFilter';
import {
  Popover,
  Space
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import BatchAction from './BatchAction';
import ToolBarAction from './ToolBarAction';

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
    <>
      <QueryFilter search={props.table.search} current={actionRef.current}/>
      <ProTable
        key={props.table.key}
        actionRef={actionRef}
        rowKey={props.table.rowKey}
        headerTitle={props.table.headerTitle}
        columns={parseColumns(props.table.columns)}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected}) => {
          return (
            <BatchAction actions={props.table.batchActions} selectedRowKeys={selectedRowKeys} onCleanSelected={onCleanSelected} current={actionRef.current} />
          );
        }}
        options={props.table.options}
        search={false}
        request={async (params, sorter, filter) => {
          let query = {},datasource = null;
          query = history.location.query;

          query['page'] = params.current;
          query['pageSize'] = params.pageSize;
          query['search'] = history.location.query.search;

          if(JSON.stringify(sorter) != "{}") {
            query['sorter'] = sorter;
          }

          if(JSON.stringify(filter) != "{}") {
            query['filter'] = filter;
          }

          history.push({ pathname: history.location.pathname, query: query });

          datasource = await getTableDatasource(props.table.key);

          return Promise.resolve({
            data: datasource,
            success: true,
          });
        }}
        pagination={props.table.pagination}
        dateFormatter={props.table.dateFormatter}
        columnEmptyText={props.table.columnEmptyText}
        toolbar={{
          multipleLine: false,
          actions: [<ToolBarAction key={props.table.toolbar.key} actions={props.table.toolbar.actions} current={actionRef.current} />],
        }}
      />
    </>
  );
}

export default Table;