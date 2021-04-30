import React, { useRef, useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import { get, post } from '@/services/action';
import Render from '@/components/Render';
import {
  Popover,
  Space
} from 'antd';
import BatchAction from './BatchAction';
import ToolBarAction from './ToolBarAction';
import { EditableRow, EditableCell } from './Editable';
import { useTableKeep } from './useTableKeep';
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
    let columnComponent = null;

    switch (column.valueType) {
      case 'option':
        columnComponent = <Render body={column.actions} data={row} />;
        break;

      default:
        columnComponent = <span style={column.style}>{text}</span>;
        break;
    }

    return columnComponent;
  }

  const editableSave = async (data:any) => {
    const result = await get({
      actionUrl: data.editable.action,
      key: 'editable',
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
        <>
          {columnRender(item, row, text)}
        </>
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
    let conmpontent = [];

    if(data.key === key) {
      return data;
    }

    if(data.hasOwnProperty('body')) {
      return findComponent(data.body,key);
    }

    if(data.hasOwnProperty(0)) {
      conmpontent = (data.map((item:any) => {
        return findComponent(item,key);
      }));
    }

    return conmpontent
  }

  const getTableDatasource:any = async (key:string,params:any) => {
    let result,table = null;
    const api = props.api ? props.api : params.api;

    if(props.apiType === 'GET') {
      result = await get({
        actionUrl: api,
        ...params
      });
    } else if(props.apiType === 'POST') {
      result = await post({
        actionUrl: api,
        ...params
      });
    }

    if(props.api) {
      table = result.data;
    } else {
      table = findComponent(result,key);
    }

    return table;
  }

  const keep = useTableKeep<any>()

  return (
    <ProTable
      {...props}
      // {...keep}
      // pagination = {{
      //   ...keep.pagination,
      //   current: props.pagination.current,
      //   pageSize: props.pagination.pageSize
      // }}
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
        return (
          <BatchAction actions={props.batchActions} selectedRowKeys={selectedRowKeys} onCleanSelected={onCleanSelected} current={actionRef.current} />
        );
      }}
      request={async (params:any, sorter:any, filter:any) => {

        params['api'] = query.api;
        params['page'] = params.current;

        if(JSON.stringify(sorter) != "{}") {
          params['sorter'] = sorter;
        }

        if(JSON.stringify(filter) != "{}") {
          params['filter'] = filter;
        }

        const table = await getTableDatasource(props.tableKey, params);

        return Promise.resolve({
          data: table.datasource,
          total: table?.pagination?.total,
          success: true,
        });
      }}
      toolbar={{
        multipleLine: false,
        actions: props.toolbar?.actions?.length > 0 ? [<ToolBarAction key={props.toolbar.key} actions={props.toolbar.actions} current={actionRef.current} />] : undefined,
      }}
      form={{
        syncToUrl:true,
        syncToInitialValues:true
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
  );
}

export default Table;