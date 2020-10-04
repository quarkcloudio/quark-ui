import React, { useRef } from 'react';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import {
  Popover,
  Space
} from 'antd';

export interface Table {
  key: number;
  form: any;
}

const Form: React.FC<Table> = (props) => {

  // 解析表单item
  const formItemRender = (items:any) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'text':
            component = 
            <ProFormText
              key={item.key}
              name={item.name}
              label={item.label}
              tooltip={item.tooltip}
              placeholder={item.placeholder}
            />;
            break;

          default:
            break;
        }
        return component;
      })
    )
    return formItemComponent;
  }

  return (
    <ProForm
      style={props.form.style}
      colon={props.form.colon}
      initialValues={props.form.initialValues}
      labelAlign={props.form.labelAlign}
      name={props.form.name}
      preserve={props.form.preserve}
      requiredMark={props.form.requiredMark}
      scrollToFirstError={props.form.scrollToFirstError}
      size={props.form.size}
      dateFormatter={props.form.dateFormatter}
      layout={props.form.layout}
    >
      {formItemRender(props.form.items)}
    </ProForm>
  );
}

export default Form;