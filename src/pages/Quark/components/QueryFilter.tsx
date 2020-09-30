import React from 'react';
import { ActionType }from '@ant-design/pro-table';
import { stringify } from 'qs';
import { history } from 'umi';
import ProForm, { 
  QueryFilter as ProQueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect
} from '@ant-design/pro-form';

export interface Action {
  search: any;
  current?: ActionType;
}

const QueryFilter: React.FC<Action> = (props) => {
  const onFinish = (values: any) => {
    let query = {};
    query['api'] = history.location.query.api;
    query['page'] = history.location.query.page;
    query['pageSize'] = history.location.query.pageSize;

    query['search'] = values;
    query['sorter'] = history.location.query.sorter;
    query['filter'] = history.location.query.filter;

    history.push(history.location.pathname+'?'+stringify(query));
    
    if (props.current) {
      props.current.reload();
    }
  };

  const searchComponent = (item:any) => {
    switch(item.component) {
      case 'input':
        if(item.operator == 'between') {
          return (
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
          )
        } else {
          return (
            <ProFormText
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          )
        }

        break;
      case 'select':
        return (
          <ProFormSelect
            key={item.name}
            label={item.label}
            name={item.name}
            options={item.options}
            style={item.style ? item.style : []}
            placeholder={item.placeholder}
          />
        )
        
        break;
      case 'multipleSelect':
        return (
          <ProFormSelect
            mode="multiple"
            key={item.name}
            label={item.label}
            name={item.name}
            options={item.options}
            style={item.style ? item.style : []}
            placeholder={item.placeholder}
          />
        )

        break;

      case 'datetime':
        if(item.operator == 'between') {
          return (
            <ProFormDateRangePicker
              key={item.name}
              label={item.label}
              name={item.name}
              style={item.style ? item.style : []}
            />
          )
        } else {
          return (
            <ProFormDatePicker
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
            />
          )
        }
        break;

      case 'inputGroup':
        return (
          <ProForm.Group title={item.label}>
            <ProFormSelect
              key={item.name+'_start'}
              name={item.name+'_start'}
              options={item.options}
              style={{ width : (item.style.width[0] ? item.style.width[0] : null)}}
            />
            <ProFormText
              key={item.name+'_end'}
              name={item.name+'_end'}
              style={{ width : (item.style.width[1] ? item.style.width[1] : null)}}
              placeholder={item.placeholder}
            />
          </ProForm.Group>
        )
        break;

      default:
        return null;
    }
  };

  return (
    <ProQueryFilter
      onFinish = {onFinish}
      labelAlign = {props.search.labelAlign}
      size = {props.search.size}
      defaultCollapsed = {props.search.defaultCollapsed}
      hideRequiredMark = {props.search.hideRequiredMark}
      defaultColsNumber = {props.search.defaultColsNumber}
      labelWidth = {props.search.labelWidth}
      span = {props.search.span}
      split = {props.search.split}
      style={{padding:'30px 30px 0px 0px'}}
    >
      {
        props.search.items.map((item: any, key: any) => {
          return searchComponent(item);
        })
      }
    </ProQueryFilter>
  );
}

export default QueryFilter;