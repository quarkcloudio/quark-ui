import React, { useRef } from 'react';
import ProForm, { ProFormText, ProFormCheckbox, ProFormRadio, ProFormUploadButton } from '@ant-design/pro-form';
import ImageUploader from './ImageUploader';
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

const Form: React.FC<Table> = (props:any) => {

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  // 解析表单item
  const formItemRender = (items:any) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'text':
            if(item.component === 'text') {
              component = 
              <ProFormText
                key={item.key}
                name={item.name}
                label={item.label}
                tooltip={item.tooltip}
                placeholder={item.placeholder}
                style={item.style}
                width={item.width}
                disabled={item.disabled}
                rules={item.frontendRules}
                fieldProps={{
                  allowClear:item.allowClear,
                  maxLength:item.maxLength,
                  addonAfter:item.addonAfter,
                  addonBefore:item.addonBefore,
                  size:item.size
                }}
              />;
            }

            if(item.component === 'password') {
              component = 
              <ProFormText.Password
                key={item.key}
                name={item.name}
                label={item.label}
                tooltip={item.tooltip}
                placeholder={item.placeholder}
                style={item.style}
                width={item.width}
                disabled={item.disabled}
                rules={item.frontendRules}
                fieldProps={{
                  allowClear:item.allowClear,
                  maxLength:item.maxLength,
                  addonAfter:item.addonAfter,
                  addonBefore:item.addonBefore,
                  size:item.size
                }}
              />;
            }
            break;
          case 'hidden':
            component = 
            <span key={item.key} style={{display:'none'}}>
              <ProFormText
                key={item.key}
                name={item.name}
              />
            </span>;
            break;
          case 'checkbox':
            component = 
            <ProFormCheckbox.Group
              key={item.key}
              name={item.name}
              label={item.label}
              style={item.style}
              width={item.width}
              disabled={item.disabled}
              options={item.options}
              layout={item.layout}
              rules={item.frontendRules}
            />;
            break;
          case 'radio':
            component = 
            <ProFormRadio.Group
              key={item.key}
              name={item.name}
              label={item.label}
              style={item.style}
              width={item.width}
              disabled={item.disabled}
              options={item.options}
              rules={item.frontendRules}
            />;
            break;
          case 'image':
            component = 
            <ImageUploader
              key={item.key}
              name={item.name}
              label={item.label}
              title={item.button}
              action="upload.do"
            />;
            break;
          default:
            component = 
            <>
              无{item.component}组件
            </>
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
      layout={props.form.layout}
      labelCol={props.form.labelCol}
      wrapperCol={props.form.wrapperCol}
    >
      {formItemRender(props.form.items)}
    </ProForm>
  );
}

export default Form;