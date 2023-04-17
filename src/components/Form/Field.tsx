import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import {
  ProForm,
  ProFormItem,
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
  ProFormFieldSet,
  ProFormDependency,
} from '@ant-design/pro-components';
import { Select, Tree, Space } from 'antd';
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
import tplEngine from '@/utils/template';

const Field: React.FC<any> = (props: any) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  const [random, setRandom] = useState(0); // hack
  let { object } = useModel('object');
  let getObject: any = object;

  const onChange = (value: any, name: string) => {
    let item: any = [];
    item[name] = value;
    getObject[props.data?.componentkey]?.setFieldsValue(item);
    setRandom(Math.random);
  };

  const baseProps = (props:any) => {
    return {
      name: props.name,
      label: props.label,
      tooltip: props.tooltip,
      rules: props.frontendRules,
      extra: props.extra,
      required: props.required,
      help: props.help && props.help,
      placeholder: props.placeholder,
      disabled: props.disabled,
      addonAfter: props.addonAfter,
      addonBefore: props.addonBefore,
      wrapperCol: props.wrapperCol,
    };
  };

  // 渲染组件
  const fieldRender = (currentProps: any) => {
    let component = null;

    switch (currentProps.component) {
      case 'textField':
        component = (
          <ProFormText
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
            }}
          />
        );
        break;
      case 'passwordField':
        component = (
          <ProFormText.Password
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              onChange: (e) => {
                onChange(e.target.value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'textAreaField':
        component = (
          <ProFormTextArea
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: props.size,
              maxLength: currentProps.maxLength,
              autoSize: currentProps.autoSize,
              rows: currentProps.rows,
              onKeyPress: (e) => {
                e.stopPropagation();
              },
              onChange: (e) => {
                onChange(e.target.value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'inputNumberField':
        component = (
          <ProFormDigit
            {...baseProps(currentProps)}
            min={currentProps.min}
            max={currentProps.max}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              step: currentProps.step,
              precision: currentProps.precision,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'iconField':
        component = (
          <ProForm.Item
            key={currentProps.name}
            label={currentProps.label}
            name={currentProps.name}
            tooltip={currentProps.tooltip}
            rules={currentProps.frontendRules}
            help={currentProps.help && currentProps.help}
            extra={currentProps.extra}
          >
            <Select
              style={currentProps.style && currentProps.style}
              disabled={currentProps.disabled}
              placeholder={currentProps.placeholder}
            >
              <Select.Option key={undefined} value={''}>
                无图标
              </Select.Option>
              {currentProps.options.map((item: any) => {
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
            <ProFormText name={currentProps.name} />
          </div>
        );
        break;
      case 'idField':
        if (currentProps.onFormDisplayed) {
          component = (
            <div style={{ display: 'none' }}>
              <span style={currentProps.style ? currentProps.style : []}>{currentProps.value}</span>
              <ProFormText label={currentProps.label} name={currentProps.name} />
            </div>
          );
        } else {
          component = (
            <div style={{ display: 'none' }}>
              <ProFormText name={currentProps.name} />
            </div>
          );
        }
        break;
      case 'checkboxField':
        component = (
          <ProFormCheckbox.Group
            {...baseProps(currentProps)}
            options={currentProps.options}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'radioField':
        component = (
          <ProFormRadio.Group
            {...baseProps(currentProps)}
            options={currentProps.options}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              onChange: (e) => {
                onChange(e.target.value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'imageField':
        component = (
          <ProForm.Item {...baseProps(currentProps)}>
            <ImageUploader
              key={currentProps.name}
              mode={currentProps.mode}
              title={currentProps.button}
              limitType={currentProps.limitType}
              limitSize={currentProps.limitSize}
              limitNum={currentProps.limitNum}
              limitWH={currentProps.limitWH}
              action={currentProps.api}
            />
          </ProForm.Item>
        );
        break;
      case 'fileField':
        component = (
          <ProForm.Item {...baseProps(currentProps)}>
            <FileUploader
              key={currentProps.name}
              title={currentProps.button}
              limitType={currentProps.limitType}
              limitSize={currentProps.limitSize}
              limitNum={currentProps.limitNum}
              action={currentProps.api}
            />
          </ProForm.Item>
        );
        break;
      case 'switchField':
        component = (
          <ProFormSwitch
            {...baseProps(currentProps)}
            checkedChildren={currentProps.checkedChildren}
            unCheckedChildren={currentProps.unCheckedChildren}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'selectField':
        component = (
          <ProFormSelect
            {...baseProps(currentProps)}
            mode={currentProps.mode}
            options={currentProps.options}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'treeSelectField':
        component = (
          <ProFormTreeSelect
            {...baseProps(currentProps)}
            style={currentProps.style && currentProps.style} 
            width={currentProps.width}
            fieldProps={{
              allowClear:currentProps.allowClear,
              autoClearSearchValue:currentProps.autoClearSearchValue,
              bordered:currentProps.bordered,
              defaultValue:currentProps.defaultValue,
              disabled:currentProps.disabled,
              popupClassName:currentProps.popupClassName,
              dropdownStyle:currentProps.dropdownStyle,
              listHeight:currentProps.listHeight,
              maxTagCount:currentProps?.maxTagCount,
              maxTagPlaceholder:currentProps?.maxTagPlaceholder,
              maxTagTextLength:currentProps?.maxTagTextLength,
              multiple:currentProps.multiple,
              notFoundContent:currentProps?.notFoundContent,
              placeholder:currentProps?.placeholder,
              placement:currentProps?.placement,
              showArrow:currentProps.showArrow,
              showSearch:currentProps.showSearch,
              status:currentProps.status,
              suffixIcon:currentProps?.suffixIcon,
              treeCheckable:currentProps.treeCheckable,
              treeDataSimpleMode:currentProps.treeDataSimpleMode,
              treeDefaultExpandAll:currentProps.treeDefaultExpandAll,
              treeDefaultExpandedKeys:currentProps?.treeDefaultExpandedKeys,
              treeExpandAction:currentProps?.treeExpandAction,
              treeExpandedKeys:currentProps?.treeExpandedKeys,
              treeIcon:currentProps?.treeIcon,
              treeLine:currentProps?.treeLine,
              virtual:currentProps?.virtual,
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              treeData: currentProps.treeData,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'treeField':
        component = (
          <ProForm.Item
            {...baseProps(currentProps)}
            valuePropName={'checkedKeys'}
            trigger={'onCheck'}
          >
            <Tree
              checkable
              style= {currentProps.style && currentProps.style}
              treeData={currentProps.treeData}
            />
          </ProForm.Item>
        );
        break;
      case 'cascaderField':
        component = (
          <ProForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.frontendRules}
            help={currentProps.help ? currentProps.help : undefined}
            extra={currentProps.extra}
          >
            <Cascader
              api={currentProps.api}
              size={currentProps.size}
              options={currentProps.options}
              style={currentProps.style}
              placeholder={currentProps.placeholder}
            />
          </ProForm.Item>
        );
        break;
      case 'dateField':
        component = (
          <ProFormDatePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              picker: currentProps.picker,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'weekField':
        component = (
          <ProFormDatePicker.Week
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'monthField':
        component = (
          <ProFormDatePicker.Month
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'quarterField':
        component = (
          <ProFormDatePicker.Quarter
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'yearField':
        component = (
          <ProFormDatePicker.Year
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'datetimeField':
        component = (
          <ProFormDateTimePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'dateRangeField':
        component = (
          <ProFormDateRangePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              picker: currentProps.picker,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'datetimeRangeField':
        component = (
          <ProFormDateTimeRangePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'timeField':
        component = (
          <ProFormTimePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'timeRangeField':
        component = (
          <ProFormTimePicker.RangePicker
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              allowClear: currentProps.allowClear,
              size: currentProps.size,
              format: currentProps.format,
              onChange: (value) => {
                onChange(value, currentProps.name);
              },
            }}
          />
        );
        break;
      case 'displayField':
        component = (
          <ProForm.Item label={currentProps.label}>
            <span style={currentProps.style ? currentProps.style : []}>{currentProps.value}</span>
          </ProForm.Item>
        );
        break;
      case 'editorField':
        component = (
          <ProForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.frontendRules}
            help={currentProps.help ? currentProps.help : undefined}
            extra={currentProps.extra}
          >
            <Editor
              key={currentProps.name}
              height={currentProps?.style?.height}
              width={currentProps?.style?.width}
            />
          </ProForm.Item>
        );
        break;
      case 'searchField':
        component = (
          <ProForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.frontendRules}
            help={currentProps.help ? currentProps.help : undefined}
            extra={currentProps.extra}
          >
            <Search
              mode={currentProps.mode}
              size={currentProps.size}
              placeholder={currentProps.placeholder}
              style={currentProps.style}
              options={currentProps.options}
              api={currentProps.api}
              allowClear={currentProps.allowClear}
            />
          </ProForm.Item>
        );
        break;
      case 'mapField':
        component = (
          <ProForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.frontendRules}
            help={currentProps.help ? currentProps.help : undefined}
            extra={currentProps.extra}
          >
            <Map zoom={currentProps.zoom} mapKey={currentProps.mapKey} style={currentProps.style} />
          </ProForm.Item>
        );
        break;
      case 'geofenceField':
        component = (
          <ProForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.frontendRules}
            help={currentProps.help ? currentProps.help : undefined}
            extra={currentProps.extra}
          >
            <Geofence
              zoom={currentProps.zoom}
              mapKey={currentProps.mapKey}
              style={currentProps.style}
            />
          </ProForm.Item>
        );
        break;
      case 'selects':
        component = (
          <Selects
            body={currentProps.body}
            callback={currentProps.callback}
            data={currentProps.data}
          />
        );
        break;
      case 'listField':
        if (currentProps.items.hasOwnProperty('component')) {
          component = (
            <ProFormList
              label={currentProps.label}
              name={currentProps.name}
              creatorButtonProps={{
                position: currentProps.buttonPosition,
                creatorButtonText: currentProps.buttonText,
              }}
              alwaysShowItemLabel={currentProps.alwaysShowItemLabel}
            >
              {fieldRender(currentProps.items)}
            </ProFormList>
          );
        } else {
          component = (
            <ProFormList
              label={currentProps.label}
              name={currentProps.name}
              creatorButtonProps={{
                position: currentProps.buttonPosition,
                creatorButtonText: currentProps.buttonText,
              }}
              alwaysShowItemLabel={currentProps.alwaysShowItemLabel}
            >
              {currentProps.items.map((item: any) => {
                return fieldRender(item);
              })}
            </ProFormList>
          );
        }
        break;
      case 'groupField':
        if (currentProps.body.hasOwnProperty('component')) {
          component = (
            <ProForm.Group
              title={currentProps.title}
              style={currentProps.style}
              size={currentProps.size}
            >
              {fieldRender(currentProps.body)}
            </ProForm.Group>
          );
        } else {
          component = (
            <ProForm.Group
              title={currentProps.title}
              style={currentProps.style}
              size={currentProps.size}
            >
              {currentProps.body.map((item: any) => {
                return fieldRender(item);
              })}
            </ProForm.Group>
          );
        }
        break;
      case 'spaceField':
        if (currentProps.body.hasOwnProperty('component')) {
          delete currentProps.body["label"]
          component = (
            <ProFormItem label={currentProps.label} style={{ marginBottom: 0 }}>
              <Space
                align={currentProps.align}
                direction={currentProps.direction}
                size={currentProps.size}
                split={currentProps.split}
                wrap={currentProps.wrap}
              >
                {fieldRender(currentProps.body)}
              </Space>
            </ProFormItem>
          );
        } else {
          component = (
            <ProFormItem label={currentProps.label} style={{ marginBottom: 0 }}>
              <Space
                align={currentProps.align}
                direction={currentProps.direction}
                size={currentProps.size}
                split={currentProps.split}
                wrap={currentProps.wrap}
              >
              {currentProps.body.map((item: any) => {
                delete item["label"]
                return fieldRender(item);
              })}
              </Space>
            </ProFormItem>
          );
        }
        break;
      case 'compactField':
        if (currentProps.body.hasOwnProperty('component')) {
          delete currentProps.body["label"]
          component = (
            <ProFormItem label={currentProps.label} style={{ marginBottom: 0 }}>
              <Space.Compact
                block={currentProps.block}
                direction={currentProps.direction}
                size={currentProps.size}
              >
                {fieldRender(currentProps.body)}
              </Space.Compact>
            </ProFormItem>
          );
        } else {
          component = (
            <ProFormItem label={currentProps.label} style={{ marginBottom: 0 }}>
              <Space.Compact
                block={currentProps.block}
                direction={currentProps.direction}
                size={currentProps.size}
              >
              {currentProps.body.map((item: any) => {
                delete item["label"]
                return fieldRender(item);
              })}
              </Space.Compact>
            </ProFormItem>
          );
        }
        break;
      case 'fieldsetField':
        if (currentProps.body.hasOwnProperty('component')) {
          component = (
            <ProFormFieldSet name={currentProps.name} label={currentProps.label} type={currentProps.type}>
              {fieldRender(currentProps.body)}
            </ProFormFieldSet>
          );
        } else {
          component = (
            <ProFormFieldSet name={currentProps.name} label={currentProps.label} type={currentProps.type}>
              {currentProps.body.map((item: any) => {
                return fieldRender(item);
              })}
            </ProFormFieldSet>
          );
        }
        break;
      default:
        component = <span key={currentProps.name}>无{currentProps.component}组件</span>;
        break;
    }

    // 数据联动组件特殊处理
    if(currentProps.component === "dependencyField") {
      return (
        <ProFormDependency name={currentProps.names} ignoreFormListField={currentProps.ignoreFormListField}>
          {(values) => {
            return (
              <Render
                body={currentProps.when}
                data={values}
                callback={currentProps.callback}
              />
            );
          }}
        </ProFormDependency>
      )
    }

    // 解析when
    if (currentProps.when) {
      let fieldData: any = {};
      fieldData['componentkey'] = props.data?.componentkey;
      fieldData[currentProps.name] = getObject[props.data?.componentkey]?.getFieldValue(
        currentProps.name,
      );
      
      return (
        <>
          {component}
          <Render
            body={currentProps.when}
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
