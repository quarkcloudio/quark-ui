import React, { useState } from 'react';
import { ActionType }from '@ant-design/pro-table';
import { history } from 'umi';
import { get } from '@/services/action';
import ProForm, { 
  QueryFilter as ProQueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect
} from '@ant-design/pro-form';
import { 
  Input,Form
} from 'antd';

export interface Action {
  search: any;
  current?: ActionType;
}

const QueryFilter: React.FC<Action> = (props) => {

  const [form] = ProForm.useForm();
  //hack
  const [random, setRandom] = useState(0);
  const [items, setItems] = useState(props.search.items);
  const query:any = history.location.query;

  const onFinish = (values: any) => {
    let getQuery:any = {};

    getQuery['api'] = query.api;
    getQuery['page'] = 1;
    getQuery['pageSize'] = query.pageSize;

    getQuery['search'] = values;
    if(query.sorter) {
      getQuery['sorter'] = query.sorter;
    }

    if(query.filter) {
      getQuery['filter'] = query.filter;
    }

    // hack random
    getQuery['random'] = Math.random();

    history.push({ pathname: history.location.pathname, query: getQuery });
    
    if (props.current) {
      props.current.reload();
    }
  };

  const onReset = () => {
    let getQuery:any = {};

    getQuery['api'] = query.api;
    getQuery['page'] = query.page;
    getQuery['pageSize'] = query.pageSize;

    if(query.sorter) {
      getQuery['sorter'] = query.sorter;
    }

    if(query.filter) {
      getQuery['filter'] = query.filter;
    }

    // hack random
    getQuery['random'] = Math.random();

    history.push({ pathname: history.location.pathname, query: getQuery });
    
    if (props.current) {
      props.current.reload();
    }
  };

  const onSelectChange = async (value:any, name:string, load:any = null) => {
    if(load) {
      const promises = items.map(async (item:any,key:any) => {
        if(load.field === item.name && load.api) {
          const result = await get({
            actionUrl: load.api,
            search: value
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

  const searchComponent = (item:any) => {
    let component = null;
    switch(item.component) {
      case 'input':
        if(item.operator == 'between') {
          component = 
          <ProForm.Group title={item.label}>
            <ProFormText
              key={item.name+'_start'}
              name={item.name+'_start'}
              placeholder={item.placeholder[0]}
              style={item.style ? item.style : []}
            />
            <ProFormText
              key={item.name+'_end'}
              name={item.name+'_end'}
              placeholder={item.placeholder[1]}
              style={item.style ? item.style : []}
            />
          </ProForm.Group>
        } else {
          component = 
          <ProFormText
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            style={item.style ? item.style : []}
          />
        }

        break;
      case 'select':
        component = 
        <ProFormSelect
          key={item.name}
          label={item.label}
          name={item.name}
          options={item.options}
          style={item.style ? item.style : []}
          placeholder={item.placeholder}
          fieldProps={{
            onChange:(value)=>{onSelectChange(value,item.name,item.load)}
          }}
        />
        break;
      case 'multipleSelect':
        component = 
        <ProFormSelect
          mode="multiple"
          key={item.name}
          label={item.label}
          name={item.name}
          options={item.options}
          style={item.style ? item.style : []}
          placeholder={item.placeholder}
        />
        break;

      case 'datetime':
        if(item.operator == 'between') {
          component = 
          <ProFormDateTimeRangePicker
            key={item.name}
            label={item.label}
            name={item.name}
            placeholder={item.placeholder}
            style={item.style ? item.style : []}
          />
        } else {
          component = 
          <ProFormDateTimePicker
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            style={item.style ? item.style : []}
          />
        }
        break;

      case 'date':
        if(item.operator == 'between') {
          component = 
          <ProFormDateRangePicker
            key={item.name}
            label={item.label}
            name={item.name}
            placeholder={item.placeholder}
            style={item.style ? item.style : []}
          />
        } else {
          component = 
          <ProFormDatePicker
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            style={item.style ? item.style : []}
          />
        }
        break;

      case 'inputGroup':
        component = 
          <Form.Item label={item.label} labelAlign={props.search.labelAlign}>
            <Input.Group compact>
              <ProFormSelect
                key={item.name+'_start'}
                name={item.name+'_start'}
                options={item.options}
              />
              <ProFormText
                key={item.name+'_end'}
                name={item.name+'_end'}
                placeholder={item.placeholder}
              />
            </Input.Group>
          </Form.Item>
        ;
        break;

      default:
        component = null;
    }

    return component;
  };

  return (
    <div style={{
        marginBottom: '16px',
        padding: '24px 24px 0',
        background: '#fff'
      }}
    >
      <ProQueryFilter
        form={form}
        onFinish = {async (values) => { onFinish(values) }}
        onReset = {async () => { onReset() }}
        labelAlign = {props.search.labelAlign}
        size = {props.search.size}
        defaultCollapsed = {props.search.defaultCollapsed}
        hideRequiredMark = {props.search.hideRequiredMark}
        defaultColsNumber = {props.search.defaultColsNumber}
        labelWidth = {props.search.labelWidth}
        span = {props.search.span}
        split = {props.search.split}
      >
        {
          items?.length >0 ? items.map((item: any, key: any) => {
            return searchComponent(item);
          }) : null
        }
      </ProQueryFilter>
    </div>
  );
}

export default QueryFilter;