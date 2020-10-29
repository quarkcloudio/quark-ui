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
import { createFromIconfontCN,PlusOutlined } from '@ant-design/icons';
import {
  Tree,
  Form,
  Select,
  Cascader,
  Space,
  Button,
  TimePicker,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Switch
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import ImageUploader from './ImageUploader';
import FileUploader from './FileUploader';
import Search from './Search';
import Map from './Map';
import Editor from './Editor';

export interface FormItem {
  items: any;
  form?:any;
}

const FormItem: React.FC<FormItem> = (props:any) => {
  const { initialState } = useModel('@@initialState');
  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });
  
  //hack
  const [random, setRandom] = useState(0);

  const onChange = (value:any,name:string) => {
    let item = {};
    item[name] = value;
    props.form.setFieldsValue(item);
    setRandom(Math.random);
  };

  // 解析表单item
  const formItemRender = (items:any,field:any = null) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'text':
            if(item.type === 'text') {
              component = 
              <Form.Item
                key={item.key}
                name={field ? [field.name, item.name] : item.name}
                fieldKey={field ? [field.fieldKey, item.name] : item.name}
                label={item.label}
                tooltip={item.tooltip}
                rules={item.frontendRules}
                extra={item.extra}
                help={item.help ? item.help : undefined}
              >
                <Input
                  placeholder={item.placeholder}
                  style={item.style ? item.style : []}
                  width={item.width}
                  disabled={item.disabled}
                  allowClear={item.allowClear}
                  maxLength={item.maxLength}
                  addonAfter={item.addonAfter}
                  addonBefore={item.addonBefore}
                  size={item.size}
                  onChange={(e)=>{onChange(e.target.value,item.name)}}
                />
              </Form.Item>;
            }

            if(item.type === 'password') {
              component = 
              <Form.Item
                key={item.key}
                name={field ? [field.name, item.name] : item.name}
                fieldKey={field ? [field.fieldKey, item.name] : item.name}
                label={item.label}
                tooltip={item.tooltip}
                rules={item.frontendRules}
                extra={item.extra}
                help={item.help ? item.help : undefined}
              >
                <Input.Password
                  placeholder={item.placeholder}
                  style={item.style ? item.style : []}
                  width={item.width}
                  disabled={item.disabled}
                  allowClear={item.allowClear}
                  maxLength={item.maxLength}
                  addonAfter={item.addonAfter}
                  addonBefore={item.addonBefore}
                  size={item.size}
                  onChange={(e)=>{onChange(e.target.value,item.name)}}
                />
              </Form.Item>;
            }
            break;
          case 'textArea':
            component = 
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            >
              <Input.TextArea
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
                disabled={item.disabled}
                allowClear={item.allowClear}
                maxLength={item.maxLength}
                autoSize={item.autoSize}
                onChange={(e)=>{onChange(e.target.value,item.name)}}
              />
            </Form.Item>;
            break;
          case 'inputNumber':
            component = 
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            >
              <InputNumber
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
                width={item.width}
                disabled={item.disabled}
                maxLength={item.maxLength}
                min={item.min}
                max={item.max}
                step={item.step}
                precision={item.precision}
                onChange={(value)=>{onChange(value,item.name)}}
              />
            </Form.Item>;
            break;
          case 'icon':
            component = 
            <Form.Item
              key={item.name}
              label={item.label}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Select style={item.style ? item.style : []} disabled={item.disabled} placeholder={item.placeholder}>
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
                name={field ? [field.name, item.name] : item.name}
                fieldKey={field ? [field.fieldKey, item.name] : item.name}
              />
            </span>;
            break;
          case 'checkbox':
            component = 
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            >
              <Checkbox.Group
                style={item.style ? item.style : []}
                options={item.options}
                disabled={item.disabled}
                onChange={(value)=>{onChange(value,item.name)}}
              />
            </Form.Item>;
            break;
          case 'radio':
            component = 
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            >
              <Radio.Group
                style={item.style ? item.style : []}
                options={item.options}
                disabled={item.disabled}
                onChange={(e)=>{onChange(e.target.value,item.name)}}
              />
            </Form.Item>;
            break;
          case 'image':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              valuePropName={'checked'}
            >
              <Switch
                style={item.style ? item.style : []}
                disabled={item.disabled}
                onChange={(value)=>{onChange(value,item.name)}}
                checkedChildren={item.options.on}
                unCheckedChildren={item.options.off}
              />
            </Form.Item>;
            break;
          case 'select':
            component = 
            <Form.Item
              key={item.key}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              label={item.label}
              tooltip={item.tooltip}
              rules={item.frontendRules}
              extra={item.extra}
              help={item.help ? item.help : undefined}
            >
              <Select
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
                options={item.options}
                disabled={item.disabled}
                mode={item.mode}
                allowClear={item.allowClear}
                size={item.size}
                onChange={(value)=>{onChange(value,item.name)}}
              />
            </Form.Item>;
            break;
          case 'tree':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
              extra={item.extra}
            >
              <Form.List key={item.name} name={item.name}>
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map(field => (
                        <Space align="start" style={{width:'100%'}}>
                          <Space
                            key={field.key}
                            align="start"
                            style={{ display: 'flex' }}
                            direction="vertical"
                          >
                            {formItemRender(item.items,field)}
                          </Space>
                          <Button onClick={() => { remove(field.name); }} type="primary">删除</Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {add();}}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
                allowClear={item.allowClear}
              />
            </Form.Item>;
            break;
          case 'map':
            component = 
            <Form.Item
              key={item.key}
              label={item.label}
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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
              name={field ? [field.name, item.name] : item.name}
              fieldKey={field ? [field.fieldKey, item.name] : item.name}
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