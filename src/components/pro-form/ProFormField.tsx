import React from 'react';

interface BaseFieldProps {
  className?: string;
  prefix?:
    | {
        type: string;
        [key: string]: any;
      }
    | React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

interface ProFormFieldProps {
  component: string;
  componentkey?: string;
  fieldProps?: BaseFieldProps;
  label?: string;
  name: string;
  onChange?: (value: any) => void;
  rules?: any[];
  value?: any;
}

const ProFormField = (props: ProFormFieldProps) => {
  const { component, fieldProps = {}, label, name, rules } = props;

  const renderPrefix = () => {
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
  const render = () => {
    switch (component) {
      case 'textField':
      case 'text':
      case 'inputField':
      case 'input':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <AInput
              {...fieldProps}
              prefix={renderPrefix()}
            />
          </AForm.Item>
        );
      case 'textAreaField':
      case 'textArea':
      case 'textareaField':
      case 'textarea':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <AInput.TextArea
              {...fieldProps}
              prefix={renderPrefix() as string}
            />
          </AForm.Item>
        );
      case 'passwordField':
      case 'password':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <AInput.Password
              {...fieldProps}
              prefix={renderPrefix()}
            />
          </AForm.Item>
        );
      case 'inputNumberField':
      case 'inputNumber':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <AInputNumber
              {...fieldProps}
              prefix={renderPrefix()}
            />
          </AForm.Item>
        );
      case 'idField':
      case 'id':
        return (
          <AForm.Item
            hidden
            label={label}
            name={name}
            rules={rules}
          >
            <AInput
              {...fieldProps}
              prefix={renderPrefix()}
            />
          </AForm.Item>
        );
      case 'iconField':
      case 'icon':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <ProFormIcon fieldProps={fieldProps} />
          </AForm.Item>
        );
      case 'hiddenField':
      case 'hidden':
        return (
          <AForm.Item
            hidden
            label={label}
            name={name}
            rules={rules}
          >
            <ProFormIcon fieldProps={fieldProps} />
          </AForm.Item>
        );
      case 'checkboxField':
      case 'checkbox':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <ACheckbox.Group {...fieldProps} />
          </AForm.Item>
        );
      case 'imageCaptchaField':
      case 'imageCaptcha':
        return (
          <AForm.Item
            label={label}
            name={name}
            rules={rules}
          >
            <ProFormImageCaptcha fieldProps={fieldProps} />
          </AForm.Item>
        );
      default:
        return null;
    }
  };

  return render();
};

export default ProFormField;
