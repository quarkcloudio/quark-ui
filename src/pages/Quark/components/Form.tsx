import React, { useRef } from 'react';
import ProForm, { ProFormText, ProFormCheckbox, ProFormRadio, ProFormSwitch, ProFormTextArea } from '@ant-design/pro-form';
import ImageUploader from './ImageUploader';
import FileUploader from './FileUploader';
import { history, Link } from 'umi';
import { get } from '@/services/action';
import {
  Form as AntForm
} from 'antd';

export interface Table {
  key: number;
  form: any;
}

const Form: React.FC<Table> = (props:any) => {

  const [form] = AntForm.useForm();

  // 解析表单item
  const formItemRender = (items:any) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'text':
            if(item.type === 'text') {
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
                extra={item.extra}
                help={item.help ? item.help : undefined}
                fieldProps={{
                  allowClear:item.allowClear,
                  maxLength:item.maxLength,
                  addonAfter:item.addonAfter,
                  addonBefore:item.addonBefore,
                  size:item.size
                }}
              />;
            }

            if(item.type === 'password') {
              component = 
              <ProFormText.PassWord
                key={item.key}
                name={item.name}
                label={item.label}
                tooltip={item.tooltip}
                placeholder={item.placeholder}
                style={item.style}
                width={item.width}
                disabled={item.disabled}
                rules={item.frontendRules}
                extra={item.extra}
                help={item.help ? item.help : undefined}
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
          case 'textArea':
            component = 
            <ProFormTextArea
              key={item.key}
              name={item.name}
              label={item.label}
              tooltip={item.tooltip}
              placeholder={item.placeholder}
              style={item.style}
              width={item.width}
              disabled={item.disabled}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              fieldProps={{
                maxLength:item.maxLength,
                autoSize:item.autoSize
              }}
            />;
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
              extra={item.extra}
              help={item.help ? item.help : undefined}
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
              extra={item.extra}
              help={item.help ? item.help : undefined}
            />;
            break;
          case 'image':
            component = 
            <ImageUploader
              key={item.key}
              form={form}
              name={item.name}
              label={item.label}
              mode={item.mode}
              title={item.button}
              limitType={item.limitType}
              limitSize={item.limitSize}
              limitNum={item.limitNum}
              value={item.value}
              action={item.api}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            />;
            break;
          case 'file':
            component = 
            <FileUploader
              key={item.key}
              form={form}
              name={item.name}
              label={item.label}
              title={item.button}
              limitType={item.limitType}
              limitSize={item.limitSize}
              limitNum={item.limitNum}
              value={item.value}
              action={item.api}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            />;
            break;
          case 'switch':
            component = 
            <ProFormSwitch
              key={item.key}
              name={item.name}
              label={item.label}
              style={item.style}
              width={item.width}
              tooltip={item.tooltip}
              disabled={item.disabled}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              rules={item.frontendRules}
              valuePropName={'checked'}
              fieldProps={{
                checkedChildren:item.options.on,
                unCheckedChildren:item.options.off
              }}
            />;
            break;
          default:
            component = 
            <span key={item.key}>
              无{item.component}组件
            </span>
            break;
        }
        return component;
      })
    )
    return formItemComponent;
  }

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <ProForm
      form={form}
      onFinish={async (values) => { onFinish(values) }}
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