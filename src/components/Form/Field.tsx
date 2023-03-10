import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSwitch,
  ProFormTreeSelect,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormList,
} from '@ant-design/pro-components';
import { Select, Tree } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Render from '@/components/Render';
import ImageUploader from './Field/ImageUploader';
import FileUploader from './Field/FileUploader';
import Search from './Field/Search';
import Map from './Field/Map';
import Geofence from './Field/Geofence';
import Editor from './Field/Editor';
import Cascader from './Field/Cascader';
import Selects from './Field/Selects';

const Field: React.FC<any> = (props: any) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  const [random, setRandom] = useState(0); // hack
  let { object } = useModel('object');
  let getObject: any = object;
  const baseProps = {
    name: props.name,
    label: props.label,
    tooltip: props.tooltip,
    rules: props.frontendRules,
    extra: props.extra,
    help: props.help && props.help,
    placeholder: props.placeholder,
    disabled: props.disabled,
    addonAfter: props.addonAfter,
    addonBefore: props.addonBefore,
    wrapperCol: props.wrapperCol,
  };

  const onChange = (value: any, name: string) => {
    let item: any = [];
    item[name] = value;
    getObject[props.data?.componentkey]?.setFieldsValue(item);
    setRandom(Math.random);
  };

  // 渲染组件
  const fieldRender = (props: any) => {
    let component = null;

    switch (props.component) {
      case 'textField':
        component = (
          <ProFormText
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
            }}
          />
        );
        break;
      case 'passwordField':
        component = (
          <ProFormText.Password
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
              onChange: (e) => {
                onChange(e.target.value, props.name);
              },
            }}
          />
        );
        break;
      case 'textAreaField':
        component = (
          <ProFormTextArea
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
              autoSize: props.autoSize,
              onKeyPress: (e) => {
                e.stopPropagation();
              },
              onChange: (e) => {
                onChange(e.target.value, props.name);
              },
            }}
          />
        );
        break;
      case 'inputNumberField':
        component = (
          <ProFormDigit
            {...baseProps}
            min={props.min}
            max={props.max}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
              step: props.step,
              precision: props.precision,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'iconField':
        component = (
          <ProForm.Item
            key={props.name}
            label={props.label}
            name={props.name}
            tooltip={props.tooltip}
            rules={props.frontendRules}
            help={props.help && props.help}
            extra={props.extra}
          >
            <Select
              style={props.style && props.style}
              disabled={props.disabled}
              placeholder={props.placeholder}
            >
              <Select.Option key={undefined} value={''}>
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
          </ProForm.Item>
        );
        break;
      case 'hiddenField':
        component = (
          <div style={{ display: 'none' }}>
            <ProFormText name={props.name} />
          </div>
        );
        break;
      case 'idField':
        if (props.onFormDisplayed) {
          component = (
            <div style={{ display: 'none' }}>
              <span style={props.style ? props.style : []}>{props.value}</span>
              <ProFormText label={props.label} name={props.name} />
            </div>
          );
        } else {
          component = (
            <div style={{ display: 'none' }}>
              <ProFormText name={props.name} />
            </div>
          );
        }
        break;
      case 'checkboxField':
        component = (
          <ProFormCheckbox.Group
            {...baseProps}
            options={props.options}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'radioField':
        component = (
          <ProFormRadio.Group
            {...baseProps}
            options={props.options}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              onChange: (e) => {
                onChange(e.target.value, props.name);
              },
            }}
          />
        );
        break;
      case 'imageField':
        component = (
          <ProForm.Item {...baseProps}>
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
          </ProForm.Item>
        );
        break;
      case 'fileField':
        component = (
          <ProForm.Item {...baseProps}>
            <FileUploader
              key={props.name}
              title={props.button}
              limitType={props.limitType}
              limitSize={props.limitSize}
              limitNum={props.limitNum}
              action={props.api}
            />
          </ProForm.Item>
        );
        break;
      case 'switchField':
        component = (
          <ProFormSwitch
            {...baseProps}
            checkedChildren={props.options.on}
            unCheckedChildren={props.options.off}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'selectField':
        component = (
          <ProFormSelect
            {...baseProps}
            mode={props.mode}
            options={props.options}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'treeSelectField':
        component = (
          <ProFormTreeSelect
            {...baseProps}
            style={props.style && props.style} 
            width={props.width}
            fieldProps={{
              allowClear:props.allowClear,
              autoClearSearchValue:props.autoClearSearchValue,
              bordered:props.bordered,
              defaultValue:props.defaultValue,
              disabled:props.disabled,
              popupClassName:props.popupClassName,
              dropdownStyle:props.dropdownStyle,
              listHeight:props.listHeight,
              maxTagCount:props?.maxTagCount,
              maxTagPlaceholder:props?.maxTagPlaceholder,
              maxTagTextLength:props?.maxTagTextLength,
              multiple:props.multiple,
              notFoundContent:props?.notFoundContent,
              placeholder:props?.placeholder,
              placement:props?.placement,
              showArrow:props.showArrow,
              showSearch:props.showSearch,
              status:props.status,
              suffixIcon:props?.suffixIcon,
              treeCheckable:props.treeCheckable,
              treeDataSimpleMode:props.treeDataSimpleMode,
              treeDefaultExpandAll:props.treeDefaultExpandAll,
              treeDefaultExpandedKeys:props?.treeDefaultExpandedKeys,
              treeExpandAction:props?.treeExpandAction,
              treeExpandedKeys:props?.treeExpandedKeys,
              treeIcon:props?.treeIcon,
              treeLine:props?.treeLine,
              virtual:props?.virtual,
              style: props.style && props.style,
              width: props.width,
              size: props.size,
              maxLength: props.maxLength,
              treeData: props.treeData,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'treeField':
        component = (
          <ProForm.Item
            {...baseProps}
            valuePropName={'checkedKeys'}
            trigger={'onCheck'}
          >
            <Tree
              checkable
              style= {props.style && props.style}
              treeData={props.treeData}
            />
          </ProForm.Item>
        );
        break;
      case 'cascaderField':
        component = (
          <ProForm.Item
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
          </ProForm.Item>
        );
        break;
      case 'dateField':
        component = (
          <ProFormDatePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              picker: props.picker,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'weekField':
        component = (
          <ProFormDatePicker.Week
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'monthField':
        component = (
          <ProFormDatePicker.Month
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'quarterField':
        component = (
          <ProFormDatePicker.Quarter
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'yearField':
        component = (
          <ProFormDatePicker.Year
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'datetimeField':
        component = (
          <ProFormDateTimePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'dateRangeField':
        component = (
          <ProFormDateRangePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              picker: props.picker,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'datetimeRangeField':
        component = (
          <ProFormDateTimeRangePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'timeField':
        component = (
          <ProFormTimePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'timeRangeField':
        component = (
          <ProFormTimePicker.RangePicker
            {...baseProps}
            fieldProps={{
              style: props.style && props.style,
              width: props.width,
              allowClear: props.allowClear,
              size: props.size,
              format: props.format,
              onChange: (value) => {
                onChange(value, props.name);
              },
            }}
          />
        );
        break;
      case 'displayField':
        component = (
          <ProForm.Item label={props.label}>
            <span style={props.style ? props.style : []}>{props.value}</span>
          </ProForm.Item>
        );
        break;
      case 'editorField':
        component = (
          <ProForm.Item
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
          </ProForm.Item>
        );
        break;
      case 'searchField':
        component = (
          <ProForm.Item
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
          </ProForm.Item>
        );
        break;
      case 'mapField':
        component = (
          <ProForm.Item
            label={props.label}
            name={props.name}
            rules={props.frontendRules}
            help={props.help ? props.help : undefined}
            extra={props.extra}
          >
            <Map zoom={props.zoom} mapKey={props.mapKey} style={props.style} />
          </ProForm.Item>
        );
        break;
      case 'geofenceField':
        component = (
          <ProForm.Item
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
          </ProForm.Item>
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
              title={props.label}
              style={props.style}
              size={props.size}
            >
              {fieldRender(props.body)}
            </ProForm.Group>
          );
        } else {
          component = (
            <ProForm.Group
              title={props.label}
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
      case 'selects':
        component = (
          <Selects
            body={props.body}
            callback={props.callback}
            data={props.data}
          />
        );
        break;
      default:
        component = <span key={props.name}>无{props.component}组件</span>;
        break;
    }

    // 解析when
    if (props.when) {
      let fieldData: any = {};
      fieldData['componentkey'] = props.data.componentkey;
      fieldData[props.name] = getObject[props.data?.componentkey]?.getFieldValue(
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
