import React from 'react';
import { useModel } from 'umi';
import {
  ProFormText,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSwitch,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit
} from '@ant-design/pro-form';
import { createFromIconfontCN } from '@ant-design/icons';
import {
  Tree,
  Form,
  Select
} from 'antd';

import ImageUploader from './ImageUploader';
import FileUploader from './FileUploader';

export interface Table {
  form: any;
  items: any;
  initialValues: any;
}

const FormItem: React.FC<Table> = (props:any) => {

  const { initialState } = useModel('@@initialState');
  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });

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
          case 'inputNumber':
            component = 
            <ProFormDigit
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
              placeholder={item.placeholder}
              min={item.min}
              max={item.max}
              fieldProps={{
                step:item.step,
                precision:item.precision,
              }}
            />;
            break;
          case 'icon':
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              style={item.style}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Select disabled={item.disabled} style={item.style ? item.style : []}>
                <Select.Option key={0} value={0}>
                  无图标
                </Select.Option>
                {item.options.map((item: any) => {
                  return (
                    <Select.Option key={item} value={item}>
                      <IconFont type={item} /> {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
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
              form={props.form}
              name={item.name}
              label={item.label}
              mode={item.mode}
              title={item.button}
              limitType={item.limitType}
              limitSize={item.limitSize}
              limitNum={item.limitNum}
              value={props.initialValues? props.initialValues[item.name] : null}
              action={item.api}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            />;
            break;
          case 'file':
            component = 
            <FileUploader
              key={item.key}
              form={props.form}
              name={item.name}
              label={item.label}
              title={item.button}
              limitType={item.limitType}
              limitSize={item.limitSize}
              limitNum={item.limitNum}
              value={props.initialValues? props.initialValues[item.name] : null}
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
          case 'select':
            component = 
            <ProFormSelect
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
              placeholder={item.placeholder}
              options={item.options}
              mode={item.mode}
              fieldProps={{
                allowClear:item.allowClear,
                size:item.size
              }}
            />;
            break;
          case 'tree':
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              valuePropName={'checkedKeys'}
              trigger={'onCheck'}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Tree
                checkable
                style={item.style ? item.style : []}
                treeData={item.treeData}
              />
            </Form.Item>;
            break;
          default:
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <span key={item.key}>
                无{item.component}组件
              </span>
            </Form.Item>;
            break;
        }
        return component;
      })
    )
    return formItemComponent;
  }

  return (
    props.items ? formItemRender(props.items) : null
  );
}

export default FormItem;