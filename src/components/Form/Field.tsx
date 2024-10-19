import React, { useState, useEffect } from 'react';
import { useModel } from '@umijs/max';
import { get } from '@/services/action';
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
import { Tree, Space } from 'antd';
import Render from '@/components/Render';
import ProFormEditor from './ProField/ProFormEditor';
import ProFormCascader from './ProField/ProFormCascader';
import ProFormFileUploader from './ProField/ProFormFileUploader';
import ProFormGeofence from './ProField/ProFormGeofence';
import ProFormIcon from './ProField/ProFormIcon';
import ProFormImageUploader from './ProField/ProFormImageUploader';
import ProFormMap from './ProField/ProFormMap';
import ProFormSearch from './ProField/ProFormSearch';
import ProFormTransfer from './ProField/ProFormTransfer';
import ProFormImageCaptcha from './ProField/ProFormImageCaptcha';
import ProFormSmsCaptcha from './ProField/ProFormSmsCaptcha';
import Selects from './Field/Selects';
import tplEngine from '@/utils/template';

const Field: React.FC<any> = (props: any) => {
  let { object } = useModel('object');
  const { fields, setFields } = useModel('formFields'); // 全局表单字段

  useEffect(() => {
    if (Object.keys(fields).length !== 0) {
      selectLoad(props);
    }
  }, []);

  // 解决select组件联动问题
  const selectLoad = async (props: any) => {
    let getFields = fields[props.data.componentkey]?.map?.(
      async (item: any) => {
        let value = object[props.data.componentkey]?.current?.getFieldValue(
          item.name,
        );
        if (value && item.load) {
          const promises = fields[props.data.componentkey]?.map(
            async (subItem: any, key: any) => {
              if (item.load.field === subItem.name && item.load.api) {
                const result = await get({
                  url: item.load.api,
                  data: {
                    search: value,
                  },
                });
                subItem.options = result.data;
              }
              return subItem;
            },
          );
          return await Promise.all(promises);
        }
        return item;
      },
    );

    let updatedItems = await Promise.all(getFields);
    if (updatedItems.length > 0) {
      // 正确做法：创建 fields 的新对象副本
      let newFields = { ...fields, [props.data.componentkey]: updatedItems }; // 创建 fields 的副本

      // 更新 fields
      setFields(newFields);
    }
  };

  const selectChange = async (value: any, name: string, load: any = null) => {
    let fieldsValue: any = {};
    if (load && Object.keys(fields).length !== 0) {
      const promises = fields[props.data.componentkey]?.map(
        async (item: any, key: any) => {
          if (load.field === item.name && load.api) {
            const result = await get({
              url: load.api,
              data: {
                search: value,
              },
            });
            return {
              ...item,
              options: result.data, // 更新 item 的 options
            };
          }
          return { ...item };
        },
      );

      // 等待所有 promises 完成
      const updatedItems = await Promise.all(promises);

      // 正确做法：创建 fields 的新对象副本
      let newFields = { ...fields, [props.data.componentkey]: updatedItems }; // 创建 fields 的副本

      // 更新 fields
      setFields(newFields);

      // 更新 fieldsValue
      fieldsValue[load.field] = undefined;
    }
    fieldsValue[name] = value;
    object[props.data.componentkey]?.current?.setFieldsValue(fieldsValue);
  };

  const baseProps = (props: any) => {
    const rules = props?.frontendRules?.map((item: any, index: number) => {
      if (item?.pattern) {
        // eslint-disable-next-line
        item.pattern = eval(item.pattern);
      }
      return item;
    });

    return {
      name: props.name,
      label: props.label,
      tooltip: props.tooltip,
      rules: rules,
      extra: props.extra,
      required: props.required,
      help: props.help && props.help,
      placeholder: props.placeholder,
      disabled: props.disabled,
      addonAfter: props.addonAfter,
      addonBefore: props.addonBefore,
      wrapperCol: props.wrapperCol,
      colProps: props.colProps,
      secondary: props.secondary,
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
              prefix: <Render body={currentProps.prefix} />,
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
              prefix: <Render body={currentProps.prefix} />,
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
              prefix: <Render body={currentProps.prefix} />,
            }}
          />
        );
        break;
      case 'iconField':
        component = (
          <ProFormIcon
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              disabled: currentProps.disabled && currentProps.disabled,
              placeholder: currentProps.placeholder && currentProps.placeholder,
              size: currentProps.size && currentProps.size,
              allowClear: currentProps.allowClear && currentProps.allowClear,
              allowSearch: currentProps.allowSearch && currentProps.allowSearch,
              options: currentProps.options && currentProps.options,
            }}
          />
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
              <span style={currentProps.style ? currentProps.style : []}>
                {currentProps.value}
              </span>
              <ProFormText
                label={currentProps.label}
                name={currentProps.name}
              />
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
              buttonStyle: currentProps.buttonStyle,
              optionType: currentProps.optionType,
            }}
          />
        );
        break;
      case 'imageField':
        component = (
          <ProFormImageUploader
            {...baseProps(currentProps)}
            fieldProps={{
              mode: currentProps.mode,
              button: currentProps.button,
              limitType: currentProps.limitType,
              limitSize: currentProps.limitSize,
              limitNum: currentProps.limitNum,
              limitWH: currentProps.limitWH,
              api: currentProps.api,
            }}
          />
        );
        break;
      case 'fileField':
        component = (
          <ProFormFileUploader
            {...baseProps(currentProps)}
            fieldProps={{
              button: currentProps.button,
              limitType: currentProps.limitType,
              limitSize: currentProps.limitSize,
              limitNum: currentProps.limitNum,
              api: currentProps.api,
            }}
          />
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
            onChange={(value) => {
              selectChange(value, currentProps.name, currentProps.load);
            }}
            fieldProps={{
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
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
              allowClear: currentProps.allowClear,
              autoClearSearchValue: currentProps.autoClearSearchValue,
              bordered: currentProps.bordered,
              defaultValue: currentProps.defaultValue,
              disabled: currentProps.disabled,
              popupClassName: currentProps.popupClassName,
              dropdownStyle: currentProps.dropdownStyle,
              listHeight: currentProps.listHeight,
              maxTagCount: currentProps?.maxTagCount,
              maxTagPlaceholder: currentProps?.maxTagPlaceholder,
              maxTagTextLength: currentProps?.maxTagTextLength,
              multiple: currentProps.multiple,
              notFoundContent: currentProps?.notFoundContent,
              placeholder: currentProps?.placeholder,
              placement: currentProps?.placement,
              showArrow: currentProps.showArrow,
              showSearch: currentProps.showSearch,
              status: currentProps.status,
              suffixIcon: currentProps?.suffixIcon,
              treeCheckable: currentProps.treeCheckable,
              treeDataSimpleMode: currentProps.treeDataSimpleMode,
              treeDefaultExpandAll: currentProps.treeDefaultExpandAll,
              treeDefaultExpandedKeys: currentProps?.treeDefaultExpandedKeys,
              treeExpandAction: currentProps?.treeExpandAction,
              treeExpandedKeys: currentProps?.treeExpandedKeys,
              treeIcon: currentProps?.treeIcon,
              treeLine: currentProps?.treeLine,
              virtual: currentProps?.virtual,
              style: currentProps.style && currentProps.style,
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              treeData: currentProps.treeData,
            }}
          />
        );
        break;
      case 'treeField':
        component = (
          <ProFormItem
            {...baseProps(currentProps)}
            valuePropName={'checkedKeys'}
            trigger={'onCheck'}
          >
            <Tree
              style={currentProps.style && currentProps.style}
              allowDrop={currentProps?.allowDrop}
              autoExpandParent={currentProps?.autoExpandParent}
              blockNode={currentProps?.blockNode}
              checkable={currentProps?.checkable}
              defaultCheckedKeys={currentProps?.defaultCheckedKeys}
              defaultExpandAll={currentProps?.defaultExpandAll}
              defaultExpandedKeys={currentProps?.defaultExpandedKeys}
              defaultExpandParent={currentProps?.defaultExpandParent}
              defaultSelectedKeys={currentProps?.defaultSelectedKeys}
              disabled={currentProps?.disabled}
              draggable={currentProps?.draggable}
              fieldNames={currentProps?.fieldNames}
              height={currentProps?.height}
              icon={currentProps?.icon}
              multiple={currentProps?.multiple}
              rootClassName={currentProps?.rootClassName}
              rootStyle={currentProps?.rootStyle}
              showIcon={currentProps?.showIcon}
              showLine={currentProps?.showLine}
              switcherIcon={currentProps?.switcherIcon}
              treeData={currentProps.treeData}
              virtual={currentProps?.virtual}
            />
          </ProFormItem>
        );
        break;
      case 'cascaderField':
        component = (
          <ProFormCascader
            {...baseProps(currentProps)}
            fieldProps={{
              api: currentProps.api,
              size: currentProps.size,
              options: currentProps.options,
              style: currentProps.style && currentProps.style,
              placeholder: currentProps.placeholder,
            }}
          />
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
            }}
          />
        );
        break;
      case 'displayField':
        component = (
          <ProFormItem label={currentProps.label}>
            <span style={currentProps.style ? currentProps.style : []}>
              {currentProps.value}
            </span>
          </ProFormItem>
        );
        break;
      case 'editorField':
        component = (
          <ProFormEditor
            {...baseProps(currentProps)}
            fieldProps={{
              style: currentProps.style && currentProps.style,
            }}
          />
        );
        break;
      case 'searchField':
        component = (
          <ProFormSearch
            {...baseProps(currentProps)}
            fieldProps={{
              mode: currentProps.mode,
              size: currentProps.size,
              placeholder: currentProps.placeholder,
              style: currentProps.style && currentProps.style,
              options: currentProps.options,
              api: currentProps.api,
              allowClear: currentProps.allowClear,
              prefix: <Render body={currentProps.prefix} />,
            }}
          />
        );
        break;
      case 'mapField':
        component = (
          <ProFormMap
            {...baseProps(currentProps)}
            fieldProps={{
              zoom: currentProps.zoom,
              mapKey: currentProps.mapKey,
              mapSecurityJsCode: currentProps.mapSecurityJsCode,
              style: currentProps.style && currentProps.style,
            }}
          />
        );
        break;
      case 'geofenceField':
        component = (
          <ProFormGeofence
            {...baseProps(currentProps)}
            fieldProps={{
              zoom: currentProps.zoom,
              mapKey: currentProps.mapKey,
              mapSecurityJsCode: currentProps.mapSecurityJsCode,
              style: currentProps.style && currentProps.style,
            }}
          />
        );
        break;
      case 'imageCaptchaField':
        component = (
          <ProFormImageCaptcha
            {...baseProps(currentProps)}
            captchaIdUrl={currentProps.captchaIdUrl}
            captchaUrl={currentProps.captchaUrl}
            fieldProps={{
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              placeholder: currentProps.placeholder,
              prefix: <Render body={currentProps.prefix} />,
              style: currentProps.style && currentProps.style,
            }}
          />
        );
        break;
      case 'smsCaptchaField':
        component = (
          <ProFormSmsCaptcha
            {...baseProps(currentProps)}
            captchaIdUrl={currentProps.captchaIdUrl}
            captchaUrl={currentProps.captchaUrl}
            dependency={currentProps.dependency}
            captchaProps={currentProps.captchaProps}
            fieldProps={{
              width: currentProps.width,
              size: currentProps.size,
              maxLength: currentProps.maxLength,
              placeholder: currentProps.placeholder,
              prefix: <Render body={currentProps.prefix} />,
              style: currentProps.style && currentProps.style,
            }}
          />
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
              rowProps={currentProps.rowProps}
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
              rowProps={currentProps.rowProps}
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
              rowProps={currentProps.rowProps}
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
              rowProps={currentProps.rowProps}
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
                  return fieldRender(item);
                })}
              </Space>
            </ProFormItem>
          );
        }
        break;
      case 'compactField':
        if (currentProps.body.hasOwnProperty('component')) {
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
            <ProFormFieldSet
              name={currentProps.name}
              label={currentProps.label}
              type={currentProps.type}
            >
              {fieldRender(currentProps.body)}
            </ProFormFieldSet>
          );
        } else {
          component = (
            <ProFormFieldSet
              name={currentProps.name}
              label={currentProps.label}
              type={currentProps.type}
            >
              {currentProps.body.map((item: any) => {
                return fieldRender(item);
              })}
            </ProFormFieldSet>
          );
        }
        break;
      case 'transferField':
        component = (
          <ProFormTransfer
            {...baseProps(currentProps)}
            fieldProps={{
              api: currentProps.api,
              dataSource: currentProps.dataSource,
              disabled: currentProps.disabled,
              selectionsIcon: currentProps.selectionsIcon,
              filterOption: currentProps.filterOption,
              footer: currentProps.footer,
              listStyle: currentProps.listStyle,
              locale: currentProps.locale,
              oneWay: currentProps.oneWay,
              operations: currentProps.operations,
              operationStyle: currentProps.operationStyle,
              pagination: currentProps.pagination,
              selectAllLabels: currentProps.selectAllLabels,
              selectedKeys: currentProps.selectedKeys,
              showSearch: currentProps.showSearch,
              showSelectAll: currentProps.showSelectAll,
              status: currentProps.status,
              targetKeys: currentProps.targetKeys,
              titles: currentProps.titles,
            }}
          />
        );
        break;
      default:
        component = (
          <span key={currentProps.name}>
            No {currentProps.component} component found
          </span>
        );
        break;
    }

    // 数据联动组件特殊处理
    if (currentProps.component === 'dependencyField') {
      return (
        <ProFormDependency
          name={currentProps.names}
          ignoreFormListField={currentProps.ignoreFormListField}
        >
          {(values) => {
            // Space、Compact组件下，需要特殊处理
            if (
              props.component === 'spaceField' ||
              props.component === 'compactField'
            ) {
              return currentProps.when.items.map((item: any, index: number) => {
                if (tplEngine(item.condition, values) === 'true') {
                  return item.body.map((item: any) => {
                    return fieldRender(item);
                  });
                } else {
                  return null;
                }
              });
            }

            return (
              <Render
                body={currentProps.when}
                data={values}
                callback={currentProps.callback}
              />
            );
          }}
        </ProFormDependency>
      );
    }

    // 存在When组件，需要特殊处理
    if (currentProps.when) {
      let fieldData: any = {};
      fieldData['componentkey'] = props.data?.componentkey;
      fieldData[currentProps.name] = object[
        props.data?.componentkey
      ]?.current?.getFieldValue(currentProps.name);

      // Space、Compact组件下，需要特殊处理
      if (
        props.component === 'spaceField' ||
        props.component === 'compactField'
      ) {
        return (
          <>
            {component}
            {currentProps?.when?.items?.map((item: any, index: number) => {
              if (tplEngine(item.condition, fieldData) === 'true') {
                return item.body.map((item: any) => {
                  return fieldRender(item);
                });
              } else {
                return null;
              }
            })}
          </>
        );
      }

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
    }

    return component;
  };

  return fieldRender(props);
};

export default Field;
