import type { FormItemProps } from 'antd';

import tplEngine from '@/utils/template';

interface ProFormFieldProps {
  component: string;
  componentkey?: string;
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

  // eslint-disable-next-line complexity
  const render = (currentProps: any) => {
    switch (currentProps.component) {
      case 'textField':
      case 'text':
      case 'inputField':
      case 'input':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
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
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <AInput.TextArea
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'passwordField':
      case 'password':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <AInput.Password
              {...currentProps.fieldProps}
              prefix={renderPrefix(currentProps.fieldProps)}
            />
          </AForm.Item>
        );
      case 'inputNumberField':
      case 'inputNumber':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
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
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
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
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ProFormIcon {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'hiddenField':
      case 'hidden':
        return (
          <AForm.Item
            hidden
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ProFormIcon {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'checkboxField':
      case 'checkbox':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ACheckbox.Group {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'radioField':
      case 'radio':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ARadio.Group {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'selectField':
      case 'select':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ASelect
              {...currentProps.fieldProps}
              prefix={undefined}
            />
          </AForm.Item>
        );
      case 'switchField':
      case 'switch':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ASwitch {...currentProps.fieldProps} />
          </AForm.Item>
        );
      case 'imageCaptchaField':
      case 'imageCaptcha':
        return (
          <AForm.Item
            label={currentProps.label}
            name={currentProps.name}
            rules={currentProps.rules}
          >
            <ProFormImageCaptcha {...currentProps.fieldProps} />
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
                label={currentProps.fieldProps.body.label}
                name={currentProps.fieldProps.body.name}
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
                  label={item.label}
                  name={item.name}
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
                  return item.body.map((subItem: any) => {
                    return (
                      <ProFormField
                        component={subItem.component}
                        fieldProps={{ ...subItem }}
                        key={subItem.componentkey}
                        label={subItem.label}
                        name={subItem.name}
                        rules={subItem.frontendRules}
                      />
                    );
                  });
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
