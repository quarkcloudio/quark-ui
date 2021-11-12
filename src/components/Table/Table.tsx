import React, { useRef, useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import { get, post } from '@/services/action';
import Render from '@/components/Render';
import QueryFilter from '@/components/Table/QueryFilter';
import { Image, Space, Card } from 'antd';
import { EditableRow, EditableCell } from './Editable';
import styles from './Table.less';

export interface Table {
  key: number;
  table: any;
}

const Table: React.FC<Table> = (props: any) => {
  const actionRef = useRef<any>(undefined);
  const formRef = useRef<any>(undefined);
  const query: any = history.location.query;
  const [tableProps, setTable] = useState<any>(props);

  useEffect(() => {
    actionRef.current.reload();
  }, [
    props.columns,
    props.search,
    props.toolBar,
    props.menu,
    props.tableExtraRender,
  ]);

  // 注册全局变量
  window[props.tableKey] = actionRef;

  // 渲染column
  const columnRender = (column: any, row: any, text: any) => {
    if (column.valueType === 'option') {
      text = (
        <Render
          body={column.actions}
          data={{ ...query, ...row }}
          callback={tableProps.callback}
        />
      );
    }

    if (column.valueType === 'text') {
      text = <Render body={text} data={row} callback={tableProps.callback} />;
    }

    return text;
  };

  const editableSave = async (data: any) => {
    const result = await get({
      actionUrl: data.editable.action,
      id: data.id,
      ...data.values,
    });
    if (result.status === 'success') {
      actionRef.current.reload();
    }
  };

  // 解析column
  const parseColumns = (columns: any) => {
    columns.map((item: any, key: any) => {
      item.render = (text: any, row: any) => columnRender(item, row, text);
      columns[key] = item;
    });

    columns = columns.map((column: any) => {
      if (!column.editable) {
        return column;
      }
      return {
        ...column,
        onCell: (record: any) => ({
          record,
          editable: column.editable,
          dataIndex: column.dataIndex,
          title: column.title,
          handleSave: editableSave,
        }),
      };
    });

    return columns;
  };

  const findComponent: any = (data: any, key: string) => {
    let component: any = [];

    if (data.key === key) {
      return data;
    }

    // tab做特殊处理
    if (data.hasOwnProperty('tabPanes')) {
      return findComponent(data.tabPanes, key);
    }

    if (data.hasOwnProperty('body')) {
      return findComponent(data.body, key);
    }

    if (data.hasOwnProperty(0)) {
      data.map((item: any) => {
        let getComponent = findComponent(item, key);
        let getComponentKeys = Object.keys(getComponent);
        if (getComponentKeys.length > 0) {
          component = getComponent;
        }
      });
    }

    return component;
  };

  const getTableDatasource: any = async (key: string) => {
    let result,
      table = null;
    const api = tableProps.api ? tableProps.api : query.api;

    if (tableProps.apiType === 'GET') {
      result = await get({
        actionUrl: api,
        ...query,
      });
    } else if (tableProps.apiType === 'POST') {
      result = await post({
        actionUrl: api,
        ...query,
      });
    }

    if (tableProps.api) {
      table = result.data;
    } else {
      table = findComponent(result, key);
    }

    return table;
  };

  const onMenuChange = (key: any) => {
    let getQuery: any = { ...query };

    delete getQuery['search'];
    delete getQuery['sorter'];
    delete getQuery['filter'];
    
    getQuery['page'] = 1;
    getQuery['menuKey'] = key;

    history.push({ pathname: history.location.pathname, query: getQuery });

    actionRef.current.reload();
    formRef.current.resetFields();
  };

  return (
    <>
      {tableProps.autoBuildSearchFrom === false && tableProps.search ? (
        <QueryFilter
          formRef={formRef}
          search={tableProps.search}
          current={actionRef.current}
        />
      ) : null}
      <ProTable
        {...tableProps}
        search={tableProps.autoBuildSearchFrom}
        actionRef={actionRef}
        columns={tableProps.columns ? parseColumns(tableProps.columns) : []}
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
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          const data = {
            ...tableProps.data,
            ids: selectedRowKeys,
            id: selectedRowKeys,
          };
          return tableProps.batchActions ? (
            <Render
              body={tableProps.batchActions}
              data={data}
              callback={onCleanSelected}
            />
          ) : null;
        }}
        request={async (params: any, sorter: any, filter: any) => {
          let getQuery: any = query;

          getQuery['page'] = params.current;
          getQuery['pageSize'] = params.pageSize;
          getQuery['search'] = query.search;

          if (JSON.stringify(sorter) != '{}') {
            getQuery['sorter'] = sorter;
          }

          if (JSON.stringify(filter) != '{}') {
            getQuery['filter'] = filter;
          }

          history.push({
            pathname: history.location.pathname,
            query: getQuery,
          });

          const getTable = await getTableDatasource(props.tableKey);

          setTable(getTable);

          return Promise.resolve({
            data: getTable.datasource,
            total: getTable?.pagination?.total,
            success: true,
          });
        }}
        toolbar={{
          ...tableProps.toolBar,
          actions: tableProps.toolBar?.actions
            ? [
                <Render
                  body={tableProps.toolBar?.actions}
                  data={{ ...tableProps.data, ...query }}
                  callback={tableProps.callback}
                />,
              ]
            : undefined,
          menu: tableProps.toolBar?.menu
            ? {
                ...tableProps.toolBar?.menu,
                activeKey: query?.menuKey ?? tableProps.toolBar?.menu.activeKey,
                onChange: (key) => {
                  onMenuChange(key);
                },
              }
            : undefined,
        }}
        tableExtraRender={
          tableProps.tableExtraRender
            ? (_, data) => {
                if (tableProps.tableExtraRender) {
                  return (
                    <Card>
                      <Render
                        body={tableProps.tableExtraRender}
                        data={{ ...tableProps.data, ...query }}
                        callback={tableProps.callback}
                      />
                    </Card>
                  );
                }
              }
            : undefined
        }
        pagination={
          tableProps.pagination
            ? {
                ...tableProps.pagination,
                current: query.page ?? 1,
              }
            : false
        }
        rowClassName={(record, index) => {
          if (tableProps.striped) {
            if (index % 2 != 0) {
              return styles.oddTr;
            }
          } else {
            return null;
          }
        }}
      />
    </>
  );
};

export default Table;
