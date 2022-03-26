import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { get } from '@/services/action';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormList,
} from '@ant-design/pro-form';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import {
  Tree,
  Form,
  Select,
  TimePicker,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import ImageUploader from './ImageUploader';
import FileUploader from './FileUploader';
import Search from './Search';
import Map from './Map';
import Geofence from './Geofence';
import Editor from './Editor';
import Cascader from './Cascader';
import Render from '@/components/Render';
import { tplEngine } from '@/utils/template';

const { RangePicker } = DatePicker;

const Field: React.FC<any> = (props: any) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });

  //hack
  const [random, setRandom] = useState(0);

  const onChange = (value: any, name: string) => {
    let item: any = [];
    item[name] = value;
    window[props.data.formKey]?.setFieldsValue(item);
    setRandom(Math.random);
  };

  // 渲染组件
  const fieldRender = (props: any) => {
    let component = null;

    switch (props.component) {
      case 'textField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Input
              placeholder={props.placeholder}
              style={props.style ? props.style : []}
              width={props.width}
              disabled={props.disabled}
              allowClear={props.allowClear}
              maxLength={props.maxLength}
              addonAfter={props.addonAfter}
              addonBefore={props.addonBefore}
              size={props.size}
              onChange={(e) => {
                onChange(e.target.value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'passwordField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Input.Password
              placeholder={props.placeholder}
              style={props.style ? props.style : []}
              width={props.width}
              disabled={props.disabled}
              allowClear={props.allowClear}
              maxLength={props.maxLength}
              addonAfter={props.addonAfter}
              addonBefore={props.addonBefore}
              size={props.size}
              onChange={(e) => {
                onChange(e.target.value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'textAreaField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Input.TextArea
              placeholder={props.placeholder}
              style={props.style ? props.style : []}
              disabled={props.disabled}
              allowClear={props.allowClear}
              maxLength={props.maxLength}
              autoSize={props.autoSize}
              onKeyPress={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                onChange(e.target.value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'inputNumberField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <InputNumber
              placeholder={props.placeholder}
              style={props.style ? props.style : []}
              width={props.width}
              disabled={props.disabled}
              maxLength={props.maxLength}
              min={props.min}
              max={props.max}
              step={props.step}
              precision={props.precision}
              onChange={(value) => {
                onChange(value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'iconField':
        component = (
          <Form.Item
            key={props.name}
            label={props.label}
            name={props.name}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Select
              style={props.style ? props.style : []}
              disabled={props.disabled}
              placeholder={props.placeholder}
            >
              <Select.Option key={0} value={0}>
                无图标
              </Select.Option>
              {props.options.map((item: any) => {
                return (
                  <Select.Option key={item} value={item}>
                    <IconFont type={item} /> {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        );
        break;
      case 'hiddenField':
        component = (
          <span key={props.name} style={{ display: 'none' }}>
            <ProFormText name={props.name} />
          </span>
        );
        break;
      case 'idField':
        if (props.onFormDisplayed) {
          component = (
            <Form.Item label={props.label}>
              <span style={props.style ? props.style : []}>{props.value}</span>
              <span key={props.name} style={{ display: 'none' }}>
                <ProFormText name={props.name} />
              </span>
            </Form.Item>
          );
        } else {
          component = (
            <span key={props.name} style={{ display: 'none' }}>
              <ProFormText name={props.name} />
            </span>
          );
        }
        break;
      case 'checkboxField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Checkbox.Group
              style={props.style ? props.style : []}
              options={props.options}
              disabled={props.disabled}
              onChange={(value) => {
                onChange(value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'radioField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Radio.Group
              style={props.style ? props.style : []}
              options={props.options}
              disabled={props.disabled}
              onChange={(e) => {
                onChange(e.target.value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'imageField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            style={props.style}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <ImageUploader
              key={props.name}
              mode={props.mode}
              title={props.button}
              limitType={props.limitType}
              limitSize={props.limitSize}
              limitNum={props.limitNum}
              limitWH={props.limitWH}
              action={props.api}
            />
          </Form.Item>
        );
        break;
      case 'fileField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            style={props.style}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <FileUploader
              key={props.name}
              title={props.button}
              limitType={props.limitType}
              limitSize={props.limitSize}
              limitNum={props.limitNum}
              action={props.api}
            />
          </Form.Item>
        );
        break;
      case 'switchField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
            valuePropName={'checked'}
          >
            <Switch
              style={props.style ? props.style : []}
              disabled={props.disabled}
              checkedChildren={props.options.on}
              unCheckedChildren={props.options.off}
              onChange={(value) => {
                onChange(value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'selectField':
        component = (
          <Form.Item
            name={props.name}
            label={props.label}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            extra={props.extra}
            help={props.help ? props.help : undefined}
          >
            <Select
              placeholder={props.placeholder}
              style={props.style ? props.style : []}
              options={props.options}
              disabled={props.disabled}
              mode={props.mode}
              allowClear={props.allowClear}
              size={props.size}
              onChange={(value) => {
                onChange(value, props.name);
              }}
            />
          </Form.Item>
        );
        break;
      case 'treeField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            valuePropName={'checkedKeys'}
            trigger={'onCheck'}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Tree
              checkable
              style={props.style ? props.style : []}
              treeData={props.treeData}
            />
          </Form.Item>
        );
        break;
      case 'cascaderField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Cascader
              api={props.api}
              size={props.size}
              options={props.options}
              style={props.style}
              placeholder={props.placeholder}
            />
          </Form.Item>
        );
        break;
      case 'dateField':
        component = (
          <ProFormDatePicker
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
              picker: props.picker,
              format: props.format,
            }}
          />
        );
        break;
      case 'weekField':
        component = (
          <ProFormDatePicker.Week
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'monthField':
        component = (
          <ProFormDatePicker.Month
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'quarterField':
        component = (
          <ProFormDatePicker.Quarter
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'yearField':
        component = (
          <ProFormDatePicker.Year
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'datetimeField':
        component = (
          <ProFormDateTimePicker
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'dateRangeField':
        component = (
          <ProFormDateRangePicker
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
              picker: props.picker,
              format: props.format,
            }}
          />
        );
        break;
      case 'datetimeRangeField':
        component = (
          <ProFormDateTimeRangePicker
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
            placeholder={props.placeholder}
            fieldProps={{
              allowClear: props.allowClear,
              size: props.size,
            }}
          />
        );
        break;
      case 'timeField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <TimePicker
              size={props.size}
              locale={locale}
              format={props.format}
            />
          </Form.Item>
        );
        break;
      case 'timeRangeField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <TimePicker.RangePicker
              size={props.size}
              locale={locale}
              format={props.format}
            />
          </Form.Item>
        );
        break;
      case 'displayField':
        component = (
          <Form.Item label={props.label}>
            <span style={props.style ? props.style : []}>{props.value}</span>
          </Form.Item>
        );
        break;
      case 'editorField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Editor
              key={props.name}
              height={props?.style?.height}
              width={props?.style?.width}
            />
          </Form.Item>
        );
        break;
      case 'searchField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Search
              mode={props.mode}
              size={props.size}
              placeholder={props.placeholder}
              style={props.style}
              options={props.options}
              api={props.api}
              allowClear={props.allowClear}
            />
          </Form.Item>
        );
        break;
      case 'mapField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Map zoom={props.zoom} mapKey={props.mapKey} style={props.style} />
          </Form.Item>
        );
        break;
      case 'geofenceField':
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Geofence
              zoom={props.zoom}
              mapKey={props.mapKey}
              style={props.style}
            />
          </Form.Item>
        );
        break;
      case 'listField':
        if (props.items.hasOwnProperty('component')) {
          component = (
            <ProFormList
              label={props.label}
              name={props.name}
              creatorButtonProps={{
                position: props.buttonPosition,
                creatorButtonText: props.buttonText,
              }}
              alwaysShowItemLabel={props.alwaysShowItemLabel}
            >
              {fieldRender(props.items)}
            </ProFormList>
          );
        } else {
          component = (
            <ProFormList
              label={props.label}
              name={props.name}
              creatorButtonProps={{
                position: props.buttonPosition,
                creatorButtonText: props.buttonText,
              }}
              alwaysShowItemLabel={props.alwaysShowItemLabel}
            >
              {props.items.map((item: any) => {
                return fieldRender(item);
              })}
            </ProFormList>
          );
        }
        break;
      case 'groupField':
        if (props.body.hasOwnProperty('component')) {
          component = (
            <ProForm.Group
              label={props.label}
              style={props.style}
              size={props.size}
            >
              {fieldRender(props.body)}
            </ProForm.Group>
          );
        } else {
          component = (
            <ProForm.Group
              label={props.label}
              style={props.style}
              size={props.size}
            >
              {props.body.map((item: any) => {
                return fieldRender(item);
              })}
            </ProForm.Group>
          );
        }
        break;
      default:
        component = (
          <Form.Item
            label={props.label}
            name={props.name}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <span key={props.name}>无{props.component}组件</span>
          </Form.Item>
        );
        break;
    }

    // 解析when
    if (props.when) {
      let fieldData: any = {};
      fieldData[props.name] = window[props.data.formKey]?.getFieldValue(
        props.name,
      );
      return (
        <>
          {component}
          <Render
            body={props.when}
            data={fieldData}
            callback={props.callback}
          />
        </>
      );
    } else {
      return component;
    }
  };

  return fieldRender(props);
};

export default Field;
