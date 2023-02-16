import React, { useRef, useEffect, useState } from 'react';
import { ProTable, ProTableProps } from '@ant-design/pro-components';
import { useModel, useLocation } from '@umijs/max';
import { Button, Space, Card, message } from 'antd';
import qs from 'query-string';
import { EditableRow, EditableCell } from './Editable';
import { get, post } from '@/services/action';
import { getComponent } from '@/utils/component';
import Render from '@/components/Render';
import SearchField from '@/components/Form/Field';
import styles from './index.less';

export interface TableExtendProps {
  component?: string;
  componentkey?: string;
  api?: string;
  apiType?: string;
  batchActions?: any;
  columns?: any;
  toolBar?: any;
  search?: any;
  striped?: boolean;
  tableExtraRender?: any;
  pagination?: any;
  body?: any;
  data?: any;
  callback?: any;
}

const defaultProps = {
  rowKey: 'id',
} as TableExtendProps;

const Table: React.FC<ProTableProps<any, any, any> & TableExtendProps> = (
  props,
) => {
  const actionRef = useRef<any>(undefined);
  const formRef = useRef<any>(undefined);
  const location = useLocation();
  const query = qs.parse(location.search);
  const { object, setObject } = useModel('object');
  const [ columns, setColumns ] = useState(props.columns);
  const [ toolBar, setToolBar ] = useState(props.toolBar);
  const getObject: any = object;
  const {
    componentkey,
    api,
    apiType,
    batchActions,
    search,
    striped,
    data,
    callback,
    rowKey, // 以下为默认属性
    tableLayout,
    headerTitle,
    rowSelection,
    options,
    dateFormatter,
    columnEmptyText,
    pagination,
    scroll,
    polling,
    tableExtraRender,
  } = { ...defaultProps, ...props };

  useEffect(() => {
    actionRef.current.reload();
  }, [search, tableExtraRender]);

  // 注册全局变量
  if (componentkey) {
    getObject[componentkey] = actionRef;
    setObject(getObject);
  }

  // 渲染column
  const columnRender = (column: any, row: any, text: any) => {
    if (column.valueType === 'option') {
      text = (
        <Render
          body={column.actions}
          data={{ ...query, ...row }}
          callback={callback}
        />
      );
    }
    if (column.valueType === 'text') {
      if (typeof text === 'string' || typeof text === 'number') {
        text = <Render body={text} data={row} callback={callback} />;
      }
    }

    return text;
  };

  // 行内编辑
  const editableSave = async (data: any) => {
    const result = await get({
      url: data.editable.action,
      data: {
        id: data.id,
        ...data.values,
      },
    });
    if (result.status === 'success') {
      actionRef.current.reload();
    } else {
      message.error(result.msg);
    }
  };

  // 解析column
  const parseColumns = (columns: any) => {
    columns.forEach((item: any, key: any) => {
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

    // 解析搜索栏
    if (search.items) {
      search.items.forEach((searchItem: any) => {
        const columnItem = {
          title: searchItem.label,
          key: searchItem.name,
          hideInTable: true,
          dataIndex: searchItem.name,
          renderFormItem: (item: any, option: any, form: any) => {
            const { type } = option;
            if (type === 'form') {
              return null;
            }

            // 将form对象注册到全局
            getObject[search.componentkey] = form;
            setObject(getObject);

            return (
              <SearchField
                {...searchItem}
                form={form}
                label={undefined}
                wrapperCol={{ span: 0, offset: 0 }}
                data={{ formKey: search.componentkey }}
              />
            );
          },
        };
        columns.push(columnItem);
      });
    }

    return columns;
  };

  // 获取当前table组件数组
  const getTable: any = async (
    key: string,
    params: any,
    sorter: any,
    filter: any,
  ) => {
    let result,
      table = null;
    const getApi = api ? api : query.api;

    if (apiType === 'GET') {
      result = await get({
        url: getApi,
        data: {
          search: JSON.stringify(params),
          sorter: JSON.stringify(sorter),
          filter: JSON.stringify(filter),
        },
      });
    }
    if (apiType === 'POST') {
      result = await post({
        url: getApi,
        data: {
          search: params,
          sorter: sorter,
          filter: filter,
        },
      });
    }
    if (api) {
      table = result.data;
    } else {
      table = getComponent(result, key);
    }

    return table;
  };

  return (
    <ProTable
      actionRef={actionRef}
      formRef={formRef}
      rowKey={rowKey}
      tableLayout={tableLayout}
      headerTitle={headerTitle}
      rowSelection={rowSelection}
      options={options}
      dateFormatter={dateFormatter}
      columnEmptyText={columnEmptyText}
      scroll={scroll}
      polling={polling}
      columns={columns && parseColumns(columns)}
      search={{
        filterType: search.filterType,
        searchText: search.searchText,
        resetText: search.resetText,
        labelWidth: search.labelWidth,
        span: search.span,
        className: search.className,
        defaultCollapsed: search.defaultCollapsed,
        showHiddenNum: search.showHiddenNum,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom,
          search.exportText && (
            <Button
              key="export"
              type="primary"
              onClick={() => {
                let getQuery: any = { ...query };
                let url = search.exportApi;
                getQuery['search'] = formRef.current?.getFieldsFormatValue?.();
                getQuery['token'] = sessionStorage.getItem('token');

                window.open(`${url}?${qs.stringify(getQuery)}`);
              }}
            >
              {search.exportText}
            </Button>
          ),
        ],
      }}
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
        return (
          batchActions && (
            <Render
              body={batchActions}
              data={{
                ...data,
                ids: selectedRowKeys,
                id: selectedRowKeys,
              }}
              callback={onCleanSelected}
            />
          )
        );
      }}
      request={async (params: any, sorter: any, filter: any) => {
        // 获取table对象
        const table = await getTable(
          props.componentkey,
          params,
          sorter,
          filter,
        );

        // 更新表头
        setColumns(table.columns)

        // 更新toolbar
        setToolBar(table.toolBar)

        // 返回数据
        return Promise.resolve({
          data: table.datasource,
          total: table?.pagination?.total,
          page: table?.pagination?.page,
          current: table?.pagination?.current,
          success: true,
        });
      }}
      toolbar={{
        ...toolBar,
        actions: toolBar?.actions && [
          <Render
            key="toolBar"
            body={toolBar?.actions}
            data={{ ...data, ...query }}
            callback={callback}
          />,
        ],
      }}
      tableExtraRender={
        tableExtraRender &&
        ((_, data) => {
          if (tableExtraRender) {
            return (
              <Card>
                <Render
                  body={tableExtraRender}
                  data={{ ...data, ...query }}
                  callback={callback}
                />
              </Card>
            );
          }
        })
      }
      pagination={
        pagination ? {
          defaultCurrent: pagination?.defaultCurrent
            ? pagination.defaultCurrent
            : 1,
          defaultPageSize: pagination?.pageSize ? pagination.pageSize : 10,
        } : false
      }
      rowClassName={(record, index) => {
        if (striped && index % 2 !== 0) {
          return styles.oddTr;
        }
        return '';
      }}
    />
  );
};

export default Table;
