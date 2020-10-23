import React, { useState } from 'react';
import { useModel } from 'umi';
import {
  ProFormText,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSwitch,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker
} from '@ant-design/pro-form';
import { createFromIconfontCN,MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import {
  Tree,
  Form,
  Select,
  Cascader,
  Space,
  Button,
  TimePicker
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import ImageUploader from './ImageUploader';
import FileUploader from './FileUploader';
import Search from './Search';
import Map from './Map';
import Editor from './Editor';

export interface FormItem {
  items: any;
  field?:any;
  form?:any;
}

const FormItem: React.FC<FormItem> = (props:any) => {
  const { initialState } = useModel('@@initialState');
  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });
  
  //hack
  const [random, setRandom] = useState(0);

  const onChange = (e:any,name:string) => {
    let item = {};
    item[name] = e.target.value;
    props.form.setFieldsValue(item);
    setRandom(Math.random);
  };

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
                name={props.field ? [props.field.name, item.name] : item.name}
                fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
                  size:item.size,
                  onChange:(e)=>{onChange(e,item.name)}
                }}
              />;
            }

            if(item.type === 'password') {
              component = 
              <ProFormText.Password
                key={item.key}
                name={props.field ? [props.field.name, item.name] : item.name}
                fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              style={item.style}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Select disabled={item.disabled}>
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
                name={props.field ? [props.field.name, item.name] : item.name}
                fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              />
            </span>;
            break;
          case 'checkbox':
            component = 
            <ProFormCheckbox.Group
              key={item.key}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              label={item.label}
              style={item.style}
              width={item.width}
              disabled={item.disabled}
              options={item.options}
              layout={item.layout}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              fieldProps={{
                onChange:(e)=>{onChange(e,item.name)}
              }}
            />;
            break;
          case 'radio':
            component = 
            <ProFormRadio.Group
              key={item.key}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              label={item.label}
              style={item.style}
              width={item.width}
              disabled={item.disabled}
              options={item.options}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              fieldProps={{
                onChange:(e)=>{onChange(e,item.name)}
              }}
            />;
            break;
          case 'image':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              style={item.style}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <ImageUploader
                key={item.key}
                mode={item.mode}
                title={item.button}
                limitType={item.limitType}
                limitSize={item.limitSize}
                limitNum={item.limitNum}
                action={item.api}
              />
            </Form.Item>;
            break;
          case 'file':
            component =
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              style={item.style}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <FileUploader
                key={item.key}
                title={item.button}
                limitType={item.limitType}
                limitSize={item.limitSize}
                limitNum={item.limitNum}
                action={item.api}
              />
            </Form.Item>;
            break;
          case 'switch':
            component = 
            <ProFormSwitch
              key={item.key}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
                unCheckedChildren:item.options.off,
                onChange:(e)=>{onChange(e,item.name)}
              }}
            />;
            break;
          case 'select':
            component = 
            <ProFormSelect
              key={item.key}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
                size:item.size,
                onChange:(e)=>{onChange(e,item.name)}
              }}
            />;
            break;
          case 'tree':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
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
          case 'cascader':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Cascader
                size={item.size}
                options={item.options}
                style={item.style}
                placeholder={item.placeholder}
              />
            </Form.Item>;
            break;
          case 'date':
            component = 
            <ProFormDatePicker
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
              placeholder={item.placeholder}
              fieldProps={{
                allowClear:item.allowClear,
                size:item.size
              }}
            />;
            break;
          case 'datetime':
            component = 
            <ProFormDateTimePicker
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
              placeholder={item.placeholder}
              fieldProps={{
                allowClear:item.allowClear,
                size:item.size
              }}
            />;
            break;
          case 'dateRange':
            component = 
            <ProFormDateRangePicker
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
              placeholder={item.placeholder}
              fieldProps={{
                allowClear:item.allowClear,
                size:item.size
              }}
            />;
            break;
          case 'datetimeRange':
            component = 
            <ProFormDateTimeRangePicker
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
              placeholder={item.placeholder}
              fieldProps={{
                allowClear:item.allowClear,
                size:item.size
              }}
            />;
            break;
          case 'timeRange':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <TimePicker.RangePicker
                size={item.size}
                locale={locale}
                format={item.format}
              />
            </Form.Item>;
            break;
          case 'display':
            component = 
            <Form.Item label={item.label}>
              <span style={item.style ? item.style : []}>
                {item.value}
              </span>
            </Form.Item>
            break;
          case 'editor':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Editor
                key={item.key}
                height={item?.style?.height}
                width={item?.style?.width}
              />
            </Form.Item>;
            break;
          case 'list':
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Form.List key={item.name} name={item.name}>
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map(field => (
                        <Space
                          key={field.key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="start"
                        >
                          <FormItem form={props.form} items={item.items} field={field}/>
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Space>
                      ))}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          block
                        >
                          <PlusOutlined /> {item.button}
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
            </Form.Item>;
            break;
          case 'search':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Search
                mode={item.mode}
                size={item.size}
                placeholder={item.placeholder}
                style={item.style}
                options={item.options}
                api={item.api}
              />
            </Form.Item>;
            break;
          case 'map':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Map
                zoom={item.zoom}
                mapKey={item.mapKey}
                style={item.style}
              />
            </Form.Item>;
            break;
          default:
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={props.field ? [props.field.name, item.name] : item.name}
              fieldKey={props.field ? [props.field.fieldKey, item.name] : item.name}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <span key={item.key}>
                无{item.component}组件
              </span>
            </Form.Item>;
            break;
        }

        // 解析when
        if(item.when) {
          var whenItemComponent:any = null;
          item.when.map((whenItem:any,key:any) => {
            switch (whenItem.operator) {
              case '=':
                if(props.form.getFieldValue(item.name) == whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case '>':
                if(props.form.getFieldValue(item.name) > whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case '<':
                if(props.form.getFieldValue(item.name) < whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case '<=':
                if(props.form.getFieldValue(item.name) <= whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case '>=':
                if(props.form.getFieldValue(item.name) >= whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case 'has':
                if(props.form.getFieldValue(item.name).indexOf(whenItem.value) != -1) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              case 'in':
                if(whenItem.value.indexOf(props.form.getFieldValue(item.name)) != -1) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
              default:
                if(item.value == whenItem.value) {
                  whenItemComponent = formItemRender(whenItem.items)
                }
                break;
            }
          });

          return <>{component}{whenItemComponent}</>;
        } else {
          return component;
        }
      })
    )
    return formItemComponent;
  }

  return (
    props.items ? formItemRender(props.items) : null
  );
}

export default FormItem;