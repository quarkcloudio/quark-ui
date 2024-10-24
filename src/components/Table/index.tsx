import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ProTable, ProTableProps } from '@ant-design/pro-components';
import { useModel, useLocation, history } from '@umijs/max';
import { Button, Space, Card, message, Splitter, Input, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
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
  treeBar?: any;
  search?: any;
  striped?: boolean;
  tableExtraRender?: any;
  expandable?: any;
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
  const { fields, setFields } = useModel('formFields'); // 全局表单字段
  const [columns, setColumns] = useState(props.columns);
  const [toolBar, setToolBar] = useState(props.toolBar);
  const [treeBar, setTreeBar] = useState(props.treeBar);
  const [activeKey, setActiveKey] = useState<any>(undefined);
  const [treeBarSelectedKeys, setTreeBarSelectedKeys] =
    useState<any>(undefined);
  const [treeBarSearchValue, setTreeBarSearchValue] = useState('');

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
    expandable,
  } = { ...defaultProps, ...props };

  useEffect(() => {
    fields[search.componentkey] = search.items;
    setFields(fields);
  }, []);

  useEffect(() => {
    actionRef.current.reload();
  }, [search, tableExtraRender]);

  useEffect(() => {
    actionRef.current.reload(true);
  }, [activeKey]);

  const onTreeBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTreeBarSearchValue(value);
  };

  const onTreeBarSelect: TreeProps['onSelect'] = (selectedKeys) => {
    setTreeBarSelectedKeys(selectedKeys);
    actionRef.current?.reload();
  };

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data?.reduce((acc: TreeDataNode[], item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(treeBarSearchValue);

        // 如果title中包含searchValue，保留节点
        if (index > -1) {
          acc.push({ ...item });
        } else if (item.children) {
          // 递归过滤子节点
          const filteredChildren = loop(item.children);
          if (filteredChildren.length > 0) {
            // 如果有子节点包含searchValue，保留该节点并更新children
            acc.push({ ...item, children: filteredChildren });
          }
        }
        return acc;
      }, []);

    return loop(treeBar?.treeData);
  }, [treeBarSearchValue]);

  // 注册全局变量
  if (componentkey) {
    object[componentkey] = actionRef;
    setObject(object);
  }

  // 渲染column
  const columnRender = (column: any, row: any, text: any) => {
    switch (column.valueType) {
      case 'option':
        text = (
          <Render
            body={column.actions}
            data={{ ...query, ...row }}
            callback={callback}
          />
        );
        break;
      case 'text':
        if (typeof text === 'string' || typeof text === 'number') {
          text = <Render body={text} data={row} callback={callback} />;
        }
        break;
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
    if (result.type === 'success') {
      actionRef.current.reload();
    } else {
      message.error(result.content);
    }
  };

  // 解析column
  const parseColumns = (columns: any) => {
    columns = columns.map((column: any) => {
      // 渲染字符串和数字
      column = {
        ...column,
        render: (text: any, row: any) => columnRender(column, row, text),
      };

      // 渲染可编辑
      if (column.editable) {
        column = {
          ...column,
          onCell: (record: any) => ({
            record,
            editable: column.editable,
            dataIndex: column.dataIndex,
            title: column.title,
            handleSave: editableSave,
          }),
        };
      }

      return column;
    });

    // 解析搜索栏
    let searchItems: any = [];
    if (fields[search.componentkey]) {
      fields[search.componentkey].forEach((searchItem: any) => {
        const columnItem = {
          title: searchItem.label,
          key: searchItem.name,
          dataIndex: searchItem.name,
          hideInTable: true,
          fixed: true,
          renderFormItem: (item: any, option: any, form: any) => {
            const { type } = option;
            if (type === 'form') {
              return null;
            }

            // 将form对象注册到全局
            object[search.componentkey] = form;
            setObject(object);

            return (
              <SearchField
                {...searchItem}
                form={form}
                label={undefined}
                wrapperCol={{ offset: 0 }}
                data={{ componentkey: search.componentkey }}
              />
            );
          },
        };
        searchItems.push(columnItem);
      });
    }

    if (searchItems.length > 0) {
      columns = searchItems.concat(columns);
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
      table = null,
      data: any;
    const getApi = api ? api : query.api;

    if (apiType === 'GET') {
      data = {
        search: JSON.stringify(params),
        sorter: JSON.stringify(sorter),
        filter: JSON.stringify(filter),
        activeKey: JSON.stringify(activeKey),
        ...query,
      };

      if (treeBarSelectedKeys) {
        data[treeBar.name] = JSON.stringify(treeBarSelectedKeys);
      }

      result = await get({
        url: getApi,
        data: data,
      });
    }
    if (apiType === 'POST') {
      data = {
        search: params,
        sorter: sorter,
        filter: filter,
        activeKey,
        ...query,
      };

      if (treeBarSelectedKeys) {
        data[treeBar.name] = treeBarSelectedKeys;
      }

      result = await post({
        url: getApi,
        data: data,
      });
    }
    if (api) {
      table = result.data;
    } else {
      table = getComponent(result, key);
    }

    return table;
  };

  const tableComponent = (
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
      expandable={expandable}
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
                getQuery['search'] = JSON.stringify(
                  formRef.current?.getFieldsFormatValue?.(),
                );
                getQuery['token'] = localStorage.getItem('token');

                window.open(`${url}?${qs.stringify(getQuery)}`);
              }}
            >
              {search.exportText}
            </Button>
          ),
        ],
      }}
      onReset={() => {
        actionRef.current?.reload();
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
        setColumns(table.columns);

        // 更新toolbar
        if (table.toolBar && table.toolBar.menu) {
          table.toolBar.menu.onChange = (key: any) => {
            setActiveKey(key);
          };
        }
        setToolBar(table.toolBar);

        // 更新树形
        setTreeBar(table.treeBar);

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
        pagination
          ? {
              defaultCurrent: pagination?.defaultCurrent
                ? pagination.defaultCurrent
                : 1,
              defaultPageSize: pagination?.pageSize ? pagination.pageSize : 10,
            }
          : false
      }
      rowClassName={(record, index) => {
        if (striped && index % 2 !== 0) {
          return styles.oddTr;
        }
        return '';
      }}
    />
  );

  if (treeBar?.treeData) {
    return (
      <Splitter>
        <Splitter.Panel defaultSize="20%" min="20%" max="70%">
          <Card style={{ height: '100%' }}>
            <Input.Search
              placeholder={treeBar.placeholder}
              onChange={onTreeBarChange}
              style={{ marginBottom: 12 }}
            />
            <Tree {...treeBar} treeData={treeData} onSelect={onTreeBarSelect} />
          </Card>
        </Splitter.Panel>
        <Splitter.Panel>{tableComponent}</Splitter.Panel>
      </Splitter>
    );
  } else {
    return tableComponent;
  }
};

export default Table;
