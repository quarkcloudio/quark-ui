import type { FormItemProps } from 'antd';
import dayjs from 'dayjs';

import tplEngine from '@/utils/template';

interface ProFormFieldProps {
  component: string;
  componentkey?: string;
  data?: any;
  fieldProps?: any;
  label?: string;
  name: string;
  onChange?: (value: any) => void;
  rules?: any[];
  value?: any;
}

const ProFormField = (props: ProFormFieldProps & Partial<FormItemProps>) => {
  const renderPrefix = (fieldProps: any) => {
    if (!fieldProps?.prefix) return null;

    if (typeof fieldProps.prefix === 'object' && fieldProps.prefix !== null && 'type' in fieldProps.prefix) {
      return (
        <SvgIcon
          icon={fieldProps.prefix.type as string}
          {...fieldProps.prefix}
        />
      );
    }

    return fieldProps.prefix;
  };

  const baseProps = (currentProps: any) => {
    return {
      colon: currentProps?.colon,
      extra: currentProps?.extra,
      help: currentProps?.help,
      label: currentProps?.label,
      name: currentProps?.name,
      required: currentProps?.required,
      rules: currentProps?.rules,
      tooltip: currentProps?.tooltip,
      wrapperCol: currentProps?.wrapperCol
    };
  };

  // eslint-disable-next-line complexity
  const render = (currentProps: any) => {
    switch (currentProps.component) {
      case 'textField':
      case 'text':
      case 'inputField':
      case 'input':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <AInput
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'textAreaField':
      case 'textArea':
      case 'textareaField':
      case 'textarea':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <AInput.TextArea
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'passwordField':
      case 'password':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <AInput.Password
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'inputNumberField':
      case 'inputNumber':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <AInputNumber
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'idField':
      case 'id':
        return (
          <AForm.Item
            hidden
            {...baseProps(currentProps)}
          >
            <AInput
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'iconField':
      case 'icon':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormIcon {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'hiddenField':
      case 'hidden':
        return (
          <AForm.Item
            hidden
            {...baseProps(currentProps)}
          >
            <ProFormIcon {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'checkboxField':
      case 'checkbox':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ACheckbox.Group {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'radioField':
      case 'radio':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ARadio.Group {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'imageField':
      case 'image':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormImage {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'selectField':
      case 'select':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ASelect
              {...currentProps.fieldProps}
              prefix={undefined}
            />
          </AForm.Item>
        );
      case 'treeSelectField':
      case 'treeSelect':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ATreeSelect
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'treeField':
      case 'tree':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ATree
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'cascaderField':
      case 'cascader':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormCascader {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'dateField':
      case 'date':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'weekField':
      case 'week':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker.WeekPicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'monthField':
      case 'month':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker.MonthPicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'quarterField':
      case 'quarter':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker.QuarterPicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'yearField':
      case 'year':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker.YearPicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'datetimeField':
      case 'datetime':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ADatePicker
              {...currentProps.fieldProps}
              showTime
            />
          </AForm.Item>
        );
      case 'dateRangeField':
      case 'dateRange':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({
              value: value && [
                dayjs(value[0], currentProps.fieldProps.format),
                dayjs(value[1], currentProps.fieldProps.format)
              ]
            })}
            normalize={value =>
              value && [
                value[0] && dayjs(value[0]).format(currentProps.fieldProps.format),
                value[1] && dayjs(value[1]).format(currentProps.fieldProps.format)
              ]
            }
          >
            <ADatePicker.RangePicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'datetimeRangeField':
      case 'datetimeRange':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({
              value: value && [
                dayjs(value[0], currentProps.fieldProps.format),
                dayjs(value[1], currentProps.fieldProps.format)
              ]
            })}
            normalize={value =>
              value && [
                value[0] && dayjs(value[0]).format(currentProps.fieldProps.format),
                value[1] && dayjs(value[1]).format(currentProps.fieldProps.format)
              ]
            }
          >
            <ADatePicker.RangePicker
              {...currentProps.fieldProps}
              showTime
            />
          </AForm.Item>
        );
      case 'timeField':
      case 'time':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({ value: value && dayjs(value, currentProps.fieldProps.format) })}
            normalize={value => value && `${dayjs(value).format(currentProps.fieldProps.format)}`}
          >
            <ATimePicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'timeRangeField':
      case 'timeRange':
        return (
          <AForm.Item
            {...baseProps(currentProps)}
            getValueProps={value => ({
              value: value && [
                dayjs(value[0], currentProps.fieldProps.format),
                dayjs(value[1], currentProps.fieldProps.format)
              ]
            })}
            normalize={value =>
              value && [
                value[0] && dayjs(value[0]).format(currentProps.fieldProps.format),
                value[1] && dayjs(value[1]).format(currentProps.fieldProps.format)
              ]
            }
          >
            <ATimePicker.RangePicker {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'displayField':
      case 'display':
        return (
          <span
            style={currentProps.style && currentProps.style}
            dangerouslySetInnerHTML={{
              __html: tplEngine(currentProps.value, props.data)
            }}
          />
        );
      case 'editorField':
      case 'editor':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormEditor {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'searchField':
      case 'search':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormSearch {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'selectsField':
      case 'selects':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormSelects {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'switchField':
      case 'switch':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ASwitch {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'imageCaptchaField':
      case 'imageCaptcha':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormImageCaptcha {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'transferField':
      case 'transfer':
        return (
          <AForm.Item {...baseProps(currentProps)}>
            <ProFormTransfer {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'groupField':
      case 'group':
        if (Object.hasOwn(currentProps.fieldProps?.body ?? {}, 'component')) {
          return (
            <ProFormGroup>
              <ProFormField
                component={currentProps.fieldProps.body.component}
                fieldProps={{ ...currentProps.fieldProps.body }}
                key={currentProps.fieldProps.body.componentkey}
                {...baseProps(currentProps.fieldProps.body)}
                rules={currentProps.fieldProps.body.frontendRules}
              />
            </ProFormGroup>
          );
        }
        return (
          <ProFormGroup>
            {currentProps?.fieldProps?.body?.map((item: any) => {
              return (
                <ProFormField
                  component={item.component}
                  fieldProps={{ ...item }}
                  key={item.componentkey}
                  {...baseProps(item)}
                  rules={item.frontendRules}
                />
              );
            })}
          </ProFormGroup>
        );
      case 'dependencyField':
      case 'dependency':
        return (
          <ProFormDependency name={currentProps.fieldProps.names}>
            {(values: any) => {
              return currentProps?.fieldProps?.when?.items?.map((item: any) => {
                if (tplEngine(item.condition, values) === 'true') {
                  if (Array.isArray(item.body)) {
                    return item.body.map((subItem: any) => {
                      return (
                        <ProFormField
                          component={subItem.component}
                          fieldProps={{ ...subItem }}
                          key={subItem.componentkey}
                          {...baseProps(subItem)}
                          rules={subItem.frontendRules}
                        />
                      );
                    });
                  }
                  return (
                    <ProFormField
                      component={item.body.component}
                      fieldProps={{ ...item.body }}
                      key={item.body.componentkey}
                      {...baseProps(item.body)}
                      rules={item.body.frontendRules}
                    />
                  );
                }
                return null;
              });
            }}
          </ProFormDependency>
        );
      default:
        return null;
    }
  };

  return render(props);
};

export default ProFormField;
