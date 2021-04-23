import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import RowAction from './RowAction';
import QueryFilter from './QueryFilter';
import {
  Popover,
  Space
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import BatchAction from './BatchAction';
import ToolBarAction from './ToolBarAction';
import { EditableRow, EditableCell } from './Editable';
import styles from './Table.less'

export interface Table {
  key: number;
  table: any;
}

const Table: React.FC<Table> = (props:any) => {
  const actionRef = useRef<any>(undefined);

  // 渲染column
  const columnRender = (column:any, text:any) => {
    let columnComponent = null;

    if(column.link) {
      if(text.target === '_blank') {
        if(column.isHtml) {
          columnComponent = 
          <a
            style={column.style}
            href={text.href}
            target={text.target}
            dangerouslySetInnerHTML={{__html:text.title}}
          />
        } else {
          columnComponent = 
          <a
            style={column.style}
            href={text.href}
            target={text.target}
          >
            {text.title}
          </a>
        }
      } else {
        if(column.isHtml) {
          columnComponent =
          <Link
            to={text.href}
            style={column.style}
          >
            <span dangerouslySetInnerHTML={{__html:text.title}}/>
          </Link>
        } else {
          columnComponent =
          <Link
            to={text.href}
            style={column.style}
          >
            {text.title}
          </Link>
        }
      }
    } else {
      if(column.isHtml) {
        columnComponent = <span style={column.style} dangerouslySetInnerHTML={{__html:text}} />;
      } else {
        columnComponent = <span style={column.style}>{text}</span>;
      }
    }

    if(column.image) {
      columnComponent = <img src={text} width={column.image.width} height={column.image.height} />
    }

    if(column.qrcode) {
      let img:any = <img src={text} width={column.qrcode.width} height={column.qrcode.height} />;
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
          {columnRender(item, text)}
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

  const getTableDatasource:any = async () =>  {

    const result = await get({
      actionUrl: props.initApi,
      ...history.location.query
    });

    return result.data;
  }

  return (
    <>
      {props.search ? <QueryFilter search={props.search} current={actionRef.current}/> : null}
      <ProTable
        {...props}
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
          let query = {},table = null;
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

          table = await getTableDatasource();

          return Promise.resolve({
            data: table.datasource,
            total: table.pagination.total,
            success: true,
          });
        }}
        pagination={{...props.pagination}}
        toolbar={{
          multipleLine: false,
          actions: props.toolbar?.actions?.length > 0 ? [<ToolBarAction key={props.toolbar.key} actions={props.toolbar.actions} current={actionRef.current} />] : undefined,
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