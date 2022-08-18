import React, { useState, useImperativeHandle, useRef } from 'react';
import { ActionType } from '@ant-design/pro-table';
import { history } from 'umi';
import { get } from '@/services/action';
import ProForm, {
  QueryFilter as ProQueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-form';
import Cascader from '../Form/Cascader';
import { Input, Form, Button } from 'antd';
import { stringify } from 'qs';

export interface Action {
  formRef?: any;
  search: any;
  current?: ActionType;
}

const QueryFilter: React.FC<Action> = (props) => {
  const [form] = ProForm.useForm();
  //hack
  const [random, setRandom] = useState(0);
  const [items, setItems] = useState(props.search.items);
  const query: any = history.location.query;

  useImperativeHandle(props.formRef, () => {
    return form;
  });

  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<
    ProFormInstance<{
      date: string;
    }>
  >();

  const onFinish = (values: any) => {
    let getQuery: any = { ...query };

    getQuery['page'] = 1;
    getQuery['search'] = values;
    // hack random
    getQuery['random'] = Math.random();

    history.push({ pathname: history.location.pathname, query: getQuery });

    if (props.current) {
      props.current.reload();
    }
  };

  const onReset = () => {
    let getQuery: any = { ...query };

    Object.keys(getQuery).forEach((key) => {
      if (key.indexOf('search[') != -1) {
        delete getQuery[key];
      }
    });

    delete getQuery['search'];
    // hack random
    getQuery['random'] = Math.random();

    history.push({ pathname: history.location.pathname, query: getQuery });

    if (props.current) {
      props.current.reload();
    }

    // 重置表单
    form.resetFields();
  };

  const onExport = () => {
    let getQuery: any = { ...query };
    let actionUrl = props.search.exportApi;

    getQuery['search'] = formRef.current?.getFieldsFormatValue?.();

    // hack random
    getQuery['random'] = Math.random();
    getQuery['token'] = sessionStorage.getItem('token');

    if (actionUrl.indexOf('http') == -1) {
      actionUrl = `../../api/${actionUrl}`;
    }

    window.open(`${actionUrl}?${stringify(getQuery)}`);
  };

  const onSelectChange = async (value: any, name: string, load: any = null) => {
    if (load) {
      const promises = items.map(async (item: any, key: any) => {
        if (load.field === item.name && load.api) {
          const result = await get({
            actionUrl: load.api,
            search: value,
          });

          item.options = result.data;
        }
        return item;
      });

      const getItems = await Promise.all(promises);
      setItems(getItems);
    }

    let getItem = {};
    getItem[name] = value;
    form.setFieldsValue(getItem);
    setRandom(Math.random);
  };

  const searchComponent = (item: any) => {
    let component = null;
    switch (item.component) {
      case 'input':
        if (item.operator == 'between') {
          component = (
            <ProForm.Group title={item.label}>
              <ProFormText
                key={item.name + '_start'}
                name={item.name + '_start'}
                placeholder={item.placeholder[0]}
                style={item.style ? item.style : []}
              />
              <ProFormText
                key={item.name + '_end'}
                name={item.name + '_end'}
                placeholder={item.placeholder[1]}
                style={item.style ? item.style : []}
              />
            </ProForm.Group>
          );
        } else {
          component = (
            <ProFormText
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          );
        }

        break;
      case 'select':
        component = (
          <ProFormSelect
            key={item.name}
            label={item.label}
            name={item.name}
            options={item.options}
            style={item.style ? item.style : []}
            placeholder={item.placeholder}
            fieldProps={{
              onChange: (value) => {
                onSelectChange(value, item.name, item.load);
              },
            }}
          />
        );
        break;
      case 'multipleSelect':
        component = (
          <ProFormSelect
            mode="multiple"
            key={item.name}
            label={item.label}
            name={item.name}
            options={item.options}
            style={item.style ? item.style : []}
            placeholder={item.placeholder}
          />
        );
        break;

      case 'datetime':
        if (item.operator == 'between') {
          component = (
            <ProFormDateTimeRangePicker
              key={item.name}
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          );
        } else {
          component = (
            <ProFormDateTimePicker
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          );
        }
        break;

      case 'date':
        if (item.operator == 'between') {
          component = (
            <ProFormDateRangePicker
              key={item.name}
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          );
        } else {
          component = (
            <ProFormDatePicker
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          );
        }
        break;

      case 'inputGroup':
        component = (
          <ProForm.Item label={item.label} labelAlign={props.search.labelAlign}>
            <Input.Group compact>
              <ProFormSelect
                key={item.name + '_start'}
                name={item.name + '_start'}
                options={item.options}
              />
              <ProFormText
                key={item.name + '_end'}
                name={item.name + '_end'}
                placeholder={item.placeholder}
              />
            </Input.Group>
          </ProForm.Item>
        );
        break;

      case 'cascader':
        component = (
          <ProForm.Item label={item.label} name={item.name}>
            <Cascader
              api={item.api}
              options={item.options}
              placeholder={item.placeholder}
            />
          </ProForm.Item>
        );
        break;

      default:
        component = null;
    }

    return component;
  };

  return (
    <div
      style={{
        marginBottom: '16px',
        padding: '24px 24px 0',
        background: '#fff',
      }}
    >
      <ProQueryFilter
        form={form}
        formRef={formRef}
        onFinish={async (values) => {
          onFinish(values);
        }}
        onReset={async () => {
          onReset();
        }}
        labelAlign={props.search.labelAlign}
        size={props.search.size}
        defaultCollapsed={props.search.defaultCollapsed}
        hideRequiredMark={props.search.hideRequiredMark}
        defaultColsNumber={props.search.defaultColsNumber}
        labelWidth={props.search.labelWidth}
        span={props.search.span}
        split={props.search.split}
        submitter={{
          // 完全自定义整个区域
          render: (submitterProps, doms) => {
            let buttons = [];

            if (props.search.showResetButton) {
              const restButton = (
                <Button
                  key="rest"
                  onClick={() => {
                    onReset();
                  }}
                >
                  {props.search.resetButton}
                </Button>
              );
              buttons.push(restButton);
            }

            if (props.search.showSubmitButton) {
              const submitButton = (
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => submitterProps.form?.submit?.()}
                >
                  {props.search.submitButton}
                </Button>
              );
              buttons.push(submitButton);
            }

            if (props.search.showExportButton) {
              const exportButton = (
                <Button key="export" type="primary" onClick={() => onExport()}>
                  {props.search.exportButton}
                </Button>
              );
              buttons.push(exportButton);
            }

            return buttons;
          },
        }}
      >
        {items?.length > 0
          ? items.map((item: any, key: any) => {
              return searchComponent(item);
            })
          : null}
      </ProQueryFilter>
    </div>
  );
};

export default QueryFilter;
