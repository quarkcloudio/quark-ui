import React, { useRef, useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import { get, post } from '@/services/action';
import Render from '@/components/Render';
import QueryFilter from '@/components/Table/QueryFilter';
import Action from '@/components/Action/Action';
import {
  Popover,
  Space
} from 'antd';
import { EditableRow, EditableCell } from './Editable';
import styles from './Table.less'

export interface Table {
  key: number;
  table: any;
}

const Table: React.FC<Table> = (props:any) => {
  const actionRef = useRef<any>(undefined);
  const query:any = history.location.query;

  // 注册全局变量
  window[props.tableKey] = actionRef;

  // 渲染column
  const columnRender = (column:any, row:any, text:any) => {

    if(column.valueType === 'option') {
      text = <Render body={column.actions} data={row} callback={props.callback} />;
    }

    if(column.valueType === 'text') {
      text = <Render body={text} data={row} callback={props.callback} />;
    }

    return text;
  }

  const editableSave = async (data:any) => {
    const result = await get({
      actionUrl: data.editable.action,
      id: data.id,
      ...data.values
    });
    if(result.status === 'success') {
      actionRef.current.reload();
    }
  };

  // 解析column
  const parseColumns = (columns:any) => {
    columns.map((item:any,key:any) => {
      item.render = (text:any, row:any) => (
        columnRender(item, row, text)
      );
      columns[key] = item;
    })

    columns = columns.map((column:any) => {
      if (!column.editable) {
        return column;
      }
      return {
        ...column,
        onCell: (record:any) => ({
          record,
          editable: column.editable,
          dataIndex: column.dataIndex,
          title: column.title,
          handleSave: editableSave,
        }),
      };
    });

    return columns;
  }

  const findComponent:any = (data:any,key:string) => {
    let component = [];

    if(data.key === key) {
      return data;
    }

    if(data.hasOwnProperty('body')) {
      return findComponent(data.body,key);
    }

    if(data.hasOwnProperty(0)) {
      component = (data.map((item:any) => {
        return findComponent(item,key);
      }));
    }

    return component
  }

  const getTableDatasource:any = async (key:string) => {
    let result,table = null;
    const api = props.api ? props.api : query.api;

    if(props.apiType === 'GET') {
      result = await get({
        actionUrl: api,
        ...query
      });
    } else if(props.apiType === 'POST') {
      result = await post({
        actionUrl: api,
        ...query
      });
    }

    if(props.api) {
      table = result.data;
    } else {
      table = findComponent(result,key);
    }

    return table;
  }

  return (
    <>
      {(props.autoBuildSearchFrom === false && props.search) ? <QueryFilter search={props.search} current={actionRef.current}/> : null}
      <ProTable
        {...props}
        search={props.autoBuildSearchFrom}
        actionRef={actionRef}
        columns={props.columns ? parseColumns(props.columns) : []}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
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
          const data = {
            ids:selectedRowKeys,
            id:selectedRowKeys
          };
          return (
            props.batchActions ? <Render body={props.batchActions} data={props.data} callback={onCleanSelected} /> : null
          );
        }}
        request={async (params:any, sorter:any, filter:any) => {
          let getQuery:any = query;

          getQuery['page'] = params.current;
          getQuery['pageSize'] = params.pageSize;
          getQuery['search'] = query.search;

          if(JSON.stringify(sorter) != "{}") {
            getQuery['sorter'] = sorter;
          }

          if(JSON.stringify(filter) != "{}") {
            getQuery['filter'] = filter;
          }

          history.push({ pathname: history.location.pathname, query: getQuery });

          const table = await getTableDatasource(props.tableKey);

          return Promise.resolve({
            data: table.datasource,
            total: table?.pagination?.total,
            success: true,
          });
        }}
        toolbar={{
          ...props.toolBar,
          actions: props.toolBar?.actions ? [<Render body={props.toolBar?.actions} data={props.data} callback={props.callback} />] : undefined,
        }}
        rowClassName={(record, index)=> {
          if(props.striped) {
            if(index%2 != 0) {
              return styles.oddTr;
            } 
          } else {
            return null;
          }
        }}
      />
    </>
  );
}

export default Table;